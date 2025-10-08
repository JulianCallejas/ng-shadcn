#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * SSR Compatibility Tester for ng-shadcn Components
 * Tests server-side rendering support and identifies issues
 */

const COMPONENTS = [
  'button', 'input', 'card', 'switch', 'dialog', 'tooltip',
  'select', 'checkbox', 'radio-group', 'textarea', 'badge', 'alert',
  'tabs', 'dropdown-menu', 'popover', 'accordion'
];

class SSRTester {
  constructor() {
    this.testResults = [];
    this.ssrIssues = [];
  }

  async test() {
    console.log('🔍 Starting SSR Compatibility Testing...\n');
    
    // Create test SSR application
    await this.createSSRTestApp();
    
    // Test each component for SSR compatibility
    await this.testComponents();
    
    // Generate SSR compatibility report
    this.generateSSRReport();
    
    // Generate SSR usage documentation
    this.generateSSRDocumentation();
  }

  async createSSRTestApp() {
    console.log('🏗️ Creating SSR test application...');
    
    const testAppPath = path.join(process.cwd(), 'ssr-test');
    
    try {
      // Clean existing test app
      if (fs.existsSync(testAppPath)) {
        fs.rmSync(testAppPath, { recursive: true, force: true });
      }
      
      // Create new Angular app with SSR
      execSync(`ng new ssr-test --routing --style=css --ssr --skip-git --directory=${testAppPath}`, {
        stdio: 'pipe',
        cwd: process.cwd()
      });
      
      // Install TailwindCSS
      execSync('npm install tailwindcss @tailwindcss/forms', {
        stdio: 'pipe',
        cwd: testAppPath
      });
      
      // Setup TailwindCSS config
      this.setupTailwindConfig(testAppPath);
      
      console.log('✅ SSR test application created\n');
    } catch (error) {
      console.error('❌ Failed to create SSR test app:', error.message);
      throw error;
    }
  }

  setupTailwindConfig(testAppPath) {
    // Create tailwind.config.js
    const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "../packages/**/*.{html,ts}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}`;
    
    fs.writeFileSync(path.join(testAppPath, 'tailwind.config.js'), tailwindConfig);
    
    // Update styles.css
    const stylesPath = path.join(testAppPath, 'src', 'styles.css');
    const styles = `@tailwind base;
@tailwind components;
@tailwind utilities;

/* ng-shadcn CSS variables */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 84% 4.9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
  --radius: 0.5rem;
}`;
    
    fs.writeFileSync(stylesPath, styles);
  }

  async testComponents() {
    console.log('🧪 Testing components for SSR compatibility...');
    
    for (const component of COMPONENTS) {
      console.log(`Testing ${component}...`);
      
      try {
        const result = await this.testComponentSSR(component);
        this.testResults.push(result);
        
        if (result.compatible) {
          console.log(`✅ ${component} is SSR compatible`);
        } else {
          console.log(`⚠️ ${component} has SSR issues`);
          this.ssrIssues.push(result);
        }
      } catch (error) {
        console.error(`❌ ${component} test failed:`, error.message);
        this.testResults.push({
          component,
          compatible: false,
          error: error.message,
          issues: ['Test execution failed']
        });
      }
    }
    
    console.log('\n✅ Component SSR testing completed\n');
  }

  async testComponentSSR(componentName) {
    const testAppPath = path.join(process.cwd(), 'ssr-test');
    const issues = [];
    
    try {
      // Copy component to test app
      const sourcePath = path.join('packages', componentName);
      const targetPath = path.join(testAppPath, 'src', 'app', 'components', componentName);
      
      if (!fs.existsSync(path.dirname(targetPath))) {
        fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      }
      
      this.copyRecursive(sourcePath, targetPath);
      
      // Create test component that uses the component
      const testComponentContent = this.generateTestComponent(componentName);
      const testComponentPath = path.join(testAppPath, 'src', 'app', `${componentName}-test.component.ts`);
      fs.writeFileSync(testComponentPath, testComponentContent);
      
      // Update app component to include test
      this.updateAppComponent(testAppPath, componentName);
      
      // Try to build with SSR
      const buildOutput = execSync('npm run build:ssr', {
        cwd: testAppPath,
        stdio: 'pipe',
        encoding: 'utf8'
      });
      
      // Check for common SSR issues in build output
      if (buildOutput.includes('document is not defined')) {
        issues.push('Uses document object without platform check');
      }
      
      if (buildOutput.includes('window is not defined')) {
        issues.push('Uses window object without platform check');
      }
      
      if (buildOutput.includes('localStorage is not defined')) {
        issues.push('Uses localStorage without platform check');
      }
      
      // Try to run SSR build
      try {
        execSync('npm run serve:ssr', {
          cwd: testAppPath,
          stdio: 'pipe',
          timeout: 10000 // 10 seconds timeout
        });
      } catch (serveError) {
        if (serveError.message.includes('timeout')) {
          // Timeout is expected, server started successfully
        } else {
          issues.push(`SSR serve failed: ${serveError.message}`);
        }
      }
      
      return {
        component: componentName,
        compatible: issues.length === 0,
        issues: issues,
        buildSuccess: true
      };
      
    } catch (error) {
      return {
        component: componentName,
        compatible: false,
        issues: [`Build failed: ${error.message}`],
        buildSuccess: false,
        error: error.message
      };
    }
  }

  copyRecursive(src, dest) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    const items = fs.readdirSync(src);
    
    for (const item of items) {
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);
      
      if (fs.statSync(srcPath).isDirectory()) {
        this.copyRecursive(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  generateTestComponent(componentName) {
    const className = componentName.split('-').map(part => 
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join('') + 'TestComponent';
    
    return `import { Component } from '@angular/core';
import { ${componentName.split('-').map(part => 
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join('')}Component } from './components/${componentName}/src/public-api';

@Component({
  selector: 'app-${componentName}-test',
  standalone: true,
  imports: [${componentName.split('-').map(part => 
    part.charAt(0).toUpperCase() + part.slice(1)
  ).join('')}Component],
  template: \`
    <div class="p-4">
      <h2>Testing ${componentName}</h2>
      <ng-shadcn-${componentName}${this.getComponentProps(componentName)}>
        ${this.getComponentContent(componentName)}
      </ng-shadcn-${componentName}>
    </div>
  \`
})
export class ${className} {}`;
  }

  getComponentProps(componentName) {
    const props = {
      'button': ' variant="default"',
      'input': ' placeholder="Test input"',
      'switch': ' [checked]="false"',
      'checkbox': ' [checked]="false"',
      'textarea': ' placeholder="Test textarea"',
      'badge': ' variant="default"',
      'alert': ' variant="info"'
    };
    
    return props[componentName] || '';
  }

  getComponentContent(componentName) {
    const content = {
      'button': 'Test Button',
      'badge': 'Test Badge',
      'alert': 'Test Alert Message',
      'card': 'Test Card Content'
    };
    
    return content[componentName] || '';
  }

  updateAppComponent(testAppPath, componentName) {
    const appComponentPath = path.join(testAppPath, 'src', 'app', 'app.component.ts');
    const className = componentName.split('-').map(part => 
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join('') + 'TestComponent';
    
    const appContent = `import { Component } from '@angular/core';
import { ${className} } from './${componentName}-test.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [${className}],
  template: \`
    <div class="container mx-auto p-8">
      <h1 class="text-2xl font-bold mb-4">SSR Test App</h1>
      <app-${componentName}-test></app-${componentName}-test>
    </div>
  \`
})
export class AppComponent {}`;
    
    fs.writeFileSync(appComponentPath, appContent);
  }

  generateSSRReport() {
    console.log('📊 SSR Compatibility Report');
    console.log('=' .repeat(60));
    console.log();
    
    const compatible = this.testResults.filter(r => r.compatible);
    const incompatible = this.testResults.filter(r => !r.compatible);
    
    console.log(`✅ SSR Compatible: ${compatible.length}/${COMPONENTS.length}`);
    console.log(`⚠️ Issues Found: ${incompatible.length}`);
    
    if (compatible.length > 0) {
      console.log('\n✅ SSR Compatible Components:');
      compatible.forEach(result => {
        console.log(`  • ${result.component}`);
      });
    }
    
    if (incompatible.length > 0) {
      console.log('\n⚠️ Components with SSR Issues:');
      incompatible.forEach(result => {
        console.log(`  • ${result.component}:`);
        result.issues.forEach(issue => {
          console.log(`    - ${issue}`);
        });
      });
    }
    
    // Save detailed report
    const reportData = {
      timestamp: new Date().toISOString(),
      summary: {
        total: COMPONENTS.length,
        compatible: compatible.length,
        incompatible: incompatible.length,
        compatibilityRate: Math.round((compatible.length / COMPONENTS.length) * 100)
      },
      results: this.testResults,
      recommendations: this.generateSSRRecommendations()
    };
    
    const reportPath = path.join('reports', 'ssr-compatibility.json');
    const reportsDir = path.dirname(reportPath);
    
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
    console.log(`\n📄 Detailed report saved to: ${reportPath}`);
  }

  generateSSRRecommendations() {
    const recommendations = [];
    
    this.ssrIssues.forEach(issue => {
      issue.issues.forEach(problemDesc => {
        if (problemDesc.includes('document')) {
          recommendations.push({
            component: issue.component,
            issue: 'Document access',
            solution: 'Use @angular/common DOCUMENT injection token and platform checks'
          });
        }
        
        if (problemDesc.includes('window')) {
          recommendations.push({
            component: issue.component,
            issue: 'Window access',
            solution: 'Use isPlatformBrowser() check before accessing window'
          });
        }
        
        if (problemDesc.includes('localStorage')) {
          recommendations.push({
            component: issue.component,
            issue: 'LocalStorage access',
            solution: 'Use platform checks and provide fallback for SSR'
          });
        }
      });
    });
    
    return recommendations;
  }

  generateSSRDocumentation() {
    const docContent = `# SSR (Server-Side Rendering) Usage Guide

## Overview

This guide covers server-side rendering support for ng-shadcn components.

## Compatibility Status

${this.testResults.map(result => 
  `- **${result.component}**: ${result.compatible ? '✅ Compatible' : '⚠️ Issues found'}`
).join('\n')}

## Setup Instructions

### 1. Install Angular Universal

\`\`\`bash
ng add @nguniversal/express-engine
\`\`\`

### 2. Configure TailwindCSS for SSR

Update your \`tailwind.config.js\`:

\`\`\`javascript
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/@ng-shadcn/**/*.{html,ts}"
  ],
  // ... rest of config
}
\`\`\`

### 3. Platform-Specific Code

For components that interact with browser APIs, use platform checks:

\`\`\`typescript
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

export class MyComponent {
  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Browser-only code
      localStorage.setItem('key', 'value');
    }
  }
}
\`\`\`

## Component-Specific Notes

${this.ssrIssues.map(issue => `
### ${issue.component}

**Issues:**
${issue.issues.map(i => `- ${i}`).join('\n')}

**Solutions:**
- Use platform checks before accessing browser APIs
- Provide server-side fallbacks where needed
- Consider lazy loading for browser-dependent features
`).join('\n')}

## Best Practices

1. **Always use platform checks** for browser-specific APIs
2. **Provide fallbacks** for server-side rendering
3. **Test SSR builds** regularly in your CI/CD pipeline
4. **Use Angular Universal** for production SSR deployments

## Testing SSR

Run the SSR compatibility test:

\`\`\`bash
npm run test:ssr
\`\`\`

## Troubleshooting

### Common Issues

1. **"document is not defined"**
   - Use \`@Inject(DOCUMENT)\` and platform checks

2. **"window is not defined"**
   - Use \`isPlatformBrowser()\` before accessing window

3. **"localStorage is not defined"**
   - Provide server-side storage alternatives

### Getting Help

If you encounter SSR issues not covered here:
1. Check the component's documentation
2. Review the SSR compatibility report
3. Open an issue with reproduction steps
`;

    const docPath = path.join('docs', 'ssr-usage.md');
    const docsDir = path.dirname(docPath);
    
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true });
    }
    
    fs.writeFileSync(docPath, docContent);
    console.log(`📚 SSR documentation generated: ${docPath}`);
  }
}

// Run SSR testing if called directly
if (require.main === module) {
  const tester = new SSRTester();
  tester.test().catch(console.error);
}

module.exports = SSRTester;

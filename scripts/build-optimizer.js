#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Build Optimization Script for ng-shadcn
 * Optimizes build pipeline and generates distribution packages
 */

const COMPONENTS = [
  'button', 'input', 'card', 'switch', 'dialog', 'tooltip',
  'select', 'checkbox', 'radio-group', 'textarea', 'badge', 'alert',
  'tabs', 'dropdown-menu', 'popover', 'accordion'
];

class BuildOptimizer {
  constructor() {
    this.buildResults = [];
    this.startTime = Date.now();
  }

  async optimize() {
    console.log('🚀 Starting Build Optimization...\n');
    
    // Clean previous builds
    await this.cleanBuild();
    
    // Update build scripts for all components
    await this.updateBuildScripts();
    
    // Optimize ng-package.json files
    await this.optimizePackageConfigs();
    
    // Build all components with optimization
    await this.buildOptimized();
    
    // Generate distribution packages
    await this.generateDistribution();
    
    // Generate build report
    this.generateBuildReport();
  }

  async cleanBuild() {
    console.log('🧹 Cleaning previous builds...');
    try {
      if (fs.existsSync('dist')) {
        fs.rmSync('dist', { recursive: true, force: true });
      }
      console.log('✅ Build directory cleaned\n');
    } catch (error) {
      console.warn('⚠️ Could not clean build directory:', error.message);
    }
  }

  async updateBuildScripts() {
    console.log('📝 Updating build scripts...');
    
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Update build scripts for better optimization
    const buildCommands = COMPONENTS.map(comp => `ng build ${comp} --configuration production`);
    
    packageJson.scripts = {
      ...packageJson.scripts,
      'build:lib': 'npm run build:components',
      'build:components': buildCommands.join(' && '),
      'build:components:parallel': this.generateParallelBuildScript(),
      'build:production': 'npm run build:components && npm run build:cli',
      'build:analyze': 'node scripts/bundle-analyzer.js',
      'build:optimize': 'node scripts/build-optimizer.js'
    };
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Build scripts updated\n');
  }

  generateParallelBuildScript() {
    // For Windows PowerShell parallel execution
    const chunks = [];
    const chunkSize = 4; // Build 4 components at a time
    
    for (let i = 0; i < COMPONENTS.length; i += chunkSize) {
      const chunk = COMPONENTS.slice(i, i + chunkSize);
      chunks.push(chunk.map(comp => `ng build ${comp} --configuration production`).join(' & '));
    }
    
    return chunks.join(' && wait && ');
  }

  async optimizePackageConfigs() {
    console.log('⚙️ Optimizing ng-package.json configurations...');
    
    for (const component of COMPONENTS) {
      const packagePath = path.join('packages', component, 'ng-package.json');
      
      if (fs.existsSync(packagePath)) {
        const config = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
        
        // Optimize configuration
        config.lib = {
          ...config.lib,
          entryFile: 'src/public-api.ts',
          umdModuleIds: {
            '@angular/core': 'ng.core',
            '@angular/common': 'ng.common',
            '@angular/forms': 'ng.forms',
            'rxjs': 'rxjs',
            'rxjs/operators': 'rxjs.operators'
          }
        };
        
        // Add build optimization
        config.buildOptimizer = true;
        config.deleteDestPath = false;
        
        fs.writeFileSync(packagePath, JSON.stringify(config, null, 2));
      }
    }
    
    console.log('✅ Package configurations optimized\n');
  }

  async buildOptimized() {
    console.log('🔨 Building components with optimization...');
    
    const buildStartTime = Date.now();
    
    for (const component of COMPONENTS) {
      const componentStartTime = Date.now();
      
      try {
        console.log(`Building ${component}...`);
        execSync(`ng build ${component} --configuration production`, { 
          stdio: 'pipe',
          timeout: 120000 // 2 minutes timeout per component
        });
        
        const buildTime = Date.now() - componentStartTime;
        this.buildResults.push({
          component,
          success: true,
          buildTime,
          size: this.getComponentSize(component)
        });
        
        console.log(`✅ ${component} built in ${buildTime}ms`);
      } catch (error) {
        const buildTime = Date.now() - componentStartTime;
        this.buildResults.push({
          component,
          success: false,
          buildTime,
          error: error.message
        });
        
        console.error(`❌ ${component} build failed:`, error.message);
      }
    }
    
    const totalBuildTime = Date.now() - buildStartTime;
    console.log(`\n✅ All components processed in ${totalBuildTime}ms\n`);
  }

  getComponentSize(component) {
    try {
      const distPath = path.join('dist', component);
      if (!fs.existsSync(distPath)) return 0;
      
      let totalSize = 0;
      const files = fs.readdirSync(distPath);
      
      for (const file of files) {
        const filePath = path.join(distPath, file);
        const stats = fs.statSync(filePath);
        if (stats.isFile()) {
          totalSize += stats.size;
        }
      }
      
      return Math.round(totalSize / 1024); // Size in KB
    } catch (error) {
      return 0;
    }
  }

  async generateDistribution() {
    console.log('📦 Generating distribution packages...');
    
    // Create distribution structure
    const distRoot = path.join('dist', 'ng-shadcn');
    if (!fs.existsSync(distRoot)) {
      fs.mkdirSync(distRoot, { recursive: true });
    }
    
    // Copy built components
    for (const component of COMPONENTS) {
      const sourcePath = path.join('dist', component);
      const targetPath = path.join(distRoot, component);
      
      if (fs.existsSync(sourcePath)) {
        this.copyRecursive(sourcePath, targetPath);
      }
    }
    
    // Generate main package.json for distribution
    this.generateDistributionPackageJson(distRoot);
    
    // Generate README for distribution
    this.generateDistributionReadme(distRoot);
    
    console.log('✅ Distribution packages generated\n');
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

  generateDistributionPackageJson(distRoot) {
    const mainPackageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    const distPackageJson = {
      name: '@ng-shadcn/components',
      version: mainPackageJson.version,
      description: 'Angular component library inspired by shadcn/ui',
      main: 'index.js',
      types: 'index.d.ts',
      keywords: ['angular', 'components', 'ui', 'shadcn', 'tailwindcss'],
      author: 'ng-shadcn',
      license: 'MIT',
      repository: {
        type: 'git',
        url: 'https://github.com/your-username/ng-shadcn.git'
      },
      peerDependencies: {
        '@angular/core': '^19.0.0',
        '@angular/common': '^19.0.0',
        '@angular/forms': '^19.0.0',
        'tailwindcss': '^4.0.0'
      },
      exports: this.generateExports()
    };
    
    fs.writeFileSync(
      path.join(distRoot, 'package.json'),
      JSON.stringify(distPackageJson, null, 2)
    );
  }

  generateExports() {
    const exports = {
      '.': {
        import: './index.js',
        types: './index.d.ts'
      }
    };
    
    // Add individual component exports
    for (const component of COMPONENTS) {
      exports[`./${component}`] = {
        import: `./${component}/index.js`,
        types: `./${component}/index.d.ts`
      };
    }
    
    return exports;
  }

  generateDistributionReadme(distRoot) {
    const readme = `# @ng-shadcn/components

Angular component library inspired by shadcn/ui, built with Angular 19+ and TailwindCSS v4.

## Installation

\`\`\`bash
npm install @ng-shadcn/components
\`\`\`

## Components

This package includes ${COMPONENTS.length} production-ready components:

${COMPONENTS.map(comp => `- ${comp.charAt(0).toUpperCase() + comp.slice(1).replace('-', ' ')}`).join('\n')}

## Usage

\`\`\`typescript
import { ButtonComponent } from '@ng-shadcn/components/button';
import { InputComponent } from '@ng-shadcn/components/input';

@Component({
  imports: [ButtonComponent, InputComponent],
  template: \`
    <ng-shadcn-button>Click me</ng-shadcn-button>
    <ng-shadcn-input placeholder="Enter text" />
  \`
})
export class MyComponent {}
\`\`\`

## Documentation

Visit our [Storybook documentation](https://your-storybook-url.com) for interactive examples and API documentation.

## License

MIT License - see LICENSE file for details.
`;
    
    fs.writeFileSync(path.join(distRoot, 'README.md'), readme);
  }

  generateBuildReport() {
    const totalTime = Date.now() - this.startTime;
    const successful = this.buildResults.filter(r => r.success);
    const failed = this.buildResults.filter(r => !r.success);
    
    console.log('📊 Build Optimization Report');
    console.log('=' .repeat(60));
    console.log();
    
    console.log(`⏱️  Total time: ${totalTime}ms`);
    console.log(`✅ Successful builds: ${successful.length}/${COMPONENTS.length}`);
    console.log(`❌ Failed builds: ${failed.length}`);
    
    if (successful.length > 0) {
      console.log('\n📦 Successful Components:');
      successful.forEach(result => {
        console.log(`  • ${result.component}: ${result.buildTime}ms (${result.size} KB)`);
      });
    }
    
    if (failed.length > 0) {
      console.log('\n❌ Failed Components:');
      failed.forEach(result => {
        console.log(`  • ${result.component}: ${result.error}`);
      });
    }
    
    // Save report
    const reportData = {
      timestamp: new Date().toISOString(),
      totalTime,
      results: this.buildResults,
      summary: {
        total: COMPONENTS.length,
        successful: successful.length,
        failed: failed.length,
        averageBuildTime: successful.length > 0 
          ? Math.round(successful.reduce((sum, r) => sum + r.buildTime, 0) / successful.length)
          : 0,
        totalSize: successful.reduce((sum, r) => sum + r.size, 0)
      }
    };
    
    const reportPath = path.join('reports', 'build-optimization.json');
    const reportsDir = path.dirname(reportPath);
    
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
    console.log(`\n📄 Report saved to: ${reportPath}`);
  }
}

// Run optimization if called directly
if (require.main === module) {
  const optimizer = new BuildOptimizer();
  optimizer.optimize().catch(console.error);
}

module.exports = BuildOptimizer;

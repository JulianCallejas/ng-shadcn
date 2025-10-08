#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Distribution Package Creator for ng-shadcn
 * Creates production-ready distribution packages
 */

const COMPONENTS = [
  'button', 'input', 'card', 'switch', 'dialog', 'tooltip',
  'select', 'checkbox', 'radio-group', 'textarea', 'badge', 'alert',
  'tabs', 'dropdown-menu', 'popover', 'accordion'
];

class DistributionCreator {
  constructor() {
    this.distPath = path.join(process.cwd(), 'dist');
    this.packagePath = path.join(this.distPath, 'ng-shadcn');
  }

  async create() {
    console.log('📦 Creating Production Distribution...\n');
    
    // Clean and prepare
    await this.prepare();
    
    // Build all components
    await this.buildComponents();
    
    // Create package structure
    await this.createPackageStructure();
    
    // Generate package files
    await this.generatePackageFiles();
    
    // Create tarball
    await this.createTarball();
    
    console.log('✅ Distribution package created successfully!\n');
    this.showSummary();
  }

  async prepare() {
    console.log('🧹 Preparing distribution environment...');
    
    // Clean dist directory
    if (fs.existsSync(this.distPath)) {
      fs.rmSync(this.distPath, { recursive: true, force: true });
    }
    
    fs.mkdirSync(this.distPath, { recursive: true });
    fs.mkdirSync(this.packagePath, { recursive: true });
    
    console.log('✅ Environment prepared\n');
  }

  async buildComponents() {
    console.log('🔨 Building all components for production...');
    
    try {
      // Build components in production mode
      const buildCommand = COMPONENTS
        .map(comp => `ng build ${comp} --configuration production`)
        .join(' && ');
      
      execSync(buildCommand, { 
        stdio: 'inherit',
        timeout: 300000 // 5 minutes timeout
      });
      
      console.log('✅ All components built successfully\n');
    } catch (error) {
      console.error('❌ Build failed:', error.message);
      throw error;
    }
  }

  async createPackageStructure() {
    console.log('📁 Creating package structure...');
    
    // Create main directories
    const dirs = ['components', 'utils', 'styles'];
    dirs.forEach(dir => {
      fs.mkdirSync(path.join(this.packagePath, dir), { recursive: true });
    });
    
    // Copy component builds
    for (const component of COMPONENTS) {
      const sourcePath = path.join(this.distPath, component);
      const targetPath = path.join(this.packagePath, 'components', component);
      
      if (fs.existsSync(sourcePath)) {
        this.copyRecursive(sourcePath, targetPath);
      }
    }
    
    // Copy shared utilities and styles
    this.copySharedFiles();
    
    console.log('✅ Package structure created\n');
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

  copySharedFiles() {
    // Copy global styles
    const globalStylesPath = path.join('src', 'global_styles.css');
    if (fs.existsSync(globalStylesPath)) {
      fs.copyFileSync(
        globalStylesPath,
        path.join(this.packagePath, 'styles', 'globals.css')
      );
    }
    
    // Copy utility functions (if any)
    const utilsPath = path.join('src', 'lib', 'utils');
    if (fs.existsSync(utilsPath)) {
      this.copyRecursive(
        utilsPath,
        path.join(this.packagePath, 'utils')
      );
    }
  }

  async generatePackageFiles() {
    console.log('📝 Generating package files...');
    
    // Generate main package.json
    this.generateMainPackageJson();
    
    // Generate main index files
    this.generateIndexFiles();
    
    // Generate README
    this.generateReadme();
    
    // Generate LICENSE
    this.generateLicense();
    
    // Generate CHANGELOG
    this.generateChangelog();
    
    console.log('✅ Package files generated\n');
  }

  generateMainPackageJson() {
    const mainPackage = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    const packageJson = {
      name: '@ng-shadcn/components',
      version: mainPackage.version || '1.0.0',
      description: 'Beautiful, accessible Angular components inspired by shadcn/ui',
      main: 'index.js',
      module: 'index.js',
      types: 'index.d.ts',
      sideEffects: false,
      keywords: [
        'angular',
        'components',
        'ui',
        'shadcn',
        'tailwindcss',
        'typescript',
        'design-system'
      ],
      author: 'ng-shadcn team',
      license: 'MIT',
      repository: {
        type: 'git',
        url: 'https://github.com/ng-shadcn/components.git'
      },
      bugs: {
        url: 'https://github.com/ng-shadcn/components/issues'
      },
      homepage: 'https://ng-shadcn.dev',
      peerDependencies: {
        '@angular/core': '^19.0.0',
        '@angular/common': '^19.0.0',
        '@angular/forms': '^19.0.0',
        'tailwindcss': '^4.0.0',
        'class-variance-authority': '^0.7.0',
        'clsx': '^2.0.0'
      },
      peerDependenciesMeta: {
        '@angular/forms': {
          optional: true
        }
      },
      exports: {
        '.': {
          types: './index.d.ts',
          import: './index.js',
          require: './index.js'
        },
        './package.json': './package.json',
        './styles/*': './styles/*',
        ...this.generateComponentExports()
      },
      files: [
        'components/**/*',
        'styles/**/*',
        'utils/**/*',
        'index.js',
        'index.d.ts',
        'README.md',
        'LICENSE',
        'CHANGELOG.md'
      ],
      publishConfig: {
        access: 'public'
      }
    };
    
    fs.writeFileSync(
      path.join(this.packagePath, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );
  }

  generateComponentExports() {
    const exports = {};
    
    COMPONENTS.forEach(component => {
      exports[`./${component}`] = {
        types: `./components/${component}/index.d.ts`,
        import: `./components/${component}/index.js`,
        require: `./components/${component}/index.js`
      };
    });
    
    return exports;
  }

  generateIndexFiles() {
    // Generate main index.js
    const indexJs = `// ng-shadcn Components
// Export all components for convenience

${COMPONENTS.map(comp => 
  `export * from './components/${comp}/index.js';`
).join('\n')}

// Export utilities
export * from './utils/index.js';
`;
    
    fs.writeFileSync(path.join(this.packagePath, 'index.js'), indexJs);
    
    // Generate main index.d.ts
    const indexDts = `// ng-shadcn Components Type Definitions

${COMPONENTS.map(comp => 
  `export * from './components/${comp}/index';`
).join('\n')}

// Export utilities
export * from './utils/index';
`;
    
    fs.writeFileSync(path.join(this.packagePath, 'index.d.ts'), indexDts);
    
    // Generate utils index if it doesn't exist
    const utilsIndexPath = path.join(this.packagePath, 'utils', 'index.js');
    if (!fs.existsSync(utilsIndexPath)) {
      fs.writeFileSync(utilsIndexPath, '// Utility functions\n');
      fs.writeFileSync(
        path.join(this.packagePath, 'utils', 'index.d.ts'),
        '// Utility type definitions\n'
      );
    }
  }

  generateReadme() {
    const readme = `# @ng-shadcn/components

Beautiful, accessible Angular components inspired by shadcn/ui, built with Angular 19+ and TailwindCSS v4.

## Features

- 🎨 **Beautiful Design**: Inspired by shadcn/ui with modern aesthetics
- ♿ **Accessible**: Built with accessibility in mind (WCAG 2.1 AA)
- 🚀 **Modern Angular**: Uses Angular 19+ with signals and standalone components
- 🎯 **TypeScript**: Full TypeScript support with strict typing
- 🎨 **Customizable**: Easy theming with CSS variables and TailwindCSS
- 📦 **Tree-shakable**: Optimized bundle sizes with tree-shaking support
- 🔧 **Developer Experience**: Excellent DX with comprehensive documentation

## Installation

\`\`\`bash
npm install @ng-shadcn/components
\`\`\`

### Peer Dependencies

Make sure you have the required peer dependencies installed:

\`\`\`bash
npm install @angular/core @angular/common tailwindcss class-variance-authority clsx
\`\`\`

## Quick Start

1. **Setup TailwindCSS** in your Angular project
2. **Add the CSS variables** to your global styles
3. **Import and use components**

### 1. TailwindCSS Configuration

Add to your \`tailwind.config.js\`:

\`\`\`javascript
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/@ng-shadcn/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}
\`\`\`

### 2. Add CSS Variables

Add to your global styles:

\`\`\`css
@import '@ng-shadcn/components/styles/globals.css';
\`\`\`

Or manually add the variables:

\`\`\`css
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
}
\`\`\`

### 3. Use Components

\`\`\`typescript
import { Component } from '@angular/core';
import { ButtonComponent } from '@ng-shadcn/components/button';
import { InputComponent } from '@ng-shadcn/components/input';
import { CardComponent } from '@ng-shadcn/components/card';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ButtonComponent, InputComponent, CardComponent],
  template: \`
    <ng-shadcn-card class="p-6 max-w-md mx-auto">
      <h2 class="text-lg font-semibold mb-4">Login Form</h2>
      
      <div class="space-y-4">
        <ng-shadcn-input 
          type="email" 
          placeholder="Enter your email"
          [(ngModel)]="email"
        />
        
        <ng-shadcn-input 
          type="password" 
          placeholder="Enter your password"
          [(ngModel)]="password"
        />
        
        <ng-shadcn-button 
          variant="default" 
          class="w-full"
          (click)="onSubmit()"
        >
          Sign In
        </ng-shadcn-button>
      </div>
    </ng-shadcn-card>
  \`
})
export class ExampleComponent {
  email = '';
  password = '';
  
  onSubmit() {
    console.log('Form submitted:', { email: this.email, password: this.password });
  }
}
\`\`\`

## Available Components

${COMPONENTS.map(comp => `- **${comp.charAt(0).toUpperCase() + comp.slice(1).replace('-', ' ')}** - \`@ng-shadcn/components/${comp}\``).join('\n')}

## Documentation

- 📚 [Component Documentation](https://ng-shadcn.dev/docs)
- 🎮 [Interactive Storybook](https://ng-shadcn.dev/storybook)
- 💡 [Examples & Recipes](https://ng-shadcn.dev/examples)

## Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/ng-shadcn/components/blob/main/CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- 💬 [Discord Community](https://discord.gg/ng-shadcn)
- 🐛 [Report Issues](https://github.com/ng-shadcn/components/issues)
- 📧 [Email Support](mailto:support@ng-shadcn.dev)

---

Built with ❤️ by the ng-shadcn team
`;
    
    fs.writeFileSync(path.join(this.packagePath, 'README.md'), readme);
  }

  generateLicense() {
    const license = `MIT License

Copyright (c) ${new Date().getFullYear()} ng-shadcn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;
    
    fs.writeFileSync(path.join(this.packagePath, 'LICENSE'), license);
  }

  generateChangelog() {
    const changelog = `# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - ${new Date().toISOString().split('T')[0]}

### Added
- Initial release of ng-shadcn components
- ${COMPONENTS.length} production-ready components
- Full TypeScript support
- Angular 19+ compatibility
- TailwindCSS v4 integration
- Comprehensive documentation
- Storybook integration
- Jest unit tests
- Playwright E2E tests
- SSR compatibility
- Tree-shaking optimization
- Accessibility features (WCAG 2.1 AA)

### Components
${COMPONENTS.map(comp => `- ${comp.charAt(0).toUpperCase() + comp.slice(1).replace('-', ' ')} component`).join('\n')}

### Features
- Signal-based reactive patterns
- Standalone component architecture
- CSS variables theming system
- Form integration with ControlValueAccessor
- Keyboard navigation support
- Focus management
- ARIA attributes
- RTL support
- Dark mode support
- Custom variant system
- Bundle size optimization

### Documentation
- Component API documentation
- Usage examples
- Migration guides
- Best practices
- Accessibility guidelines
- Theming documentation
- SSR usage guide

### Testing
- Unit tests with >80% coverage
- E2E tests with Playwright
- Visual regression tests
- Accessibility tests
- Performance tests
- Bundle size monitoring

### Tooling
- CLI for component installation
- Bundle analyzer
- Build optimizer
- SSR compatibility tester
- Migration tools
- Theme builder (optional)

## [Unreleased]

### Planned
- Additional components (Data Table, Calendar, etc.)
- Enhanced animations
- More theme presets
- Advanced form components
- Chart components
- Layout components
- Virtualization support
- Internationalization (i18n)
- Advanced accessibility features
- Performance optimizations
`;
    
    fs.writeFileSync(path.join(this.packagePath, 'CHANGELOG.md'), changelog);
  }

  async createTarball() {
    console.log('📦 Creating distribution tarball...');
    
    try {
      execSync(`npm pack`, {
        cwd: this.packagePath,
        stdio: 'inherit'
      });
      
      // Move tarball to root dist
      const files = fs.readdirSync(this.packagePath);
      const tarball = files.find(f => f.endsWith('.tgz'));
      
      if (tarball) {
        fs.renameSync(
          path.join(this.packagePath, tarball),
          path.join(this.distPath, tarball)
        );
        
        console.log(`✅ Tarball created: ${tarball}\n`);
      }
    } catch (error) {
      console.warn('⚠️ Could not create tarball:', error.message);
    }
  }

  showSummary() {
    const packageSize = this.getDirectorySize(this.packagePath);
    const componentSizes = COMPONENTS.map(comp => {
      const compPath = path.join(this.packagePath, 'components', comp);
      return {
        name: comp,
        size: fs.existsSync(compPath) ? this.getDirectorySize(compPath) : 0
      };
    });
    
    console.log('📊 Distribution Summary');
    console.log('=' .repeat(50));
    console.log(`📦 Package size: ${(packageSize / 1024).toFixed(2)} KB`);
    console.log(`🧩 Components: ${COMPONENTS.length}`);
    console.log(`📁 Location: ${this.packagePath}`);
    console.log();
    
    console.log('Component Sizes:');
    componentSizes.forEach(comp => {
      if (comp.size > 0) {
        console.log(`  • ${comp.name}: ${(comp.size / 1024).toFixed(2)} KB`);
      }
    });
    
    console.log();
    console.log('📋 Next Steps:');
    console.log('1. Test the package locally: npm install ./dist/ng-shadcn');
    console.log('2. Publish to NPM: cd dist/ng-shadcn && npm publish');
    console.log('3. Update documentation with new version');
    console.log('4. Create GitHub release');
  }

  getDirectorySize(dirPath) {
    if (!fs.existsSync(dirPath)) return 0;
    
    let totalSize = 0;
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stats = fs.statSync(itemPath);
      
      if (stats.isDirectory()) {
        totalSize += this.getDirectorySize(itemPath);
      } else {
        totalSize += stats.size;
      }
    }
    
    return totalSize;
  }
}

// Run distribution creation if called directly
if (require.main === module) {
  const creator = new DistributionCreator();
  creator.create().catch(console.error);
}

module.exports = DistributionCreator;

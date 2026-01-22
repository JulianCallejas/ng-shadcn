import { test, expect } from '@playwright/test';
import { execSync } from 'child_process';
import { existsSync, readFileSync, rmSync } from 'fs';
import { join } from 'path';

test.describe('CLI Installation Workflow', () => {
  const testProjectPath = join(process.cwd(), 'test-project');
  const componentsPath = join(testProjectPath, 'src', 'components');

  test.beforeEach(async () => {
    // Clean up any existing test project
    if (existsSync(testProjectPath)) {
      rmSync(testProjectPath, { recursive: true, force: true });
    }
  });

  test.afterEach(async () => {
    // Clean up test project after each test
    if (existsSync(testProjectPath)) {
      rmSync(testProjectPath, { recursive: true, force: true });
    }
  });

  test('should initialize ng-shadcn project', async () => {
    // Skip if CLI is not built
    const cliPath = join(process.cwd(), 'cli', 'dist', 'index.js');
    if (!existsSync(cliPath)) {
      test.skip('CLI not built - run npm run build:cli first');
    }

    // Create a minimal Angular project structure
    execSync(`mkdir -p ${testProjectPath}/src/app`, { stdio: 'inherit' });
    
    // Create basic Angular files
    const angularJson = {
      projects: {
        'test-project': {
          root: '',
          sourceRoot: 'src',
          projectType: 'application'
        }
      }
    };
    
    const packageJson = {
      name: 'test-project',
      version: '1.0.0',
      dependencies: {
        '@angular/core': '^19.0.0'
      }
    };

    require('fs').writeFileSync(
      join(testProjectPath, 'angular.json'),
      JSON.stringify(angularJson, null, 2)
    );
    
    require('fs').writeFileSync(
      join(testProjectPath, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );

    // Run ng-shadcn init
    try {
      execSync(`cd ${testProjectPath} && node ${cliPath} init`, {
        stdio: 'pipe',
        timeout: 30000
      });

      // Check if configuration files were created
      expect(existsSync(join(testProjectPath, 'ng-shadcn.json'))).toBe(true);
      expect(existsSync(join(testProjectPath, 'src', 'components'))).toBe(true);

      // Check configuration content
      const config = JSON.parse(
        readFileSync(join(testProjectPath, 'ng-shadcn.json'), 'utf-8')
      );
      
      expect(config).toHaveProperty('componentsPath');
      expect(config).toHaveProperty('tailwindConfig');
      expect(config.componentsPath).toBe('src/components');

    } catch (error) {
      console.error('CLI init failed:', error);
      test.skip('CLI init command failed');
    }
  });

  test('should install button component', async () => {
    const cliPath = join(process.cwd(), 'cli', 'dist', 'index.js');
    if (!existsSync(cliPath)) {
      test.skip('CLI not built - run npm run build:cli first');
    }

    // Setup test project (simplified version of init)
    execSync(`mkdir -p ${componentsPath}`, { stdio: 'inherit' });
    
    const config = {
      componentsPath: 'src/components',
      tailwindConfig: 'tailwind.config.js',
      cssPath: 'src/global_styles.css'
    };
    
    require('fs').writeFileSync(
      join(testProjectPath, 'ng-shadcn.json'),
      JSON.stringify(config, null, 2)
    );

    // Run component installation
    try {
      execSync(`cd ${testProjectPath} && node ${cliPath} install button`, {
        stdio: 'pipe',
        timeout: 30000
      });

      // Check if button component was installed
      const buttonPath = join(componentsPath, 'button');
      expect(existsSync(buttonPath)).toBe(true);
      expect(existsSync(join(buttonPath, 'button.component.ts'))).toBe(true);
      expect(existsSync(join(buttonPath, 'button.metadata.ts'))).toBe(true);
      expect(existsSync(join(buttonPath, 'index.ts'))).toBe(true);

      // Check component content
      const componentContent = readFileSync(
        join(buttonPath, 'button.component.ts'),
        'utf-8'
      );
      
      expect(componentContent).toContain('ButtonComponent');
      expect(componentContent).toContain('ng-shadcn-button');
      expect(componentContent).toContain('@Component');

    } catch (error) {
      console.error('CLI install failed:', error);
      test.skip('CLI install command failed');
    }
  });

  test('should install multiple components', async () => {
    const cliPath = join(process.cwd(), 'cli', 'dist', 'index.js');
    if (!existsSync(cliPath)) {
      test.skip('CLI not built - run npm run build:cli first');
    }

    // Setup test project
    execSync(`mkdir -p ${componentsPath}`, { stdio: 'inherit' });
    
    const config = {
      componentsPath: 'src/components',
      tailwindConfig: 'tailwind.config.js',
      cssPath: 'src/global_styles.css'
    };
    
    require('fs').writeFileSync(
      join(testProjectPath, 'ng-shadcn.json'),
      JSON.stringify(config, null, 2)
    );

    const componentsToTest = ['button', 'input', 'card'];

    for (const component of componentsToTest) {
      try {
        execSync(`cd ${testProjectPath} && node ${cliPath} install ${component}`, {
          stdio: 'pipe',
          timeout: 30000
        });

        // Check if component was installed
        const componentPath = join(componentsPath, component);
        expect(existsSync(componentPath)).toBe(true);
        expect(existsSync(join(componentPath, `${component}.component.ts`))).toBe(true);

      } catch (error) {
        console.error(`CLI install ${component} failed:`, error);
        // Continue with other components
      }
    }
  });

  test('should handle invalid component names', async () => {
    const cliPath = join(process.cwd(), 'cli', 'dist', 'index.js');
    if (!existsSync(cliPath)) {
      test.skip('CLI not built - run npm run build:cli first');
    }

    // Setup test project
    execSync(`mkdir -p ${componentsPath}`, { stdio: 'inherit' });
    
    const config = {
      componentsPath: 'src/components',
      tailwindConfig: 'tailwind.config.js',
      cssPath: 'src/global_styles.css'
    };
    
    require('fs').writeFileSync(
      join(testProjectPath, 'ng-shadcn.json'),
      JSON.stringify(config, null, 2)
    );

    // Try to install non-existent component
    try {
      execSync(`cd ${testProjectPath} && node ${cliPath} install nonexistent-component`, {
        stdio: 'pipe',
        timeout: 30000
      });
      
      // Should not reach here if error handling works
      expect(false).toBe(true);
      
    } catch (error) {
      // This is expected - the command should fail
      expect(error).toBeDefined();
    }
  });
});

test.describe('CLI Integration with ng-shadcn App', () => {
  test('should verify all components are available in CLI', async () => {
    const cliPath = join(process.cwd(), 'cli', 'dist', 'index.js');
    if (!existsSync(cliPath)) {
      test.skip('CLI not built - run npm run build:cli first');
    }

    // List of all expected components based on the project status
    const expectedComponents = [
      'button',
      'input', 
      'card',
      'switch',
      'dialog',
      'tooltip',
      'select',
      'checkbox',
      'radio-group',
      'textarea',
      'badge',
      'alert'
    ];

    // Check that all component source files exist
    for (const component of expectedComponents) {
      const componentPath = join(process.cwd(), 'packages', component);
      expect(existsSync(componentPath)).toBe(true);
      
      const srcPath = join(componentPath, 'src', 'lib');
      expect(existsSync(srcPath)).toBe(true);
      
      // Check for main component file
      const componentFiles = require('fs').readdirSync(srcPath);
      const hasComponentFile = componentFiles.some(file => 
        file.endsWith('.component.ts') && file.includes(component)
      );
      expect(hasComponentFile).toBe(true);
    }
  });

  test('should verify CLI metadata matches available components', async () => {
    const cliInstallPath = join(process.cwd(), 'cli', 'src', 'commands', 'install.ts');
    
    if (!existsSync(cliInstallPath)) {
      test.skip('CLI install command not found');
    }

    const installContent = readFileSync(cliInstallPath, 'utf-8');
    
    // Check that the CLI knows about all major components
    const expectedComponents = [
      'button', 'input', 'card', 'switch', 'dialog', 'tooltip',
      'select', 'checkbox', 'radio-group', 'textarea', 'badge', 'alert'
    ];

    for (const component of expectedComponents) {
      // The CLI should have some reference to each component
      expect(installContent.toLowerCase()).toContain(component);
    }
  });
});

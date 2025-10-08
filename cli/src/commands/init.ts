import * as fs from 'fs-extra';
import * as path from 'path';
import inquirer from 'inquirer';

export async function initProject() {
  console.log('🚀 Initializing ng-shadcn in your project...');

  // Check if Angular project
  if (!fs.existsSync('angular.json')) {
    console.error('❌ This is not an Angular project.');
    process.exit(1);
  }

  // Ask for configuration
  const config = await inquirer.prompt([
    {
      type: 'input',
      name: 'componentsPath',
      message: 'Where would you like to install components?',
      default: 'src/components'
    },
    {
      type: 'list',
      name: 'mode',
      message: 'Which mode would you prefer?',
      choices: [
        { name: 'Signals (Recommended)', value: 'signals' },
        { name: 'Observables', value: 'observables' }
      ],
      default: 'signals'
    },
    {
      type: 'confirm',
      name: 'installTailwind',
      message: 'Do you want to configure Tailwind CSS?',
      default: true
    }
  ]);

  try {
    // Create components directory
    await fs.ensureDir(config.componentsPath);
    console.log(`✅ Created ${config.componentsPath} directory`);

    // Create ng-shadcn config
    const configFile = {
      componentsPath: config.componentsPath,
      mode: config.mode,
      tailwindConfig: config.installTailwind
    };

    await fs.writeJson('ng-shadcn.json', configFile, { spaces: 2 });
    console.log('✅ Created ng-shadcn.json config file');

    if (config.installTailwind) {
      await setupTailwind();
    }

    console.log('🎉 ng-shadcn initialized successfully!');
    console.log('\n📖 Next steps:');
    console.log('1. Install a component: npx ng-shadcn install button');
    console.log('2. Import and use in your components');

  } catch (error) {
    console.error('❌ Initialization failed:', error);
    process.exit(1);
  }
}

async function setupTailwind() {
  // Check if tailwind.config.js exists
  const tailwindConfigPath = 'tailwind.config.js';
  
  if (!fs.existsSync(tailwindConfigPath)) {
    const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
};`;

    await fs.writeFile(tailwindConfigPath, tailwindConfig);
    console.log('✅ Created tailwind.config.js');
  }

  // Update global styles
  const globalStylesPath = 'src/global_styles.css';
  const globalStyles = `@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`;

  await fs.writeFile(globalStylesPath, globalStyles);
  console.log('✅ Updated global styles');
}
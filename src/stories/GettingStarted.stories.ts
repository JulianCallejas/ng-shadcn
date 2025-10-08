import type { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'getting-started-page',
  standalone: true,
  template: `
    <div class="max-w-4xl mx-auto p-6 font-sans">
      <h1 class="text-4xl font-bold text-gray-900 mb-6">Getting Started</h1>
      
      <p class="text-lg text-gray-600 mb-8">
        Learn how to integrate ng-shadcn components into your Angular application.
      </p>
      
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">📋 Prerequisites</h2>
      <p class="text-gray-600 mb-4">Before you begin, ensure you have:</p>
      <ul class="text-gray-600 mb-8 space-y-2">
        <li>• <strong>Node.js</strong> 18+ installed</li>
        <li>• <strong>Angular CLI</strong> 19+ installed</li>
        <li>• An existing <strong>Angular 19+</strong> project</li>
        <li>• <strong>TailwindCSS</strong> configured in your project</li>
      </ul>
      
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">🚀 Quick Start</h2>
      
      <div class="space-y-6">
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="text-xl font-medium text-gray-700 mb-3">1. Install the CLI Tool</h3>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>npm install -g &#64;ng-shadcn/cli</code></pre>
        </div>
        
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="text-xl font-medium text-gray-700 mb-3">2. Initialize in Your Project</h3>
          <p class="text-gray-600 mb-4">Navigate to your Angular project and run:</p>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4"><code>cd your-angular-project
ng-shadcn init</code></pre>
          <p class="text-gray-600 mb-2">This will:</p>
          <ul class="text-gray-600 space-y-1">
            <li>• Configure TailwindCSS if not already set up</li>
            <li>• Add necessary dependencies</li>
            <li>• Set up the component configuration</li>
          </ul>
        </div>
        
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="text-xl font-medium text-gray-700 mb-3">3. Add Your First Component</h3>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4"><code>ng-shadcn add button</code></pre>
          <p class="text-gray-600 mb-2">This command will:</p>
          <ul class="text-gray-600 space-y-1">
            <li>• Download the Button component</li>
            <li>• Add it to your project structure</li>
            <li>• Update necessary imports</li>
          </ul>
        </div>
        
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="text-xl font-medium text-gray-700 mb-3">4. Use the Component</h3>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm"><code>// app.component.ts
import {{ '{' }} Component {{ '}' }} from '&#64;angular/core';
import {{ '{' }} ButtonComponent {{ '}' }} from './components/ui/button/button.component';

&#64;Component({{ '{' }}
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent],
  template: \`
    &lt;ui-button variant="default" size="md"&gt;
      Click me!
    &lt;/ui-button&gt;
  \`
{{ '}' }})
export class AppComponent {{ '{' }}{{ '}' }}</code></pre>
        </div>
      </div>
      
      <h2 class="text-2xl font-semibold text-gray-800 mb-4 mt-12">🎨 TailwindCSS Setup</h2>
      <p class="text-gray-600 mb-6">If you don't have TailwindCSS configured, follow these steps:</p>
      
      <div class="space-y-4">
        <div class="border border-orange-200 bg-orange-50 rounded-lg p-4">
          <h3 class="text-lg font-medium text-orange-800 mb-2">1. Install TailwindCSS</h3>
          <pre class="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto"><code>npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p</code></pre>
        </div>
        
        <div class="border border-orange-200 bg-orange-50 rounded-lg p-4">
          <h3 class="text-lg font-medium text-orange-800 mb-2">2. Configure tailwind.config.js</h3>
          <pre class="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto"><code>/** &#64;type {{ '{' }}import('tailwindcss').Config{{ '}' }} */
module.exports = {{ '{' }}
  content: [
    "./src/**/*.{{ '{' }}html,ts{{ '}' }}",
  ],
  theme: {{ '{' }}
    extend: {{ '{' }}{{ '}' }},
  {{ '}' }},
  plugins: [],
{{ '}' }}</code></pre>
        </div>
        
        <div class="border border-orange-200 bg-orange-50 rounded-lg p-4">
          <h3 class="text-lg font-medium text-orange-800 mb-2">3. Add Tailwind directives to styles.css</h3>
          <pre class="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto"><code>&#64;tailwind base;
&#64;tailwind components;
&#64;tailwind utilities;</code></pre>
        </div>
      </div>
      
      <h2 class="text-2xl font-semibold text-gray-800 mb-4 mt-12">📦 Available Commands</h2>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 class="text-lg font-medium text-blue-800 mb-2">Add Components</h3>
          <pre class="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto"><code># Add a single component
ng-shadcn add button

# Add multiple components
ng-shadcn add button input card

# Add all components
ng-shadcn add --all</code></pre>
        </div>
        
        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 class="text-lg font-medium text-green-800 mb-2">List & Update</h3>
          <pre class="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto"><code># List available components
ng-shadcn list

# Update a specific component
ng-shadcn update button

# Update all components
ng-shadcn update --all</code></pre>
        </div>
      </div>
      
      <h2 class="text-2xl font-semibold text-gray-800 mb-4 mt-12">🏗️ Project Structure</h2>
      <p class="text-gray-600 mb-4">After adding components, your project structure will look like:</p>
      <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <pre class="text-gray-700 text-sm"><code>src/
├── app/
│   └── components/
│       └── ui/
│           ├── button/
│           │   ├── button.component.ts
│           │   └── button.component.html
│           ├── input/
│           └── ...
└── styles.css</code></pre>
      </div>
      
      <h2 class="text-2xl font-semibold text-gray-800 mb-4 mt-12">🔧 Troubleshooting</h2>
      
      <div class="space-y-4">
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <h4 class="text-yellow-800 font-semibold mb-2">TailwindCSS styles not applying:</h4>
          <ul class="text-yellow-700 space-y-1 text-sm">
            <li>• Ensure TailwindCSS is properly configured</li>
            <li>• Check that your content paths include component files</li>
            <li>• Verify Tailwind directives are in your global styles</li>
          </ul>
        </div>
        
        <div class="bg-red-50 border-l-4 border-red-400 p-4">
          <h4 class="text-red-800 font-semibold mb-2">Component not found:</h4>
          <ul class="text-red-700 space-y-1 text-sm">
            <li>• Make sure you've imported the component</li>
            <li>• Check that the component was added to your project</li>
            <li>• Verify the import path is correct</li>
          </ul>
        </div>
        
        <div class="bg-teal-50 border-l-4 border-teal-400 p-4">
          <h4 class="text-teal-800 font-semibold mb-2">TypeScript errors:</h4>
          <ul class="text-teal-700 space-y-1 text-sm">
            <li>• Ensure you're using Angular 19+</li>
            <li>• Check that all dependencies are installed</li>
            <li>• Verify your tsconfig.json is properly configured</li>
          </ul>
        </div>
      </div>
      
      <hr class="my-8 border-gray-200" />
      
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p class="text-blue-800 font-semibold mb-2">Next Steps:</p>
        <p class="text-blue-600">Explore individual components in the sidebar to see detailed examples and API documentation.</p>
      </div>
    </div>
  `,
})
class GettingStartedComponent {}

const meta: Meta<GettingStartedComponent> = {
  title: 'Introduction/02-Getting Started',
  component: GettingStartedComponent,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<GettingStartedComponent>;

export const GettingStarted: Story = {};

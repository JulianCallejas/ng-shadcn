import type { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'welcome-page',
  standalone: true,
  template: `
    <div class="max-w-4xl mx-auto p-6 font-sans">
      <h1 class="text-4xl font-bold text-foreground mb-6">Welcome to ng-shadcn UI Components</h1>
      
      <p class="text-lg text-foreground/70 mb-8">
        A comprehensive Angular component library inspired by shadcn/ui, built with Angular 19+ and TailwindCSS.
      </p>
      
      <h2 class="text-2xl font-semibold text-foreground/80 mb-4">🚀 Features</h2>
      <ul class="text-foreground/70 mb-8 space-y-2">
        <li><strong>16 Production-Ready Components</strong> - Complete set of UI components for modern Angular applications</li>
        <li><strong>Angular 19+ Support</strong> - Built with the latest Angular features including signals and standalone components</li>
        <li><strong>TailwindCSS Integration</strong> - Styled with TailwindCSS v3.4.18 for consistent design</li>
        <li><strong>TypeScript First</strong> - Fully typed components with excellent IntelliSense support</li>
        <li><strong>Accessibility Ready</strong> - WCAG compliant components with proper ARIA attributes</li>
        <li><strong>Tree Shakeable</strong> - Import only what you need for optimal bundle size</li>
      </ul>
      
      <h2 class="text-2xl font-semibold text-foreground/80 mb-4">📦 Available Components</h2>
      
      <h3 class="text-xl font-medium text-foreground/75 mb-3">Core Components (12)</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        <a onclick="window.parent.location.href = './?path=/docs/components-button'" class="p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-colors cursor-pointer no-underline">
          <strong class="text-blue-800">Button</strong>
          <p class="text-sm text-blue-600">Various styles and sizes with loading states</p>
        </a>
        <a onclick="window.parent.location.href = './?path=/docs/components-input'" class="p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-colors cursor-pointer no-underline">
          <strong class="text-blue-800">Input</strong>
          <p class="text-sm text-blue-600">Text inputs with validation and icons</p>
        </a>
        <a onclick="window.parent.location.href = './?path=/docs/components-card'" class="p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-colors cursor-pointer no-underline">
          <strong class="text-blue-800">Card</strong>
          <p class="text-sm text-blue-600">Flexible content containers</p>
        </a>
        <a onclick="window.parent.location.href = './?path=/docs/components-switch'" class="p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-colors cursor-pointer no-underline">
          <strong class="text-blue-800">Switch</strong>
          <p class="text-sm text-blue-600">Toggle switches with smooth animations</p>
        </a>
        <a onclick="window.parent.location.href = './?path=/docs/components-dialog'" class="p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-colors cursor-pointer no-underline">
          <strong class="text-blue-800">Dialog</strong>
          <p class="text-sm text-blue-600">Modal dialogs and overlays</p>
        </a>
        <a onclick="window.parent.location.href = './?path=/docs/components-tooltip'" class="p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-colors cursor-pointer no-underline">
          <strong class="text-blue-800">Tooltip</strong>
          <p class="text-sm text-blue-600">Contextual help and information</p>
        </a>
        <a onclick="window.parent.location.href = './?path=/docs/components-select'" class="p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-colors cursor-pointer no-underline">
          <strong class="text-blue-800">Select</strong>
          <p class="text-sm text-blue-600">Dropdown selection components</p>
        </a>
        <a onclick="window.parent.location.href = './?path=/docs/components-checkbox'" class="p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-colors cursor-pointer no-underline">
          <strong class="text-blue-800">Checkbox</strong>
          <p class="text-sm text-blue-600">Multi-selection inputs</p>
        </a>
        <a onclick="window.parent.location.href = './?path=/docs/components-radio-group'" class="p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-colors cursor-pointer no-underline">
          <strong class="text-blue-800">Radio Group</strong>
          <p class="text-sm text-blue-600">Single selection from multiple options</p>
        </a>
        <a onclick="window.parent.location.href = './?path=/docs/components-textarea'" class="p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-colors cursor-pointer no-underline">
          <strong class="text-blue-800">Textarea</strong>
          <p class="text-sm text-blue-600">Multi-line text inputs</p>
        </a>
        <a onclick="window.parent.location.href = './?path=/docs/components-badge'" class="p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-colors cursor-pointer no-underline">
          <strong class="text-blue-800">Badge</strong>
          <p class="text-sm text-blue-600">Status indicators and labels</p>
        </a>
        <a onclick="window.parent.location.href = './?path=/docs/components-alert'" class="p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-colors cursor-pointer no-underline">
          <strong class="text-blue-800">Alert</strong>
          <p class="text-sm text-blue-600">Notification and message components</p>
        </a>
      </div>
      
      <h3 class="text-xl font-medium text-foreground/75 mb-3">Advanced Components (4)</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
        <a onclick="window.parent.location.href = './?path=/docs/components-tabs'" class="p-3 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 hover:border-green-300 transition-colors cursor-pointer no-underline">
          <strong class="text-green-800">Tabs</strong>
          <p class="text-sm text-green-600">Horizontal and vertical tab navigation</p>
        </a>
        <a onclick="window.parent.location.href = './?path=/docs/components-dropdown-menu'" class="p-3 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 hover:border-green-300 transition-colors cursor-pointer no-underline">
          <strong class="text-green-800">Dropdown Menu</strong>
          <p class="text-sm text-green-600">Context menus with keyboard navigation</p>
        </a>
        <a onclick="window.parent.location.href = './?path=/docs/components-popover'" class="p-3 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 hover:border-green-300 transition-colors cursor-pointer no-underline">
          <strong class="text-green-800">Popover</strong>
          <p class="text-sm text-green-600">Smart positioning tooltips and content overlays</p>
        </a>
        <a onclick="window.parent.location.href = './?path=/docs/components-accordion'" class="p-3 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 hover:border-green-300 transition-colors cursor-pointer no-underline">
          <strong class="text-green-800">Accordion</strong>
          <p class="text-sm text-green-600">Collapsible content sections</p>
        </a>
      </div>
      
      <h2 class="text-2xl font-semibold text-foreground/80 mb-4">🛠️ Installation</h2>
      <p class="text-foreground/70 mb-4">Use our CLI tool to add components to your Angular project:</p>
      <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-8"><code>npm install -g &#64;ng-shadcn/cli
ng-shadcn add button</code></pre>
      
      <h2 class="text-2xl font-semibold text-foreground/80 mb-4">📖 Documentation</h2>
      <p class="text-foreground/70 mb-4">Each component includes:</p>
      <ul class="text-foreground/70 mb-8 space-y-1">
        <li>• Interactive examples in this Storybook</li>
        <li>• API documentation with all props and events</li>
        <li>• Accessibility guidelines</li>
        <li>• Usage examples and best practices</li>
      </ul>
      
      <h2 class="text-2xl font-semibold text-foreground/80 mb-4">🎨 Theming</h2>
      <p class="text-foreground/70 mb-4">All components support:</p>
      <ul class="text-foreground/70 mb-8 space-y-1">
        <li>• Light and dark themes</li>
        <li>• Custom color schemes</li>
        <li>• CSS custom properties for easy customization</li>
        <li>• TailwindCSS utility classes</li>
      </ul>
      
      <h2 class="text-2xl font-semibold text-foreground/80 mb-4">🧪 Testing</h2>
      <p class="text-foreground/70 mb-4">The library includes:</p>
      <ul class="text-foreground/70 mb-8 space-y-1">
        <li>• Comprehensive Jest unit tests (>80% coverage)</li>
        <li>• Playwright E2E tests</li>
        <li>• Accessibility testing utilities</li>
      </ul>
      
      <hr class="my-8 border-gray-200" />
      
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p class="text-blue-800 font-semibold mb-2">Ready to get started?</p>
        <p class="text-blue-600">Browse the components in the sidebar or check out our Getting Started guide.</p>
      </div>
    </div>
  `,
})
class WelcomeComponent {}

const meta: Meta<WelcomeComponent> = {
  title: 'Welcome',
  component: WelcomeComponent,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<WelcomeComponent>;

export const Welcome: Story = {};

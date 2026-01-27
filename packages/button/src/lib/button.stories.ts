import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent],
    }),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `A highly customizable button component with multiple variants, sizes, and states. Built with Angular and TailwindCSS.
## Installation

\`\`\`bash
# Using npm
npm install @ng-shadcn/button
# Using yarn
yarn add @ng-shadcn/button
# Using pnpm
pnpm add @ng-shadcn/button
\`\`\`
## Usage
### Standalone Components (Recommended)
Import and use the button component directly in your standalone components:

\`\`\`typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@ng-shadcn/button';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent
  ],
  template: \`
    <ng-shadcn-button 
      variant="default" 
      size="default"
      (clicked)="onButtonClick()">
      Click me
    </ng-shadcn-button>
  \`
})
export class ExampleComponent {
  onButtonClick() {
    console.log('Button clicked!');
  }
}
\`\`\`

### Using NgModule (Legacy)
If you're using NgModules, import the \`ButtonModule\`:

\`\`\`typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@ng-shadcn/button';

@NgModule({
  declarations: [YourComponent],
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [YourComponent]
})
export class YourModule { }
\`\`\`

Then use the button in your templates:

\`\`\`html
<ng-shadcn-button 
  variant="primary" 
  size="lg"
  [disabled]="isLoading"
  (clicked)="handleClick()">
  <span *ngIf="!isLoading">Submit</span>
  <span *ngIf="isLoading" class="flex items-center">
    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Processing...
  </span>
</ng-shadcn-button>
\`\`\`

## Features
- **Multiple Variants**: Choose from different visual styles (default, destructive, outline, secondary, ghost, link)
- **Responsive Sizing**: Various size options including small, default, large, and icon-only
- **Loading States**: Built-in support for loading spinners and disabled states
- **Icon Support**: Easily add icons before or after text
- **Accessible**: Follows WAI-ARIA design patterns for buttons
- **TypeScript Support**: Fully typed API with strict type checking
- **Customizable**: Extend with custom classes and styles
- **Event Handling**: Simple click event binding with (clicked) output
- **Disabled State**: Visual feedback for disabled buttons`,
      },
      extractComponentDescription: (component: any) => {
        if (component === ButtonComponent) {
          return 'A highly customizable button component that handles user interactions with various visual styles and states.';
        }
        return null;
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'The visual style variant of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'The size of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    class: {
      control: 'text',
      description: 'Additional CSS classes to apply',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    clicked: {
      action: 'clicked',
      description: 'Event emitted when button is clicked',
      table: {
        type: { summary: 'EventEmitter<void>' },
      },
    },
  },
  args: {
    variant: 'default',
    size: 'default',
    disabled: false,
    class: '',
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: '<ng-shadcn-button [variant]="variant" [size]="size" [disabled]="disabled" [class]="class" (clicked)="clicked($event)">Button</ng-shadcn-button>',
  }),
  parameters: {
    docs: {
      source: {
        code: '<ng-shadcn-button>Button</ng-shadcn-button>',
      },
    },
  },
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap gap-4">
        <ng-shadcn-button variant="default" class="px-0">Default</ng-shadcn-button>
        <ng-shadcn-button variant="destructive">Destructive</ng-shadcn-button>
        <ng-shadcn-button variant="outline">Outline</ng-shadcn-button>
        <ng-shadcn-button variant="secondary">Secondary</ng-shadcn-button>
        <ng-shadcn-button variant="ghost">Ghost</ng-shadcn-button>
        <ng-shadcn-button variant="link">Link</ng-shadcn-button>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'All available button variants showcased together.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-4">
        <ng-shadcn-button size="sm">Small</ng-shadcn-button>
        <ng-shadcn-button size="default">Default</ng-shadcn-button>
        <ng-shadcn-button size="lg">Large</ng-shadcn-button>
        <ng-shadcn-button size="icon">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
        </ng-shadcn-button>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Different button sizes including an icon-only variant.',
      },
    },
  },
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap gap-4">
        <ng-shadcn-button [disabled]="true">Disabled Default</ng-shadcn-button>
        <ng-shadcn-button variant="destructive" [disabled]="true">Disabled Destructive</ng-shadcn-button>
        <ng-shadcn-button variant="outline" [disabled]="true">Disabled Outline</ng-shadcn-button>
        <ng-shadcn-button variant="secondary" [disabled]="true">Disabled Secondary</ng-shadcn-button>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Disabled states for different button variants.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap gap-4">
        <ng-shadcn-button>
          <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Add Item
        </ng-shadcn-button>
        <ng-shadcn-button variant="outline">
          <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
          </svg>
          Download
        </ng-shadcn-button>
        <ng-shadcn-button variant="secondary">
          Settings
          <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
        </ng-shadcn-button>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with icons positioned before or after the text content.',
      },
    },
  },
};

export const Loading: Story = {
  render: () => ({
    template: `
      <div class="flex gap-4">
        <ng-shadcn-button [disabled]="true">
          <svg class="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </ng-shadcn-button>
        <ng-shadcn-button variant="outline" [disabled]="true">
          <svg class="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Please wait
        </ng-shadcn-button>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Loading states with spinner icons and disabled interaction.',
      },
    },
  },
};

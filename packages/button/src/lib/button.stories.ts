import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent & { claseControl: string }> = {
  title: 'Components/Button',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent],
    }),
    (storyFn, context) => {
      
      return storyFn();
    },
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
      (click)="handleClick()">
      Click me
    </ng-shadcn-button>
  \`
})
export class ExampleComponent {
  handleClick() {
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
  (click)="handleClick()">
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
- **Event Handling**: Simple click event binding with (click) output
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
        type: { summary: 'default | destructive | outline | secondary  | ghost | link' },
        defaultValue: { summary: 'default' },

        
      },
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'The size of the button',
      table: {
        type: { summary: 'default | sm | lg | icon' },
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
      control: false,
      description: 'Additional CSS classes to apply',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },

    type: {
      control: 'radio',
      options: ['button', 'submit', 'reset'],
      description: 'The type of the button',
      table: {
        type: { summary: 'button | submit | reset' },
        defaultValue: { summary: 'button' },
      },
    },
  },
  args: {
    variant: 'default',
    size: 'default',
    disabled: false,
    class: '',
    type: 'button',
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ng-shadcn-button 
        [variant]="variant" 
        [size]="size" 
        [disabled]="disabled" 
        [class]="class"
        (click)="handleClick($event)"
        >
        Button
      </ng-shadcn-button>
    `,
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
        <ng-shadcn-button variant="default">Default</ng-shadcn-button>
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
}
    }
  }
};

export const WithAsChild: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-4 p-4">
        <p class="text-sm text-muted-foreground">
          The button below renders as an anchor tag using <code>asChild</code> prop
        </p>
        
        <ng-shadcn-button variant="outline" [asChild]="true">
          <a href="https://github.com/your-org/ng-shadcn" target="_blank" rel="noopener noreferrer" class="no-underline">
            View on GitHub
          </a>
        </ng-shadcn-button>

        <p class="text-sm text-muted-foreground mt-4">
          The button below renders as a div with a click handler
        </p>
        
        <ng-shadcn-button 
          variant="default" 
          size="sm" 
          [asChild]="true"
          (click)="handleClick()">
          <div class="flex items-center gap-2 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
            <span>Click me!</span>
          </div>
        </ng-shadcn-button>
      </div>
    `,
    methods: {
      onCustomElementClick: () => {
        console.log('Custom element clicked!');
        alert('Custom element was clicked!');
      }
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Using `asChild` to render custom elements as buttons while maintaining button styling and behavior. This is useful when you need to render a link or a custom element as a button.'
      }
    }
  }
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


export const CustomButton: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-4 items-start">
        <div class="flex items-center gap-4">
          <ng-shadcn-button 
            variant="default" 
            size="lg"
            class="bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
            </svg>
            Create New Project
          </ng-shadcn-button>

          <ng-shadcn-button 
            variant="outline" 
            size="sm"
            class="border-dashed border-2 text-muted-foreground hover:bg-accent/50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Add Item
          </ng-shadcn-button>
        </div>

        <div class="flex items-center gap-4">
          <ng-shadcn-button 
            variant="ghost" 
            size="sm"
            class="text-rose-600 hover:bg-rose-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            Delete
          </ng-shadcn-button>

          <ng-shadcn-button 
            variant="outline" 
            size="icon"
            class="rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </ng-shadcn-button>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Custom button examples with icons, gradients, and hover effects.',
      },
    },
  },
};
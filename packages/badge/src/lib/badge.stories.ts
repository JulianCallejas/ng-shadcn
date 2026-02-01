import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { BadgeComponent } from './badge.component';
import { signal } from '@angular/core';
import { ButtonComponent } from '@packages/button/src/public-api';

const meta: Meta<BadgeComponent> = {
  title: 'Components/Badge',
  component: BadgeComponent,
  decorators: [
    moduleMetadata({
      imports: [BadgeComponent, ButtonComponent],
    }),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `A customizable badge component for displaying status, tags, or labels with various styles and interactions.
## Installation

\`\`\`bash
# Using npm
npm install @ng-shadcn/badge
# Using yarn
yarn add @ng-shadcn/badge
# Using pnpm
pnpm add @ng-shadcn/badge
\`\`\`
## Usage
### Standalone Components (Recommended)
Import and use the BadgeComponent directly in your standalone components:

\`\`\`typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from '@ng-shadcn/badge';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [
    CommonModule,
    BadgeComponent
  ],
  template: \`
    <ng-shadcn-badge variant="default">New</ng-shadcn-badge>
  \`
})
export class ExampleComponent { }
\`\`\`

### Using NgModule (Legacy)
If you're using NgModules, import the \`BadgeModule\`:

\`\`\`typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeModule } from '@ng-shadcn/badge';

@NgModule({
  declarations: [YourComponent],
  imports: [
    CommonModule,
    BadgeModule
  ],
  exports: [YourComponent]
})
export class YourModule { }
\`\`\`

Then use the component in your templates:

\`\`\`html
<ng-shadcn-badge variant="success" [dismissible]="true" (dismissed)="onDismiss()">
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1" leadingIcon>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
  Success
</ng-shadcn-badge>
\`\`\`

## Features
- **Multiple Variants**: Choose from different visual styles (default, secondary, destructive, outline, success, warning, info)
- **Sizes**: Available in small, default, and large sizes
- **Dismissible**: Option to close the badge manually
- **Icons**: Support for both leading and trailing icons
- **Accessible**: Follows WAI-ARIA design patterns
- **TypeScript Support**: Fully typed API
- **Responsive**: Works well on all screen sizes
- **Customizable**: Extend with custom classes for unique styling needs
`,
      },
      extractComponentDescription: (component: any) => {
        if (component === BadgeComponent) {
          return 'A flexible badge component that can be used to highlight, label, or tag UI elements with various styles and interactions.';
        }
        return null;
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'success', 'warning', 'info'],
      mapping: {
        default: signal('default'),
        secondary: signal('secondary'),
        destructive: signal('destructive'),
        outline: signal('outline'),
        success: signal('success'),
        warning: signal('warning'),
        info: signal('info'),
      },
      description: 'The visual style variant of the badge',
      table:{
        defaultValue: { summary: 'default' },
        type: {
          summary: 'default | secondary | destructive | outline | success | warning | info',
        },
      },
    },
    size: {
      control: 'radio',
      options: ['sm', 'default', 'lg'],
      mapping: {
        sm: signal('sm'),
        default: signal('default'),
        lg: signal('lg'),
      },
      description: 'The size of the badge',
      table:{
        defaultValue: { summary: 'default' },
        type: {
          summary: 'sm | default | lg',
        },
      },
    },
    dismissible: {
      control: 'radio',
      options: ['remove', 'hide', false],
      mapping: {
        remove: signal('remove'),
        hide: signal('hide'),
        false: signal(false),
      },
      description: 'Whether the badge can be dismissed',
      table:{
        defaultValue: { summary: 'false' },
        type: {
          summary: '"remove" | "hide" | false',
        },
      }
    },
    fade: {
      control: 'boolean',
      mapping: {
        true: signal(true),
        false: signal(false),
      },
      description: 'Whether the badge has a fade effect when dismissed. Useful for indicating that the badge is "deleted" or "removed" visually.',
    },
    class: {
      control: false,
      description: 'Additional CSS classes',
    },
    role: {
      control: 'text',
      description: 'The ARIA role of the badge',
    },
    ariaLabel: {
      control: 'text',
      description: 'The ARIA label of the badge',
    },
    dismissed: {
      table: {
        type: { summary: 'EventEmitter<void>' },
        category: 'Outputs',
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  args: {
    variant: signal('default'),
    size: signal('default'),
    dismissible: signal(''),
    fade: signal(false),
  },
};

export default meta;
type Story = StoryObj<BadgeComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
    <ng-shadcn-badge 
      [variant]="variant()" 
      [size]="size()" 
      [dismissible]="dismissible()" 
      [fade]="fade()" 
      [role]="role" 
      [ariaLabel]="ariaLabel"
    >
      Badge
    </ng-shadcn-badge>`,
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap gap-2">
        <ng-shadcn-badge variant="default">Default</ng-shadcn-badge>
        <ng-shadcn-badge variant="secondary">Secondary</ng-shadcn-badge>
        <ng-shadcn-badge variant="destructive">Destructive</ng-shadcn-badge>
        <ng-shadcn-badge variant="outline">Outline</ng-shadcn-badge>
        <ng-shadcn-badge variant="success">Success</ng-shadcn-badge>
        <ng-shadcn-badge variant="warning">Warning</ng-shadcn-badge>
        <ng-shadcn-badge variant="info">Info</ng-shadcn-badge>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'The badge component supports five variants: default, secondary, destructive, outline, success, warning, and info.',
      },
    },
  },
};

export const Size: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex items-baseline gap-2">
          <ng-shadcn-badge [variant]="variant" [dismissible]="dismissible" size="sm">Small Badge</ng-shadcn-badge>
          <span class="text-sm text-muted-foreground">sm</span>
        </div>
        
        <div class="flex items-baseline gap-2">
          <ng-shadcn-badge [variant]="variant" [dismissible]="dismissible" size="default">Default Badge</ng-shadcn-badge>
          <span class="text-sm text-muted-foreground">default</span>
        </div>
        
        <div class="flex items-baseline gap-2">
          <ng-shadcn-badge [variant]="variant" [dismissible]="dismissible" size="lg">Large Badge</ng-shadcn-badge>
          <span class="text-sm text-muted-foreground">lg</span>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'The badge component supports three sizes: sm, default, and lg.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex flex-wrap items-center gap-2">
          <ng-shadcn-badge variant="default" size="sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full" leadingIcon>
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
            </svg>
            Notifications
          </ng-shadcn-badge>
          
          <ng-shadcn-badge variant="success" >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full" leadingIcon>
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Success
          </ng-shadcn-badge>
          
          <ng-shadcn-badge variant="warning" size="lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full" leadingIcon>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            Warning
          </ng-shadcn-badge>
          
          </div>
          
          <div class="flex flex-wrap items-center gap-2">
          <ng-shadcn-badge variant="info" size="sm">
            Information
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full" trailingIcon>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </ng-shadcn-badge>
          <ng-shadcn-badge variant="default">
            With Trailing Icon
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full" trailingIcon>
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </ng-shadcn-badge>
          
          <ng-shadcn-badge variant="secondary" size="lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full" leadingIcon>
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
            </svg>
            Both Icons
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full" trailingIcon>
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </ng-shadcn-badge>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'To include a leading or trailing icon, wrap the icon in a span tag with the class "w-full h-full". This ensures that the icon fits the space available for the icon.'
      },
    },
  },
};

export const Dismissible: Story = {
  render: (args) => ({
    template: `
    <h3 class="text-center font-semibold">Uncontrolled Dismissible</h3>
    <div class="flex flex-col items-center">
      <ng-shadcn-badge 
        variant="destructive" 
        dismissible="remove"
      >
        Uncontrolled Dismissible Badge
      </ng-shadcn-badge>
    </div>  
    <h3 class="text-center font-semibold mt-6">Controlled Dismissible</h3>
    <div class="flex flex-col gap-2 items-center">
      <ng-shadcn-badge 
        variant="destructive" 
        dismissible="hide"
        (dismissed)="removeBadge(badge.id)"
        *ngFor="let badge of badges"
      >
        Dismissible Badge {{ badge.id }}
      </ng-shadcn-badge>

      <ng-shadcn-button class="w-full"
          (click)="addBadge()"
      >
        Add Dismissible Badge
      </ng-shadcn-button>
    </div>
    `,
    
    props: {
      badges: [
        { id: 1 },
      ],
      nextId: 2,
      addBadge() {
        if (this.badges.length >= 3) return;
        const newBadge = {
          id: this.nextId++,
        };
        
        this.badges = [...this.badges, newBadge];
      },
      removeBadge(id: number) {
        this.badges = this.badges.filter(badge => badge.id !== id);
      }
    },
  }),
  parameters: {
    docs: {
      description: {
        story: 'Example of a dismissible badge. The `dismissible` attribute can be set to "remove" or "hide". "remove" will remove the badge from the DOM when dismissed, while "hide" will hide the badge with css classes. The badge emits a `dismissed` event when the badge is dismissed.',
      },
    },
  },
};

export const FadeDismissible: Story = {
  render: () => ({
    template: `
    <div class="flex flex-col gap-4">
        <div class="flex flex-wrap items-center gap-2">
          <ng-shadcn-badge 
            *ngFor="let badge of badges"
            [variant]="badge.variant" 
            dismissible="hide"
            [fade]="true"
            (dismissed)="removeBadge(badge.id)"
          >
          <span leadingIcon class="w-full h-full overflow-hidden">
          <ng-container [ngSwitch]="badge.icon">
              <svg *ngSwitchCase="'bell'" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full" leadingIcon>
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
              <svg *ngSwitchCase="'check'" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full" leadingIcon>
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <svg *ngSwitchCase="'alert-circle'" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full" leadingIcon>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <svg *ngSwitchDefault xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full" leadingIcon>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </ng-container>
            </span>  
            {{ badge.text }}
          </ng-shadcn-badge>
        </div>
        
        <ng-shadcn-button class="w-56 self-center"
          (click)="addBadge()"
        >
          Add Dismissible Badge
        </ng-shadcn-button>
      </div>
    `,
    props: {
      badges: [
        { id: 1, variant: 'default', text: 'Default', icon: 'bell' },
        { id: 2, variant: 'success', text: 'Success', icon: 'check' },
        { id: 3, variant: 'warning', text: 'Warning', icon: 'alert-circle' },
        { id: 4, variant: 'info', text: 'Info', icon: 'info' },
      ],
      nextId: 5,
      addBadge() {
        const variants = ['default', 'secondary', 'destructive', 'outline', 'success', 'warning', 'info'];
        const icons = ['bell', 'check', 'alert-circle', 'info', 'x'];
        const texts = ['New Alert', 'Task Complete', 'Attention', 'Update', 'Notice'];
        
        const newBadge = {
          id: this.nextId++,
          variant: variants[Math.floor(Math.random() * variants.length)],
          text: texts[Math.floor(Math.random() * texts.length)],
          icon: icons[Math.floor(Math.random() * icons.length)]
        };
        
        this.badges = [...this.badges, newBadge];
      },
      removeBadge(id: number) {
        this.badges = this.badges.filter(badge => badge.id !== id);
      }
    },
  }),
  parameters:{
    docs:{
      description: {
        story: 'The badge component supports a fade behavior which can be used to create a subtle animation effect when the badge is dismissed. The fade behavior can be enabled by setting the `fade` property to `true`.'
      },
      source:{
        type: 'code', 
        code: `
<ng-shadcn-badge 
  [variant]="badge.variant" 
  dismissible
  fade
  (dismissed)="removeBadge(badge.id)"
>
  <svg xmlns="http://www.w3.org/2000/svg" 
    width="14" 
    height="14" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    stroke-width="2" 
    stroke-linecap="round" 
    stroke-linejoin="round" 
    class="w-full h-full" 
    leadingIcon
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
  </svg>
  {{ badge.text }}
</ng-shadcn-badge>
        `,
        language: 'html'
      }
    }
  }
};

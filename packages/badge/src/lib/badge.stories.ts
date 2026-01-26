import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { BadgeComponent } from './badge.component';

const meta: Meta<BadgeComponent> = {
  title: 'Components/Badge',
  component: BadgeComponent,
  decorators: [
    moduleMetadata({
      imports: [BadgeComponent],
    }),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Displays a badge or a component that looks like a badge.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'success', 'warning', 'info'],
      description: 'The visual style variant of the badge',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the badge can be dismissed',
    },
    fade: {
      control: 'boolean',
      description: 'Whether the badge has a fade effect when dismissed. Useful for indicating that the badge is "deleted" or "removed" visually.',
    },
    class: {
      control: 'text',
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
    leadingIcon: {
      table: {
        type: { 
          summary: 'ElementRef',
          detail: 'Use the leadingIcon attribute inside a child tag to add a leading icon.'
        },
      },
    },
    trailingIcon: {
      table: {
        type: { 
          summary: 'ElementRef',
          detail: 'Use the `trailingIcon` attribute inside a child tag to add a trailing icon.'
        },
      },
    }

    
  },
  args: {
    variant: 'default',
    dismissible: false,
  },
};

export default meta;
type Story = StoryObj<BadgeComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<ng-shadcn-badge [variant]="variant" [dismissible]="dismissible">Badge</ng-shadcn-badge>`,
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
};

export const Dismissible: Story = {
  render: (args) => ({
    props: { ...args, dismissible: true },
    template: `<ng-shadcn-badge [variant]="variant" [dismissible]="dismissible">Dismissible Badge</ng-shadcn-badge>`,
  }),
};

export const WithIcons: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex flex-wrap items-center gap-2">
          <ng-shadcn-badge variant="default">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1" leadingIcon>
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
            </svg>
            Notifications
          </ng-shadcn-badge>
          
          <ng-shadcn-badge variant="success">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1" leadingIcon>
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Success
          </ng-shadcn-badge>
          
          <ng-shadcn-badge variant="warning">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1" leadingIcon>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            Warning
          </ng-shadcn-badge>
          
          <ng-shadcn-badge variant="info">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1" leadingIcon>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            Information
          </ng-shadcn-badge>
        </div>
        
        <div class="flex flex-wrap items-center gap-2">
          <ng-shadcn-badge variant="default">
            With Trailing Icon
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1" trailingIcon>
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </ng-shadcn-badge>
          
          <ng-shadcn-badge variant="secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1" leadingIcon>
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
            </svg>
            Both Icons
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1" trailingIcon>
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </ng-shadcn-badge>
        </div>
      </div>
    `,
  }),
};

export const FadeDismissible: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex flex-wrap items-center gap-2">
          <ng-shadcn-badge 
            *ngFor="let badge of badges"
            [variant]="badge.variant" 
            [dismissible]="true" 
            [fade]="true"
          >
          <span leadingIcon>
          <ng-container [ngSwitch]="badge.icon">
              <svg *ngSwitchCase="'bell'" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1" leadingIcon>
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
              <svg *ngSwitchCase="'check'" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1" leadingIcon>
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <svg *ngSwitchCase="'alert-circle'" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1" leadingIcon>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <svg *ngSwitchDefault xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1" leadingIcon>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </ng-container>
            </span>  
            {{ badge.text }}
          </ng-shadcn-badge>
        </div>
        
        <button 
          class="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
          (click)="addBadge()"
        >
          Add Dismissible Badge
        </button>
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
      source:{
        type: 'code', 
        code: `
<ng-shadcn-badge 
  [variant]="badge.variant" 
  dismissible
  fade
>
  <span leadingIcon>
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1" leadingIcon>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
    </svg>
  </span>  
  {{ badge.text }}
</ng-shadcn-badge>
        `,
        language: 'html'
      }
    }
  }
};

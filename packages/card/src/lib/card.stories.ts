import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CardComponent } from './card.component';
import { CardHeaderComponent } from './card-header.component';
import { CardTitleComponent } from './card-title.component';
import { CardDescriptionComponent } from './card-description.component';
import { CardContentComponent } from './card-content.component';
import { CardFooterComponent } from './card-footer.component';
import { ButtonComponent } from '../../../button/src/lib/button.component';


const meta: Meta<CardComponent> = {
  title: 'Components/Card',
  component: CardComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CardComponent,
        CardHeaderComponent,
        CardTitleComponent,
        CardDescriptionComponent,
        CardContentComponent,
        CardFooterComponent,
        ButtonComponent
      ],
    }),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `A flexible card component with header, content, and footer sections. Perfect for displaying grouped information.

## Installation

\`\`\`bash
# Using npm
npm install @ng-shadcn/card
# Using yarn
yarn add @ng-shadcn/card
# Using pnpm
pnpm add @ng-shadcn/card
\`\`\`

## Usage
### Standalone Components (Recommended)
Import and use the individual components directly in your standalone components:

\`\`\`typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  CardComponent, 
  CardHeaderComponent,
  CardTitleComponent,
  CardDescriptionComponent,
  CardContentComponent,
  CardFooterComponent
} from '@ng-shadcn/card';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardDescriptionComponent,
    CardContentComponent,
    CardFooterComponent
  ],
  template: \`
    <ng-shadcn-card>
      <ng-shadcn-card-header>
        <ng-shadcn-card-title>Card Title</ng-shadcn-card-title>
        <ng-shadcn-card-description>
          A description of what this card is about
        </ng-shadcn-card-description>
      </ng-shadcn-card-header>
      <ng-shadcn-card-content>
        <p>This is the main content of the card.</p>
      </ng-shadcn-card-content>
      <ng-shadcn-card-footer>
        <button>Action</button>
      </ng-shadcn-card-footer>
    </ng-shadcn-card>
  \`
})
export class ExampleComponent { }
\`\`\`

### Using NgModule (Legacy)
If you're using NgModules, import the \`CardModule\`:

\`\`\`typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from '@ng-shadcn/card';

@NgModule({
  declarations: [YourComponent],
  imports: [
    CommonModule,
    CardModule
  ],
  exports: [YourComponent]
})
export class YourModule { }
\`\`\`

## Features
- **Flexible Layout**: Easily compose cards with header, content, and footer sections
- **Fully Typed**: Built with TypeScript for better developer experience
- **Customizable**: Style individual components using Tailwind CSS classes
- **Accessible**: Follows WAI-ARIA design patterns
- **Responsive**: Works on all screen sizes
`,
      },
      extractComponentDescription: (component: any) => {
        if (component === CardComponent) {
          return 'The root component that provides the card container with consistent styling and spacing.';
        }
        if (component === CardHeaderComponent) {
          return 'Container for the card title and description, with proper spacing and typography.';
        }
        if (component === CardTitleComponent) {
          return 'The title of the card, typically displayed in a larger font size.';
        }
        if (component === CardDescriptionComponent) {
          return 'A short description or subtitle for the card.';
        }
        if (component === CardContentComponent) {
          return 'The main content area of the card.';
        }
        if (component === CardFooterComponent) {
          return 'A container for action buttons or additional information at the bottom of the card.';
        }
        return null;
      },
    },
  },
  tags: ['autodocs'],
  subcomponents: {
    CardHeaderComponent,
    CardTitleComponent,
    CardDescriptionComponent,
    CardContentComponent,
    CardFooterComponent,
  },
  argTypes: {
    class: {
      control: 'text',
      description: 'Additional CSS classes to apply to the card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
  },
  args: {
    class: '',
  },
};

export default meta;
type Story = StoryObj<CardComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ng-shadcn-card [class]="class">
        <ng-shadcn-card-header>
          <ng-shadcn-card-title>Card Title</ng-shadcn-card-title>
          <ng-shadcn-card-description>
            Card description goes here. This provides additional context about the card content.
          </ng-shadcn-card-description>
        </ng-shadcn-card-header>
        <ng-shadcn-card-content>
          <p>This is the main content area of the card. You can put any content here.</p>
        </ng-shadcn-card-content>
        <ng-shadcn-card-footer>
          <ng-shadcn-button>Action</ng-shadcn-button>
        </ng-shadcn-card-footer>
      </ng-shadcn-card>
    `,
  }),
};

export const Simple: Story = {
  render: () => ({
    template: `
      <ng-shadcn-card>
        <ng-shadcn-card-content class="py-2">
          <p>A simple card with just content. No header or footer needed.</p>
        </ng-shadcn-card-content>
      </ng-shadcn-card>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'A minimal card with only content, no header or footer.',
      },
    },
  },
};

export const WithImage: Story = {
  render: () => ({
    template: `
      <ng-shadcn-card class="w-[350px]">
        <div class="aspect-video bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg"></div>
        <ng-shadcn-card-header>
          <ng-shadcn-card-title>Beautiful Gradient</ng-shadcn-card-title>
          <ng-shadcn-card-description>
            A card with a beautiful gradient background image.
          </ng-shadcn-card-description>
        </ng-shadcn-card-header>
        <ng-shadcn-card-content>
          <p>This card demonstrates how to include images or visual elements at the top.</p>
        </ng-shadcn-card-content>
        <ng-shadcn-card-footer>
          <ng-shadcn-button variant="outline" class="w-full">View Details</ng-shadcn-button>
        </ng-shadcn-card-footer>
      </ng-shadcn-card>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Card with an image or visual element at the top.',
      },
    },
  },
};

export const ProductCard: Story = {
  render: () => ({
    template: `
      <ng-shadcn-card class="w-[300px]">
        <div class="aspect-square bg-gray-100 rounded-t-lg flex items-center justify-center overflow-hidden">
          <a href="https://playtwq.com" target="_blank" rel="noopener noreferrer">
            <img src="https://postaly.cl/img/twq-ads-banner-dark.webp" alt="Product" class="w-full h-full object-cover" />
          </a>
        </div>
        <ng-shadcn-card-header>
          <ng-shadcn-card-title>Product Name</ng-shadcn-card-title>
          <ng-shadcn-card-description>
            High-quality product with amazing features.
          </ng-shadcn-card-description>
        </ng-shadcn-card-header>
        <ng-shadcn-card-content>
          <div class="flex items-center justify-between">
            <span class="text-2xl font-bold">$99.99</span>
            <div class="flex items-center">
              <span class="text-yellow-400">★★★★★</span>
              <span class="ml-1 text-sm text-gray-600">(4.8)</span>
            </div>
          </div>
        </ng-shadcn-card-content>
        <ng-shadcn-card-footer>
          <ng-shadcn-button class="w-full">Add to Cart</ng-shadcn-button>
        </ng-shadcn-card-footer>
      </ng-shadcn-card>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Example of a product card with image, title, description, price, and rating.',
      },
    },
  },
};

export const UserProfile: Story = {
  render: () => ({
    template: `
      <ng-shadcn-card class="w-[350px]">
        <ng-shadcn-card-header class="text-center">
          <div class="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">
            JD
          </div>
          <ng-shadcn-card-title>John Doe</ng-shadcn-card-title>
          <ng-shadcn-card-description>
            Software Engineer at TechCorp
          </ng-shadcn-card-description>
        </ng-shadcn-card-header>
        <ng-shadcn-card-content>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-600">Location:</span>
              <span>San Francisco, CA</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Joined:</span>
              <span>January 2020</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Projects:</span>
              <span>42</span>
            </div>
          </div>
        </ng-shadcn-card-content>
        <ng-shadcn-card-footer class="gap-2">
          <ng-shadcn-button variant="outline" class="flex-1">Message</ng-shadcn-button>
          <ng-shadcn-button class="flex-1">Follow</ng-shadcn-button>
        </ng-shadcn-card-footer>
      </ng-shadcn-card>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'User profile card with avatar, information, and action buttons.',
      },
    },
  },
};

export const StatsCard: Story = {
  render: () => ({
    template: `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
        <ng-shadcn-card>
          <ng-shadcn-card-header class="flex flex-row items-center justify-between space-y-0 pb-2">
            <ng-shadcn-card-title class="text-sm font-medium">Total Revenue</ng-shadcn-card-title>
            <svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v20m9-9H3"/>
            </svg>
          </ng-shadcn-card-header>
          <ng-shadcn-card-content>
            <div class="text-2xl font-bold">$45,231.89</div>
            <p class="text-xs text-muted-foreground">+20.1% from last month</p>
          </ng-shadcn-card-content>
        </ng-shadcn-card>
        
        <ng-shadcn-card>
          <ng-shadcn-card-header class="flex flex-row items-center justify-between space-y-0 pb-2">
            <ng-shadcn-card-title class="text-sm font-medium">Subscriptions</ng-shadcn-card-title>
            <svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </ng-shadcn-card-header>
          <ng-shadcn-card-content>
            <div class="text-2xl font-bold">+2350</div>
            <p class="text-xs text-muted-foreground">+180.1% from last month</p>
          </ng-shadcn-card-content>
        </ng-shadcn-card>
        
        <ng-shadcn-card>
          <ng-shadcn-card-header class="flex flex-row items-center justify-between space-y-0 pb-2">
            <ng-shadcn-card-title class="text-sm font-medium">Sales</ng-shadcn-card-title>
            <svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"/>
            </svg>
          </ng-shadcn-card-header>
          <ng-shadcn-card-content>
            <div class="text-2xl font-bold">+12,234</div>
            <p class="text-xs text-muted-foreground">+19% from last month</p>
          </ng-shadcn-card-content>
        </ng-shadcn-card>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Dashboard-style statistics cards with icons and metrics.',
      },
    },
  },
};

export const NotificationCard: Story = {
  render: () => ({
    template: `
      <ng-shadcn-card class="w-[380px]">
        <ng-shadcn-card-header>
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5-5-5h5v-12"/>
              </svg>
            </div>
            <div class="flex-1">
              <ng-shadcn-card-title class="text-base">New Update Available</ng-shadcn-card-title>
              <ng-shadcn-card-description>2 minutes ago</ng-shadcn-card-description>
            </div>
            <button class="text-gray-400 hover:text-gray-600">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </ng-shadcn-card-header>
        <ng-shadcn-card-content>
          <p>Version 2.1.0 is now available with new features and bug fixes. Update now to get the latest improvements.</p>
        </ng-shadcn-card-content>
        <ng-shadcn-card-footer class="gap-2">
          <ng-shadcn-button variant="outline" class="flex-1">Later</ng-shadcn-button>
          <ng-shadcn-button class="flex-1">Update Now</ng-shadcn-button>
        </ng-shadcn-card-footer>
      </ng-shadcn-card>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Notification-style card with icon, timestamp, and action buttons.',
      },
    },
  },
};

import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { 
  CardComponent, 
  CardHeaderComponent, 
  CardTitleComponent, 
  CardDescriptionComponent, 
  CardContentComponent, 
  CardFooterComponent 
} from './card.component';
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
        component: 'A flexible card component with header, content, and footer sections. Perfect for displaying grouped information.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the card',
    },
  },
  args: {
    className: '',
  },
};

export default meta;
type Story = StoryObj<CardComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ng-shadcn-card [className]="className" class="w-[350px]">
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
      <ng-shadcn-card class="w-[350px]">
        <ng-shadcn-card-content class="pt-6">
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
        <div class="aspect-square bg-gray-100 rounded-t-lg flex items-center justify-center">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
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

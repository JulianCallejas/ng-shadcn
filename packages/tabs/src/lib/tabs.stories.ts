import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { TabsComponent, TabListComponent, TabTriggerComponent, TabContentComponent } from './tabs.component';

const meta: Meta<TabsComponent> = {
  title: 'Components/Tabs',
  component: TabsComponent,
  decorators: [
    moduleMetadata({
      imports: [
        TabsComponent,
        TabListComponent,
        TabTriggerComponent,
        TabContentComponent
      ],
    }),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A set of layered sections of content—known as tab panels—that are displayed one at a time. Built with Angular signals for modern, reactive UI development.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'The default active tab value',
    },
    value: {
      control: 'text',
      description: 'The controlled active tab value',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the tabs',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    valueChange: {
      action: 'valueChange',
      description: 'Event emitted when the active tab changes',
    },
  },
  args: {
    defaultValue: 'account',
    orientation: 'horizontal',
    className: '',
  },
};

export default meta;
type Story = StoryObj<TabsComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ng-shadcn-tabs [defaultValue]="defaultValue" [value]="value" [orientation]="orientation" [className]="className" (valueChange)="valueChange($event)" class="w-[400px]">
        <ng-shadcn-tab-list>
          <ng-shadcn-tab-trigger value="account">Account</ng-shadcn-tab-trigger>
          <ng-shadcn-tab-trigger value="password">Password</ng-shadcn-tab-trigger>
        </ng-shadcn-tab-list>
        <ng-shadcn-tab-content value="account" class="mt-6">
          <div class="space-y-4">
            <h3 class="text-lg font-medium">Account Settings</h3>
            <p class="text-sm text-muted-foreground">
              Make changes to your account here. Click save when you're done.
            </p>
            <div class="space-y-2">
              <label class="text-sm font-medium">Name</label>
              <input class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Your name" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">Email</label>
              <input class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Your email" />
            </div>
          </div>
        </ng-shadcn-tab-content>
        <ng-shadcn-tab-content value="password" class="mt-6">
          <div class="space-y-4">
            <h3 class="text-lg font-medium">Password Settings</h3>
            <p class="text-sm text-muted-foreground">
              Change your password here. After saving, you'll be logged out.
            </p>
            <div class="space-y-2">
              <label class="text-sm font-medium">Current password</label>
              <input type="password" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">New password</label>
              <input type="password" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>
          </div>
        </ng-shadcn-tab-content>
      </ng-shadcn-tabs>
    `,
  }),
};

export const Vertical: Story = {
  render: () => ({
    template: `
      <ng-shadcn-tabs defaultValue="general" orientation="vertical" class="w-[600px]">
        <ng-shadcn-tab-list>
          <ng-shadcn-tab-trigger value="general">General</ng-shadcn-tab-trigger>
          <ng-shadcn-tab-trigger value="security">Security</ng-shadcn-tab-trigger>
          <ng-shadcn-tab-trigger value="integrations">Integrations</ng-shadcn-tab-trigger>
          <ng-shadcn-tab-trigger value="support">Support</ng-shadcn-tab-trigger>
        </ng-shadcn-tab-list>
        <ng-shadcn-tab-content value="general" class="ml-6">
          <div class="space-y-4">
            <h3 class="text-lg font-medium">General Settings</h3>
            <p class="text-sm text-muted-foreground">
              Make changes to your general account settings here.
            </p>
            <div class="grid gap-4">
              <div class="space-y-2">
                <label class="text-sm font-medium">Display Name</label>
                <input class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Your display name" />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium">Bio</label>
                <textarea class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Tell us about yourself"></textarea>
              </div>
            </div>
          </div>
        </ng-shadcn-tab-content>
        <ng-shadcn-tab-content value="security" class="ml-6">
          <div class="space-y-4">
            <h3 class="text-lg font-medium">Security Settings</h3>
            <p class="text-sm text-muted-foreground">
              Manage your account security and authentication preferences.
            </p>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Two-factor authentication</p>
                  <p class="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <button class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                  Enable
                </button>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Login notifications</p>
                  <p class="text-sm text-muted-foreground">Get notified of new logins</p>
                </div>
                <button class="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                  Configure
                </button>
              </div>
            </div>
          </div>
        </ng-shadcn-tab-content>
        <ng-shadcn-tab-content value="integrations" class="ml-6">
          <div class="space-y-4">
            <h3 class="text-lg font-medium">Integrations</h3>
            <p class="text-sm text-muted-foreground">
              Connect and manage your third-party integrations.
            </p>
            <div class="grid gap-4">
              <div class="flex items-center justify-between p-4 border rounded-lg">
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                    G
                  </div>
                  <div>
                    <p class="font-medium">Google</p>
                    <p class="text-sm text-muted-foreground">Connect your Google account</p>
                  </div>
                </div>
                <button class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3">
                  Connect
                </button>
              </div>
              <div class="flex items-center justify-between p-4 border rounded-lg">
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white font-bold">
                    GH
                  </div>
                  <div>
                    <p class="font-medium">GitHub</p>
                    <p class="text-sm text-muted-foreground">Connected</p>
                  </div>
                </div>
                <button class="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        </ng-shadcn-tab-content>
        <ng-shadcn-tab-content value="support" class="ml-6">
          <div class="space-y-4">
            <h3 class="text-lg font-medium">Support</h3>
            <p class="text-sm text-muted-foreground">
              Get help and support for your account.
            </p>
            <div class="space-y-4">
              <div class="p-4 border rounded-lg">
                <h4 class="font-medium mb-2">Contact Support</h4>
                <p class="text-sm text-muted-foreground mb-4">
                  Need help? Our support team is here to assist you.
                </p>
                <button class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                  Contact Us
                </button>
              </div>
              <div class="p-4 border rounded-lg">
                <h4 class="font-medium mb-2">Documentation</h4>
                <p class="text-sm text-muted-foreground mb-4">
                  Learn how to use our platform with our comprehensive guides.
                </p>
                <button class="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                  View Docs
                </button>
              </div>
            </div>
          </div>
        </ng-shadcn-tab-content>
      </ng-shadcn-tabs>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Tabs arranged vertically with a side navigation layout.',
      },
    },
  },
};

export const WithDisabledTab: Story = {
  render: () => ({
    template: `
      <ng-shadcn-tabs defaultValue="available" class="w-[400px]">
        <ng-shadcn-tab-list>
          <ng-shadcn-tab-trigger value="available">Available</ng-shadcn-tab-trigger>
          <ng-shadcn-tab-trigger value="disabled" [disabled]="true">Disabled</ng-shadcn-tab-trigger>
          <ng-shadcn-tab-trigger value="premium">Premium</ng-shadcn-tab-trigger>
        </ng-shadcn-tab-list>
        <ng-shadcn-tab-content value="available" class="mt-6">
          <div class="space-y-4">
            <h3 class="text-lg font-medium">Available Content</h3>
            <p class="text-sm text-muted-foreground">
              This content is available to all users.
            </p>
            <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p class="text-sm text-green-800">
                ✅ You have access to this content
              </p>
            </div>
          </div>
        </ng-shadcn-tab-content>
        <ng-shadcn-tab-content value="disabled" class="mt-6">
          <div class="space-y-4">
            <h3 class="text-lg font-medium">Disabled Content</h3>
            <p class="text-sm text-muted-foreground">
              This content is currently disabled.
            </p>
          </div>
        </ng-shadcn-tab-content>
        <ng-shadcn-tab-content value="premium" class="mt-6">
          <div class="space-y-4">
            <h3 class="text-lg font-medium">Premium Content</h3>
            <p class="text-sm text-muted-foreground">
              This content is available to premium users.
            </p>
            <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p class="text-sm text-yellow-800">
                ⭐ Upgrade to premium to access this content
              </p>
            </div>
          </div>
        </ng-shadcn-tab-content>
      </ng-shadcn-tabs>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Example showing a disabled tab that cannot be selected.',
      },
    },
  },
};

export const Dashboard: Story = {
  render: () => ({
    template: `
      <ng-shadcn-tabs defaultValue="overview" class="w-full max-w-4xl">
        <ng-shadcn-tab-list class="grid w-full grid-cols-4">
          <ng-shadcn-tab-trigger value="overview">Overview</ng-shadcn-tab-trigger>
          <ng-shadcn-tab-trigger value="analytics">Analytics</ng-shadcn-tab-trigger>
          <ng-shadcn-tab-trigger value="reports">Reports</ng-shadcn-tab-trigger>
          <ng-shadcn-tab-trigger value="notifications">Notifications</ng-shadcn-tab-trigger>
        </ng-shadcn-tab-list>
        
        <ng-shadcn-tab-content value="overview" class="mt-6">
          <div class="space-y-6">
            <div>
              <h3 class="text-2xl font-bold">Dashboard Overview</h3>
              <p class="text-muted-foreground">Welcome back! Here's what's happening with your account.</p>
            </div>
            
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <div class="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h4 class="text-sm font-medium">Total Revenue</h4>
                  <svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v20m9-9H3"/>
                  </svg>
                </div>
                <div class="text-2xl font-bold">$45,231.89</div>
                <p class="text-xs text-muted-foreground">+20.1% from last month</p>
              </div>
              
              <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <div class="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h4 class="text-sm font-medium">Subscriptions</h4>
                  <svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <div class="text-2xl font-bold">+2350</div>
                <p class="text-xs text-muted-foreground">+180.1% from last month</p>
              </div>
              
              <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <div class="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h4 class="text-sm font-medium">Sales</h4>
                  <svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"/>
                  </svg>
                </div>
                <div class="text-2xl font-bold">+12,234</div>
                <p class="text-xs text-muted-foreground">+19% from last month</p>
              </div>
              
              <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <div class="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h4 class="text-sm font-medium">Active Now</h4>
                  <svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                  </svg>
                </div>
                <div class="text-2xl font-bold">+573</div>
                <p class="text-xs text-muted-foreground">+201 since last hour</p>
              </div>
            </div>
          </div>
        </ng-shadcn-tab-content>
        
        <ng-shadcn-tab-content value="analytics" class="mt-6">
          <div class="space-y-6">
            <div>
              <h3 class="text-2xl font-bold">Analytics</h3>
              <p class="text-muted-foreground">Detailed analytics and insights for your account.</p>
            </div>
            <div class="h-[400px] rounded-lg border bg-muted/50 flex items-center justify-center">
              <p class="text-muted-foreground">Analytics charts would go here</p>
            </div>
          </div>
        </ng-shadcn-tab-content>
        
        <ng-shadcn-tab-content value="reports" class="mt-6">
          <div class="space-y-6">
            <div>
              <h3 class="text-2xl font-bold">Reports</h3>
              <p class="text-muted-foreground">Generate and download detailed reports.</p>
            </div>
            <div class="grid gap-4 md:grid-cols-2">
              <div class="rounded-lg border bg-card p-6">
                <h4 class="font-semibold mb-2">Monthly Report</h4>
                <p class="text-sm text-muted-foreground mb-4">Comprehensive monthly performance report</p>
                <button class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                  Generate Report
                </button>
              </div>
              <div class="rounded-lg border bg-card p-6">
                <h4 class="font-semibold mb-2">Custom Report</h4>
                <p class="text-sm text-muted-foreground mb-4">Create a custom report with specific metrics</p>
                <button class="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                  Customize
                </button>
              </div>
            </div>
          </div>
        </ng-shadcn-tab-content>
        
        <ng-shadcn-tab-content value="notifications" class="mt-6">
          <div class="space-y-6">
            <div>
              <h3 class="text-2xl font-bold">Notifications</h3>
              <p class="text-muted-foreground">Manage your notification preferences.</p>
            </div>
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p class="font-medium">Email notifications</p>
                  <p class="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" class="sr-only peer" checked>
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div class="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p class="font-medium">Push notifications</p>
                  <p class="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </ng-shadcn-tab-content>
      </ng-shadcn-tabs>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'A complete dashboard example with multiple tabs and rich content.',
      },
    },
  },
};

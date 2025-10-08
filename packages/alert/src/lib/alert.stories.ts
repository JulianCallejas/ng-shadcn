import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AlertComponent } from './alert.component';

const meta: Meta<AlertComponent> = {
  title: 'Components/Alert',
  component: AlertComponent,
  decorators: [
    moduleMetadata({
      imports: [AlertComponent],
    }),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Displays a callout for user attention.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'success', 'warning', 'info'],
      description: 'The visual style variant of the alert',
    },
    title: {
      control: 'text',
      description: 'The title of the alert',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed',
    },
  },
  args: {
    variant: 'default',
    title: 'Alert Title',
    dismissible: false,
  },
};

export default meta;
type Story = StoryObj<AlertComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ng-shadcn-alert [variant]="variant" [title]="title" [dismissible]="dismissible">
        This is a default alert with some information.
      </ng-shadcn-alert>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div class="space-y-4 w-96">
        <ng-shadcn-alert variant="default" title="Default Alert">
          This is a default alert with some information.
        </ng-shadcn-alert>
        <ng-shadcn-alert variant="success" title="Success!">
          Your operation completed successfully.
        </ng-shadcn-alert>
        <ng-shadcn-alert variant="warning" title="Warning">
          Please review your settings before proceeding.
        </ng-shadcn-alert>
        <ng-shadcn-alert variant="destructive" title="Error">
          Something went wrong. Please try again.
        </ng-shadcn-alert>
        <ng-shadcn-alert variant="info" title="Information">
          Here's some helpful information for you.
        </ng-shadcn-alert>
      </div>
    `,
  }),
};

export const Dismissible: Story = {
  render: (args) => ({
    props: { ...args, dismissible: true },
    template: `
      <ng-shadcn-alert [variant]="variant" [title]="title" [dismissible]="dismissible">
        This alert can be dismissed by clicking the X button.
      </ng-shadcn-alert>
    `,
  }),
};

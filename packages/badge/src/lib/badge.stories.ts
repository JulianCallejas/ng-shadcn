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

export const Dismissible: Story = {
  render: (args) => ({
    props: { ...args, dismissible: true },
    template: `<ng-shadcn-badge [variant]="variant" [dismissible]="dismissible">Dismissible Badge</ng-shadcn-badge>`,
  }),
};

import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { SwitchComponent } from './switch.component';

const meta: Meta<SwitchComponent> = {
  title: 'Components/Switch',
  component: SwitchComponent,
  decorators: [
    moduleMetadata({
      imports: [SwitchComponent],
    }),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A control that allows the user to toggle between checked and not checked.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Remove signal-based properties from argTypes to avoid conflicts
  },
  args: {
    // Remove signal-based properties from args to avoid conflicts
  },
};

export default meta;
type Story = StoryObj<SwitchComponent>;

export const Default: Story = {
  render: () => ({
    template: `<ng-shadcn-switch [checked]="false" [disabled]="false" id="switch-default"></ng-shadcn-switch>`,
  }),
};

export const Checked: Story = {
  render: () => ({
    template: `<ng-shadcn-switch [checked]="true" [disabled]="false" id="switch-checked"></ng-shadcn-switch>`,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `<ng-shadcn-switch [checked]="false" [disabled]="true" id="switch-disabled"></ng-shadcn-switch>`,
  }),
};

export const WithLabel: Story = {
  render: () => ({
    template: `
      <div class="flex items-center space-x-2">
        <ng-shadcn-switch [checked]="false" [disabled]="false" id="switch-label"></ng-shadcn-switch>
        <label for="switch-label" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Enable notifications
        </label>
      </div>
    `,
  }),
};

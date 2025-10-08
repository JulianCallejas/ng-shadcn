import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';

const meta: Meta<CheckboxComponent> = {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  decorators: [
    moduleMetadata({
      imports: [CheckboxComponent],
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
type Story = StoryObj<CheckboxComponent>;

export const Default: Story = {
  render: () => ({
    template: `<ng-shadcn-checkbox [checked]="false" [disabled]="false" [indeterminate]="false" id="checkbox-default"></ng-shadcn-checkbox>`,
  }),
};

export const WithLabel: Story = {
  render: () => ({
    template: `
      <ng-shadcn-checkbox [checked]="false" [disabled]="false" [indeterminate]="false" id="checkbox-label">
        <span slot="label">Accept terms and conditions</span>
        <span slot="description">You agree to our Terms of Service and Privacy Policy.</span>
      </ng-shadcn-checkbox>
    `,
  }),
};

export const Checked: Story = {
  render: () => ({
    template: `
      <ng-shadcn-checkbox [checked]="true" [disabled]="false" [indeterminate]="false" id="checkbox-checked">
        <span slot="label">Checked checkbox</span>
      </ng-shadcn-checkbox>
    `,
  }),
};

export const Indeterminate: Story = {
  render: () => ({
    template: `
      <ng-shadcn-checkbox [checked]="false" [disabled]="false" [indeterminate]="true" id="checkbox-indeterminate">
        <span slot="label">Select all items</span>
      </ng-shadcn-checkbox>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <ng-shadcn-checkbox [checked]="false" [disabled]="true" [indeterminate]="false" id="checkbox-disabled">
        <span slot="label">Disabled checkbox</span>
      </ng-shadcn-checkbox>
    `,
  }),
};

import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { TextareaComponent } from './textarea.component';

const meta: Meta<TextareaComponent> = {
  title: 'Components/Textarea',
  component: TextareaComponent,
  decorators: [
    moduleMetadata({
      imports: [TextareaComponent],
    }),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Displays a form textarea or a component that looks like a textarea.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'The placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
    },
    autoResize: {
      control: 'boolean',
      description: 'Whether the textarea should auto-resize',
    },
    minRows: {
      control: 'number',
      description: 'Minimum number of rows',
    },
    maxRows: {
      control: 'number',
      description: 'Maximum number of rows',
    },
    maxLength: {
      control: 'number',
      description: 'Maximum character length',
    },
    showCharacterCount: {
      control: 'boolean',
      description: 'Whether to show character count',
    },
  },
  args: {
    placeholder: 'Enter your message...',
    disabled: false,
    autoResize: false,
    minRows: 3,
    maxRows: 8,
    maxLength: undefined,
    showCharacterCount: false,
  },
};

export default meta;
type Story = StoryObj<TextareaComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ng-shadcn-textarea 
        [placeholder]="placeholder" 
        [disabled]="disabled"
        [autoResize]="autoResize"
        [minRows]="minRows"
        [maxRows]="maxRows"
        [maxLength]="maxLength"
        [showCharacterCount]="showCharacterCount">
      </ng-shadcn-textarea>
    `,
  }),
};

export const AutoResize: Story = {
  render: (args) => ({
    props: { ...args, autoResize: true },
    template: `
      <ng-shadcn-textarea 
        [placeholder]="placeholder" 
        [disabled]="disabled"
        [autoResize]="autoResize"
        [minRows]="minRows"
        [maxRows]="maxRows"
        [maxLength]="maxLength"
        [showCharacterCount]="showCharacterCount">
      </ng-shadcn-textarea>
    `,
  }),
};

export const WithCharacterCount: Story = {
  render: (args) => ({
    props: { ...args, maxLength: 100, showCharacterCount: true },
    template: `
      <ng-shadcn-textarea 
        [placeholder]="placeholder" 
        [disabled]="disabled"
        [autoResize]="autoResize"
        [minRows]="minRows"
        [maxRows]="maxRows"
        [maxLength]="maxLength"
        [showCharacterCount]="showCharacterCount">
      </ng-shadcn-textarea>
    `,
  }),
};

export const Disabled: Story = {
  render: (args) => ({
    props: { ...args, disabled: true },
    template: `
      <ng-shadcn-textarea 
        [placeholder]="placeholder" 
        [disabled]="disabled"
        [autoResize]="autoResize"
        [minRows]="minRows"
        [maxRows]="maxRows"
        [maxLength]="maxLength"
        [showCharacterCount]="showCharacterCount">
      </ng-shadcn-textarea>
    `,
  }),
};

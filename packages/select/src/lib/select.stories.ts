import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { SelectComponent } from './select.component';

const meta: Meta<SelectComponent> = {
  title: 'Components/Select',
  component: SelectComponent,
  decorators: [
    moduleMetadata({
      imports: [SelectComponent],
    }),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Displays a list of options for the user to pick from—triggered by a button.',
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
      description: 'Whether the select is disabled',
    },
    searchable: {
      control: 'boolean',
      description: 'Whether the select is searchable',
    },
  },
  args: {
    placeholder: 'Select an option...',
    disabled: false,
    searchable: false,
  },
};

export default meta;
type Story = StoryObj<SelectComponent>;

const sampleOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'nextjs', label: 'Next.js' }
];

export const Default: Story = {
  render: (args) => ({
    props: { ...args, options: sampleOptions },
    template: `
      <ng-shadcn-select 
        [options]="options" 
        [placeholder]="placeholder" 
        [disabled]="disabled" 
        [searchable]="searchable">
      </ng-shadcn-select>
    `,
  }),
};

export const Searchable: Story = {
  render: (args) => ({
    props: { ...args, options: sampleOptions, searchable: true },
    template: `
      <ng-shadcn-select 
        [options]="options" 
        [placeholder]="placeholder" 
        [disabled]="disabled" 
        [searchable]="searchable">
      </ng-shadcn-select>
    `,
  }),
};

export const Disabled: Story = {
  render: (args) => ({
    props: { ...args, options: sampleOptions, disabled: true },
    template: `
      <ng-shadcn-select 
        [options]="options" 
        [placeholder]="placeholder" 
        [disabled]="disabled" 
        [searchable]="searchable">
      </ng-shadcn-select>
    `,
  }),
};

import type { Meta, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input.component';

const meta: Meta<InputComponent> = {
  title: 'Components/Input',
  component: InputComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input component with label support and form integration. Implements ControlValueAccessor for seamless form integration.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'The input type',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    label: {
      control: 'text',
      description: 'Label text displayed above the input',
    },
    error: {
      control: 'text',
      description: 'Error message displayed below the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    valueChange: {
      action: 'valueChange',
      description: 'Event emitted when input value changes',
    },
    focused: {
      action: 'focused',
      description: 'Event emitted when input receives focus',
    },
    blurred: {
      action: 'blurred',
      description: 'Event emitted when input loses focus',
    },
  },
  args: {
    type: 'text',
    placeholder: '',
    label: '',
    error: '',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<InputComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ng-shadcn-input 
        [type]="type"
        [placeholder]="placeholder"
        [label]="label"
        [error]="error"
        [disabled]="disabled"
        (valueChange)="valueChange($event)"
        (focused)="focused()"
        (blurred)="blurred()">
      </ng-shadcn-input>
    `,
  }),
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ng-shadcn-input 
        [type]="type"
        [placeholder]="placeholder"
        [label]="label"
        [error]="error"
        [disabled]="disabled">
      </ng-shadcn-input>
    `,
  }),
  args: {
    label: 'Email address',
    type: 'email',
    placeholder: 'Enter your email...',
  },
};

export const WithError: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ng-shadcn-input 
        [type]="type"
        [placeholder]="placeholder"
        [label]="label"
        [error]="error"
        [disabled]="disabled">
      </ng-shadcn-input>
    `,
  }),
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password...',
    error: 'Password must be at least 8 characters long',
  },
};

export const InputTypes: Story = {
  render: () => ({
    template: `
      <div class="space-y-4 w-80">
        <ng-shadcn-input 
          type="text" 
          label="Text Input" 
          placeholder="Enter text...">
        </ng-shadcn-input>
        
        <ng-shadcn-input 
          type="email" 
          label="Email Input" 
          placeholder="Enter email...">
        </ng-shadcn-input>
        
        <ng-shadcn-input 
          type="password" 
          label="Password Input" 
          placeholder="Enter password...">
        </ng-shadcn-input>
        
        <ng-shadcn-input 
          type="number" 
          label="Number Input" 
          placeholder="Enter number...">
        </ng-shadcn-input>
        
        <ng-shadcn-input 
          type="tel" 
          label="Phone Input" 
          placeholder="Enter phone number...">
        </ng-shadcn-input>
        
        <ng-shadcn-input 
          type="url" 
          label="URL Input" 
          placeholder="Enter URL...">
        </ng-shadcn-input>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Different input types with appropriate labels and placeholders.',
      },
    },
  },
};

export const States: Story = {
  render: () => ({
    template: `
      <div class="space-y-4 w-80">
        <ng-shadcn-input 
          label="Normal State" 
          placeholder="Normal input...">
        </ng-shadcn-input>
        
        <ng-shadcn-input 
          label="Disabled State" 
          placeholder="Disabled input..."
          [disabled]="true">
        </ng-shadcn-input>
        
        <ng-shadcn-input 
          label="With Error" 
          placeholder="Input with error..."
          error="This field is required">
        </ng-shadcn-input>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Different input states including normal, disabled, and error states.',
      },
    },
  },
};

export const ReactiveForm: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ReactiveFormsModule],
    },
    template: `
      <div class="space-y-4 w-80">
        <ng-shadcn-input 
          label="First Name"
          placeholder="Enter first name..."
          [formControl]="firstNameControl">
        </ng-shadcn-input>
        
        <ng-shadcn-input 
          label="Last Name"
          placeholder="Enter last name..."
          [formControl]="lastNameControl">
        </ng-shadcn-input>
        
        <ng-shadcn-input 
          label="Email"
          type="email"
          placeholder="Enter email..."
          [formControl]="emailControl"
          [error]="emailControl.invalid && emailControl.touched ? 'Please enter a valid email' : ''">
        </ng-shadcn-input>
        
        <div class="mt-4 p-4 bg-gray-100 rounded">
          <h4 class="font-medium mb-2">Form Values:</h4>
          <pre class="text-sm">{{ getFormValues() | json }}</pre>
        </div>
      </div>
    `,
    props: {
      firstNameControl: new FormControl(''),
      lastNameControl: new FormControl(''),
      emailControl: new FormControl(''),
      getFormValues() {
        return {
          firstName: this.firstNameControl.value,
          lastName: this.lastNameControl.value,
          email: this.emailControl.value,
        };
      },
    },
  }),
  parameters: {
    docs: {
      description: {
        story: 'Integration with Angular Reactive Forms using FormControl.',
      },
    },
  },
};

export const Validation: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ReactiveFormsModule],
    },
    template: `
      <div class="space-y-4 w-80">
        <ng-shadcn-input 
          label="Required Field"
          placeholder="This field is required..."
          [formControl]="requiredControl"
          [error]="requiredControl.invalid && requiredControl.touched ? 'This field is required' : ''">
        </ng-shadcn-input>
        
        <ng-shadcn-input 
          label="Email Validation"
          type="email"
          placeholder="Enter valid email..."
          [formControl]="emailValidationControl"
          [error]="getEmailError()">
        </ng-shadcn-input>
        
        <ng-shadcn-input 
          label="Min Length (5 chars)"
          placeholder="Minimum 5 characters..."
          [formControl]="minLengthControl"
          [error]="getMinLengthError()">
        </ng-shadcn-input>
      </div>
    `,
    props: {
      requiredControl: new FormControl('', { validators: [(control: any) => control.value ? null : { required: true }] }),
      emailValidationControl: new FormControl('', { 
        validators: [(control: any) => {
          const email = control.value;
          if (!email) return null;
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email) ? null : { email: true };
        }]
      }),
      minLengthControl: new FormControl('', { 
        validators: [(control: any) => control.value && control.value.length >= 5 ? null : { minlength: true }]
      }),
      getEmailError() {
        const control = this.emailValidationControl;
        if (control.invalid && control.touched) {
          if (control.errors?.['email']) return 'Please enter a valid email address';
        }
        return '';
      },
      getMinLengthError() {
        const control = this.minLengthControl;
        if (control.invalid && control.touched) {
          if (control.errors?.['minlength']) return 'Must be at least 5 characters long';
        }
        return '';
      },
    },
  }),
  parameters: {
    docs: {
      description: {
        story: 'Form validation examples with different validation rules.',
      },
    },
  },
};

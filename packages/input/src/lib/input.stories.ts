import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { signal } from '@angular/core';

const meta: Meta<InputComponent> = {
  title: 'Components/Input',
  component: InputComponent,
  render: (args) => ({
    props: {
      ...args,
      valueChange: args['valueChange'] || (() => {}),
      focused: args['focused'] || (() => {}),
      blurred: args['blurred'] || (() => {}),
    },
    template: `
      <ng-shadcn-input 
        [type]="type"
        [placeholder]="placeholder"
        [label]="label"
        [error]="error"
        [disabled]="disabled"
        [required]="required"
        [readonly]="readonly"
        [autocomplete]="autocomplete"
        [min]="min"
        [max]="max"
        [step]="step"
        [pattern]="pattern"
        [minlength]="minlength"
        [maxlength]="maxlength"
        [autofocus]="autofocus"
        [spellcheck]="spellcheck"
        [inputmode]="inputmode"
        [autocapitalize]="autocapitalize"
        [autocorrect]="autocorrect"
        [name]="name"
        [id]="id"
        [class]="class"
        (valueChange)="valueChange($event)"
        (focused)="focused()"
        (blurred)="blurred()">
      </ng-shadcn-input>
    `
  }),
  decorators: [
    moduleMetadata({
      imports: [InputComponent, ReactiveFormsModule, CommonModule],
    }),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      controls:{
        sort: 'alpha'
      },
      description: {
        component: `A highly customizable input component with support for various input types, form integration, and accessibility features.

## Installation

\`\`\`bash
# Using npm
npm install @ng-shadcn/input
# Using yarn
yarn add @ng-shadcn/input
# Using pnpm
pnpm add @ng-shadcn/input
\`\`\`

## Usage
### Standalone Components (Recommended)
Import and use the component directly in your standalone components:

\`\`\`typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '@ng-shadcn/input';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, InputComponent],
  template: \`
    <div class="w-80">
      <ng-shadcn-input 
        label="Email address" 
        type="email" 
        placeholder="Enter your email"
        (valueChange)="onEmailChange($event)">
      </ng-shadcn-input>
    </div>
  \`
})
export class ExampleComponent {
  onEmailChange(value: string) {
    console.log('Email changed:', value);
  }
}
\`\`\`

### Using NgModule (Legacy)
If you're using NgModules, import the \`InputModule\`:

\`\`\`typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputModule } from '@ng-shadcn/input';

@NgModule({
  declarations: [YourComponent],
  imports: [
    CommonModule,
    InputModule,
  ],
  exports: [YourComponent]
})
export class YourModule { }
\`\`\`

### Reactive Forms Example
\`\`\`typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '@ng-shadcn/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent],
  template: \`
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-4 w-80">
      <ng-shadcn-input
        formControlName="email"
        label="Email address"
        type="email"
        placeholder="Enter your email"
        [error]="emailError">
      </ng-shadcn-input>
      
      <ng-shadcn-input
        formControlName="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        [error]="passwordError">
      </ng-shadcn-input>
      
      <button type="submit" class="btn btn-primary w-full">
        Sign in
      </button>
    </form>
  \`
})
export class LoginComponent {
  loginForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  
  get emailError() {
    const email = this.loginForm.get('email');
    if (email?.hasError('required')) return 'Email is required';
    if (email?.hasError('email')) return 'Please enter a valid email';
    return '';
  }
  
  get passwordError() {
    const password = this.loginForm.get('password');
    if (password?.hasError('required')) return 'Password is required';
    if (password?.hasError('minlength')) return 'Password must be at least 8 characters';
    return '';
  }
  
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form submitted:', this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
\`\`\`

## Features
- **Multiple Input Types**: Supports text, email, password, number, tel, url, and more
- **Form Integration**: Seamless integration with both template-driven and reactive forms
- **Accessibility**: Follows WAI-ARIA design patterns for inputs
- **Validation**: Built-in support for form validation with error messages
- **Customizable**: Style with Tailwind CSS classes
- **Label & Error States**: Built-in support for labels and error messages
- **Disabled & Readonly States**: Supports disabled and readonly states
- **Internationalization**: RTL and LTR support
- **Responsive**: Works on all screen sizes
- **Performance**: Optimized with OnPush change detection
- **TypeScript Support**: Fully typed API with strict type checking
- **No External Dependencies**: Lightweight with no external dependencies
- **Server-Side Rendering**: Compatible with Angular Universal
- **Keyboard Navigation**: Full keyboard navigation support
- **Custom Styling**: Extend with your own CSS classes
- **Auto-complete**: Supports HTML5 autocomplete attributes
- **Input Modes**: Supports different input modes for mobile devices
- **Accessibility**: Proper ARIA attributes and keyboard navigation
- **Theming**: Supports theming through CSS variables
- **Tested**: Comprehensive test coverage
- **Documented**: Complete API documentation and examples`,
      },
      extractComponentDescription: (component: any) => {
        if (component === InputComponent) {
          return 'A highly customizable input component with support for various input types, form integration, and accessibility features.';
        }
        return null;
      },
    },
  },
  tags: ['autodocs', 'form-control', 'ui', 'input'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'The type of the input element',
      table: {
        type: { summary: 'text, email, password, number, tel, url' },
        defaultValue: { summary: 'text' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text that appears when the input is empty',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '\'\'' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text displayed above the input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '\'\'' },
      },
    },
    error: {
      control: 'text',
      description: 'Error message displayed below the input when there is a validation error',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '\'\'' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: "false" },
      },
    },
    autocomplete: {
      control: 'text',
      description: 'HTML autocomplete attribute value',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '\'\'' },
      },
    },
    min: {
      control: 'text',
      description: 'Minimum value for number/date inputs',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: 'undefined' },
      },
    },
    minLength: {
      control: 'text',
      description: 'Minimum length for text inputs',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    max: {
      control: 'text',
      description: 'Maximum value for number/date inputs',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: 'undefined' },
      },
    },
    maxLength: {
      control: 'text',
      description: 'Maximum length for text inputs',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    pattern: {
      control: 'text',
      description: 'Pattern for input validation',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    value:{
      control: 'text',
      description: 'The value of the input field. Two-way binding is supported.',
      table: {
        category: 'inputs',
        type: { summary: 'string' },
        defaultValue: { summary: '\'\'' },
      },
    },
    autofocus: {
      control: 'boolean',
      description: 'Whether the input should be focused on page load',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: "false" },
      },
    },
    
    inputmode: {
      control: 'select',
      options: ['text', 'none', 'tel', 'url', 'email', 'numeric', 'decimal', 'search'],
      description: 'Hint for the browser which keyboard to display',
      table: {
        type: { summary: 'text, none, tel, url, email, numeric, decimal, search' },
        defaultValue: { summary: 'text' },
      },
    },
    
    
    name: {
      control: 'text',
      description: 'Name of the input element',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '\'\'' },
      },
    },
    id: {
      control: 'text',
      description: 'ID of the input element',
      table: {
        category: 'inputs',
        type: { summary: 'string' },
        defaultValue: { summary: 'auto-generated' },
      },
    },
    class: {
      control: 'text',
      description: 'Additional CSS classes for the input element',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '\'\'' },
      },
    },
    valueChange: {
      action: 'valueChange',
      description: 'Event emitted when the input value changes',
      table: {
        type: { summary: 'EventEmitter<string>' },
      },
    },
    focused: {
      action: 'focused',
      description: 'Event emitted when the input receives focus',
      table: {
        type: { summary: 'EventEmitter<void>' },
      },
    },
    blurred: {
      action: 'blurred',
      description: 'Event emitted when the input loses focus',
      table: {
        type: { summary: 'EventEmitter<void>' },
      },
    },
  },
  args: {
    type: 'text',
    placeholder: '',
    label: '',
    error: '',
    disabled: false,
    min: undefined,
    max: undefined,
    pattern: '',
    autofocus: false,
    inputmode: 'text',
    name: '',
    id: '',
    class: '',
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

export const WithoutControlButton: Story = {
  render: () => ({
    template: `
      <div class="space-y-4 w-80">
        <ng-shadcn-input 
          label="Text input" 
          placeholder="Text input..."
          [controlButton]="false"
        >
        </ng-shadcn-input>
        
        <ng-shadcn-input 
          label="Password input" 
          placeholder="Password input"
          type="password"
          [controlButton]="false"
        >
        </ng-shadcn-input>
        
        <ng-shadcn-input 
          label="Number input" 
          placeholder="Number input"
          type="number"
          [controlButton]="false"
        >
        </ng-shadcn-input>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Input component includes a control button by default. Setting `controlButton` to `false` disables it.',
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

export const TwoWayBinding: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [CommonModule, FormsModule],
    },
    template: `
      <div class="space-y-4 w-80">
        <ng-shadcn-input 
          label="Two-way Signal Binding Example"
          placeholder="Type something..."
          [value]="signalInputValue()"
        >
        </ng-shadcn-input>
        
        <ng-shadcn-input 
          label="Two-way non-Signal Binding Example"
          placeholder="Type something..."
          [value]="nonSignalInputValue"
          (valueChange)="onValueChange($event)"
        >
        </ng-shadcn-input>
        
        <div class="mt-4 p-4 bg-gray-100 rounded">
          <h4 class="font-medium mb-2">Current Signal Value:</h4>
          <p class="text-sm">{{ signalInputValue() || '(empty)' }}</p>
          <h4 class="font-medium mb-2">Current non-signal Value:</h4>
          <p class="text-sm">{{ nonSignalInputValue || '(empty)' }}</p>
        </div>
        
        <div class="flex gap-2">
          <button 
            class="px-3 py-1.5 text-sm font-medium bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
            (click)="setValue('Hello from button!')">
            Set Value
          </button>
          <button 
            class="px-3 py-1.5 text-sm font-medium bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            (click)="clearValue()">
            Clear
          </button>
        </div>
      </div>
    `,
    props: {
      signalInputValue: signal('Signal Initial'),
      nonSignalInputValue: 'Initial value',
      onValueChange(value: string) {
        console.log('Value changed to:', value);
        this.nonSignalInputValue = value;
      },
      setValue(value: string) {
        this.signalInputValue.set(value);
        this.nonSignalInputValue = value;
      },
      clearValue() {
        this.signalInputValue.set('');
        this.nonSignalInputValue = ''
      }
    },
  }),
  parameters: {
    docs: {
      description: {
        story: 'Example of two-way data binding with ngModel. The input value is synchronized with a component property.',
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
          label="First name (required)"
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
          label="Last name (min 5 chars)"
          placeholder="Minimum 5 characters..."
          [formControl]="minLengthControl"
          [error]="getMinLengthError()">
        </ng-shadcn-input>
      </div>

      <div class="mt-4 p-4 bg-gray-100 rounded">
        <h4 class="font-medium mb-2">Form Values:</h4>
        <pre class="text-sm">{{ getFormValues() | json }}</pre>
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
      getFormValues() {
        return {
          firstName: this.requiredControl.value,
          email: this.emailValidationControl.value,
          lastName: this.minLengthControl.value,
        };
      },
    },
  }),
  parameters: {
    docs: {
      description: {
        story: 'Integration with Angular Reactive Forms using FormControl. Form validation examples with different validation rules.',
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => ({
    template: `
      <div class="space-y-6 p-4 max-w-md mx-auto">
        <!-- Custom Input Background -->
        <div>
          <ng-shadcn-input 
            label="Custom Background"
            placeholder="Type something..."
            [class]="'bg-blue-50 border-blue-200 focus:ring-blue-500 focus-visible:ring-0 focus-visible:ring-offset-0'"
          ></ng-shadcn-input>
        </div>

        <!-- Custom Label Styling -->
        <div>
          <ng-shadcn-input 
            label="Custom Label"
            placeholder="With custom label styling"
            [labelClass]="'text-purple-600 font-bold uppercase text-xs tracking-wider'"
          ></ng-shadcn-input>
        </div>

        <!-- Error State Styling -->
        <div>
          <ng-shadcn-input 
            label="With Error"
            type="password"
            placeholder="This field has an error"
            error="This is a custom error message"
            [errorClass]="'text-red-600 font-medium underline underline-offset-2 italic'"
            [class]="'border-red-300 focus:ring-red-500 focus-visible:ring-red-500/50'"
          ></ng-shadcn-input>
        </div>

        <!-- Full Custom Styling -->
        <div>
          <ng-shadcn-input 
            label="Fully Custom Styled"
            placeholder="Completely custom look"
            [class]="'rounded-lg border-2 border-dashed border-emerald-400 bg-emerald-50 px-4 py-3 text-emerald-800 placeholder-emerald-400 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 focus-visible:ring-0 focus-visible:ring-offset-0'"
            [labelClass]="'text-emerald-700 font-semibold mb-1'"
            [errorClass]="'text-amber-600 text-sm mt-1'"
          ></ng-shadcn-input>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Examples of custom styling using the component\'s class inputs. You can customize the input, label, and error message styles using the `class`, `labelClass`, and `errorClass` inputs respectively.'
      }
    }
  }
};
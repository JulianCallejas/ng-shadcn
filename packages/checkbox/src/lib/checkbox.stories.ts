import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { CheckboxComponent } from "./checkbox.component";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  AlertComponent,
  AlertContentComponent,
} from "@packages/alert/src/public-api";

// Create a wrapper component for reactive form example
@Component({
  selector: "reactive-form-example",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CheckboxComponent,
    AlertComponent,
    AlertContentComponent,
  ],
  template: `
    <form
      [formGroup]="form"
      (ngSubmit)="onSubmit()"
      class="space-y-4 p-6 border rounded-lg max-w-md"
    >
      <h2 class="text-xl font-semibold mb-2">Account Settings</h2>
      <p class="text-muted-foreground text-sm mb-6">
        Manage your notification preferences
      </p>

      <div class="space-y-6">
        <!-- Terms and Conditions -->
        <div class="space-y-2">
          <ng-shadcn-checkbox formControlName="terms" id="terms-conditions">
            <span labelContent>I accept the terms and conditions</span>
            <span descriptionContent
              >Required to continue using our service</span
            >
          </ng-shadcn-checkbox>

          @if (
            form.get("terms")?.touched &&
            form.get("terms")?.errors?.["required"]
          ) {
            <div class="text-sm text-destructive mt-1">
              You must accept the terms and conditions to continue
            </div>
          }
        </div>

        <!-- Email Notifications -->
        <div class="space-y-2">
          <ng-shadcn-checkbox
            formControlName="emailNotifications"
            id="email-notifications"
          >
            <span labelContent>Email notifications</span>
            <span descriptionContent
              >Receive email notifications about important updates</span
            >
          </ng-shadcn-checkbox>
        </div>

        <!-- Push Notifications -->
        <div class="space-y-2">
          <ng-shadcn-checkbox
            formControlName="pushNotifications"
            id="push-notifications"
          >
            <span labelContent>Push notifications</span>
            <span descriptionContent
              >Get push notifications on your device</span
            >
          </ng-shadcn-checkbox>
        </div>

        <!-- Marketing Emails -->
        <div class="space-y-2">
          <ng-shadcn-checkbox
            formControlName="marketingEmails"
            id="marketing-emails"
          >
            <span labelContent>Marketing emails</span>
            <span descriptionContent
              >Receive our newsletter and promotional offers</span
            >
          </ng-shadcn-checkbox>
        </div>

        <!-- Form Actions -->
        <div class="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            [disabled]="formSubmitted && form.invalid"
          >
            Save Preferences
          </button>

          <button
            type="button"
            (click)="resetForm()"
            class="px-4 py-2 border rounded-md hover:bg-muted/50 transition-colors"
          >
            Reset
          </button>
        </div>

        <!-- Form Status -->
        @if (formSubmitted) {
          <ng-shadcn-alert
            [variant]="form.valid ? 'success' : 'destructive'"
            class="mt-2"
          >
            <ng-shadcn-alert-content>
              {{
                form.valid
                  ? "Your preferences have been saved successfully!"
                  : "You must accept the terms and conditions to continue"
              }}
            </ng-shadcn-alert-content>
          </ng-shadcn-alert>

          <!-- Form Values (for debugging) -->
          <div class="mt-4 p-4 bg-muted/30 rounded-md">
            <h4 class="font-medium mb-2 text-sm">Current Selections:</h4>
            <pre class="text-xs">{{ form.value | json }}</pre>
          </div>
        }
      </div>
    </form>
  `,
})
export class ReactiveFormExampleComponent implements OnInit {
  form: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      terms: [false, Validators.requiredTrue],
      emailNotifications: [true],
      pushNotifications: [false],
      marketingEmails: [true],
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.form.valid) {
      console.log("Form submitted:", this.form.value);
      // Here you would typically send the form data to a service
    } else {
      // Mark all fields as touched to show validation messages
      Object.values(this.form.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  resetForm() {
    this.form.reset({
      terms: false,
      emailNotifications: true,
      pushNotifications: false,
      marketingEmails: true,
    });
    this.formSubmitted = false;
  }
}

const meta: Meta<CheckboxComponent> = {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  decorators: [
    moduleMetadata({
      imports: [CheckboxComponent, ReactiveFormsModule],
    }),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `A customizable checkbox component that supports both controlled and uncontrolled usage patterns.
## Installation

\`\`\`bash
# Using npm
npm install @ng-shadcn/checkbox
# Using yarn
yarn add @ng-shadcn/checkbox
# Using pnpm
pnpm add @ng-shadcn/checkbox
\`\`\`
## Usage
### Standalone Components (Recommended)
Import and use the component directly in your standalone components:

\`\`\`typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from '@ng-shadcn/checkbox';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, CheckboxComponent],
  template: \`
    <div class="flex items-center space-x-2">
      <ng-shadcn-checkbox id="terms" (change)="onChange($event)">
        <span labelContent>Accept terms and conditions</span>
      </ng-shadcn-checkbox>
    </div>
  \`
})
export class ExampleComponent {
  onChange(checked: boolean) {
    console.log('Checkbox checked:', checked);
  }
}
\`\`\`

### Using NgModule (Legacy)
If you're using NgModules, import the \`CheckboxModule\`:

\`\`\`typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from '@ng-shadcn/checkbox';

@NgModule({
  declarations: [YourComponent],
  imports: [
    CommonModule,
    CheckboxModule
  ],
  exports: [YourComponent]
})
export class YourModule { }
\`\`\`

### Reactive Forms Example
\`\`\`typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from '@ng-shadcn/checkbox';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CheckboxComponent],
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <ng-shadcn-checkbox formControlName="terms" id="terms">
        <span labelContent>I accept the terms and conditions</span>
        <span descriptionContent>Required to continue</span>
      </ng-shadcn-checkbox>
      
      <button type="submit" [disabled]="form.invalid">Submit</button>
    </form>
  \`
})
export class SettingsComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      terms: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    }
  }
}
\`\`\`

## Features
- **Controlled/Uncontrolled**: Supports both controlled and uncontrolled usage patterns
- **Reactive Forms**: Seamless integration with Angular's Reactive Forms
- **Template-driven Forms**: Works with template-driven forms
- **Accessible**: Follows WAI-ARIA design patterns for checkboxes
- **Customizable**: Supports custom styling through Tailwind CSS
- **Label & Description**: Includes support for labels and descriptions
- **Disabled State**: Supports disabled state with proper ARIA attributes
- **Indeterminate State**: Supports indeterminate state for tri-state checkboxes
- **Sizes**: Multiple size variants (sm, default, lg)
- **TypeScript Support**: Fully typed API with strict type checking
- **RTL Support**: Right-to-left layout support
- **High Contrast**: Optimized for high contrast mode
- **Keyboard Navigation**: Full keyboard navigation support
- **Form Integration**: Works with both template-driven and reactive forms
- **No External Dependencies**: Lightweight with no external dependencies
- **Server-Side Rendering**: Compatible with Angular Universal
- **Animations**: Smooth transitions for state changes
- **Custom Icons**: Option to use custom check and indeterminate icons
- **Form Validation**: Built-in support for form validation
- **Error States**: Visual feedback for error states
- **Theming**: Supports theming through CSS variables
- **Responsive**: Works on all screen sizes
- **Performance**: Optimized for performance with OnPush change detection
- **Tested**: Comprehensive test coverage
- **Documented**: Complete API documentation and examples`,
      },
      extractComponentDescription: (component: any) => {
        if (component === CheckboxComponent) {
          return 'A customizable checkbox component that can be used in forms or as a standalone control. Supports both controlled and uncontrolled usage patterns.';
        }
        return null;
      },
    },
  },
  tags: ['autodocs', 'form-control', 'ui'],
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the checkbox is checked",
    },
    disabled: {
      control: "boolean",
      description: "Whether the checkbox is disabled",
    },
    indeterminate: {
      control: "boolean",
      description: "Whether the checkbox is in an indeterminate state",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      description: "Size of the checkbox",
    },
    ariaLabel: {
      control: "text",
      description: "ARIA label for accessibility",
    },
    ariaDescribedby: {
      control: "text",
      description: "ARIA describedby for additional accessibility context",
    },
  },
  args: {
    checked: false,
    disabled: false,
    indeterminate: false,
    size: "default",
  },
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

export const Default: Story = {
  args: {
    id: "checkbox-default",
    ariaLabel: "Basic checkbox",
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-col gap-4">
        <ng-shadcn-checkbox
          [id]="id"
          [checked]="checked"
          [disabled]="disabled"
          [indeterminate]="indeterminate"
          [ariaLabel]="ariaLabel"
          [ariaDescribedby]="ariaDescribedby"
          [size]="size"
          (checkedChange)="checked = $event"
          class="{{class}}"
        >
          <span labelContent>Toggle me</span>
          <span descriptionContent>Current state: {{ checked ? 'Checked' : indeterminate ? 'Indeterminate' : 'Unchecked' }}</span>
        </ng-shadcn-checkbox>
        
        <div class="text-sm text-muted-foreground">
          <p>Disabled: {{ disabled ? 'Yes' : 'No' }}</p>
        </div>
      </div>
    `,
  }),
};

export const WithLabel: Story = {
  args: {
    id: "checkbox-label",
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="space-y-4">
        <div>
          <h3 class="font-medium mb-2">With label and description</h3>
          <ng-shadcn-checkbox
            [id]="id"
            [checked]="checked"
            [disabled]="disabled"
            [indeterminate]="indeterminate"
            [size]="size"
            (checkedChange)="checked = $event"
          >
            <span labelContent>Accept terms and conditions</span>
            <span descriptionContent>You agree to our Terms of Service and Privacy Policy.</span>
          </ng-shadcn-checkbox>
          <p class="text-sm text-muted-foreground mt-2">State: {{ checked ? 'Checked' : 'Unchecked' }}</p>
        </div>
        
        <div>
          <h3 class="font-medium mb-2">Just label</h3>
          <ng-shadcn-checkbox
            [id]="id + '-label-only'"
            [checked]="checked"
            [disabled]="disabled"
            [size]="size"
            (checkedChange)="checked = $event"
          >
            <span labelContent>I agree to the terms</span>
          </ng-shadcn-checkbox>
          <p class="text-sm text-muted-foreground mt-2">State: {{ checked ? 'Checked' : 'Unchecked' }}</p>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "Checkbox with label and optional description. The label and description are projected content.",
      },
    },
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    id: "checkbox-checked",
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="font-medium mb-2">Checked Checkbox</h3>
          <ng-shadcn-checkbox
            [id]="id"
            checked
            [disabled]="disabled"
            [size]="size"
            (checkedChange)="checked = $event"
          >
            <span labelContent>Checked</span>
          </ng-shadcn-checkbox>
        </div>

        <div class="pt-4 border-t">
          <h3 class="font-medium mb-2">Unchecked</h3>
          <ng-shadcn-checkbox
            [id]="id + '-uncontrolled'"
            [disabled]="disabled"
            [size]="size"
          >
            <span labelContent>Unchecked checkbox</span>
          </ng-shadcn-checkbox>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "Checkbox in checked and unchecked states.",
      },
    },
  },
};

export const Controlled: Story = {
  args: {
    checked: true,
    id: "checkbox-checked",
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="font-medium mb-2">Controlled Checkbox</h3>
          <ng-shadcn-checkbox
            [id]="id"
            [checked]="checked"
            [disabled]="disabled"
            [size]="size"
            (checkedChange)="checked = $event"
          >
            <span labelContent>Controlled checkbox</span>
            <span descriptionContent>State is managed by the parent component</span>
          </ng-shadcn-checkbox>
          <p class="text-sm text-muted-foreground mt-2">
            Current state: {{ checked ? 'Checked' : 'Unchecked' }}
          </p>
          <button 
            (click)="checked = !checked"
            class="mt-2 px-3 py-1 text-sm bg-muted rounded-md"
          >
            Toggle Checked State
          </button>
        </div>

        <div class="pt-4 border-t">
          <h3 class="font-medium mb-2">Uncontrolled Checkbox</h3>
          <ng-shadcn-checkbox
            [id]="id + '-uncontrolled'"
            [disabled]="disabled"
            [size]="size"
          >
            <span labelContent>Uncontrolled checkbox</span>
            <span descriptionContent>State is managed internally</span>
          </ng-shadcn-checkbox>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "Fully controlled checkbox with two-way binding and manual state management.",
      },
    },
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    id: "checkbox-indeterminate",
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="space-y-4">
        <ng-shadcn-checkbox
          [id]="id"
          [checked]="false"
          indeterminate
          [disabled]="disabled"
          [size]="size"
        >
          <span slot="label">Select all items</span>
          <span slot="description">Indeterminate state is useful for parent checkboxes that have some but not all children checked</span>
        </ng-shadcn-checkbox>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "Checkbox in indeterminate state, typically used for parent checkboxes with mixed child states.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    id: "checkbox-disabled",
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="grid grid-cols-1 gap-4">
        <ng-shadcn-checkbox
          [id]="id"
          [checked]="false"
          disabled
          [size]="size"
        >
          <span slot="label">Disabled unchecked</span>
        </ng-shadcn-checkbox>
        
        <ng-shadcn-checkbox
          [id]="id + '-checked'"
          [checked]="true"
          [disabled]="true"
          [size]="size"
        >
          <span slot="label">Disabled checked</span>
        </ng-shadcn-checkbox>
        
        <ng-shadcn-checkbox
          [id]="id + '-indeterminate'"
          [indeterminate]="true"
          [disabled]="true"
          [size]="size"
        >
          <span slot="label">Disabled indeterminate</span>
        </ng-shadcn-checkbox>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "Checkbox in disabled state with various checked states.",
      },
    },
  },
};

export const Sizes: Story = {
  args: {
    id: "checkbox-sizes",
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="grid grid-cols-1 gap-4">
        <ng-shadcn-checkbox
          [id]="id + '-sm'"
          checked
          [disabled]="disabled"
          size="sm"
        >
          <span slot="label">Small checkbox</span>
          <span slot="description">Size: sm</span>
        </ng-shadcn-checkbox>
        
        <ng-shadcn-checkbox
          [id]="id + '-default'"
          checked
          [disabled]="disabled"
          size="default"
        >
          <span slot="label">Default checkbox</span>
          <span slot="description">Size: default</span>
        </ng-shadcn-checkbox>
        
        <ng-shadcn-checkbox
          [id]="id + '-lg'"
          checked
          [disabled]="disabled"
          size="lg"
        >
          <span slot="label">Large checkbox</span>
          <span slot="description">Size: lg</span>
        </ng-shadcn-checkbox>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "Checkbox in different sizes: sm, default, and lg.",
      },
    },
  },
};

export const ReactiveForm: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ReactiveFormsModule, ReactiveFormExampleComponent],
    },
    template: `
      <div class="flex justify-center p-6">
        <reactive-form-example></reactive-form-example>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `Example of using checkboxes in a reactive form with validation. This example includes:
- Required field validation for terms acceptance
- Form submission handling with validation feedback
- Reset functionality
- Visual feedback for form state
- Error messages for invalid fields

Try submitting the form without accepting the terms to see the validation in action.`,
      },
      source: {
        type: "code",
        language: "typescript",
        code: `
      @Component({
    selector: 'reactive-form-example',
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      CheckboxComponent,
      AlertComponent,
      AlertTitleComponent,
      AlertContentComponent,
    ],
    template: \`
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4 p-6 border rounded-lg max-w-md">
        <h2 class="text-xl font-semibold mb-2">Account Settings</h2>
        <p class="text-muted-foreground text-sm mb-6">Manage your notification preferences</p>
        
        <div class="space-y-6">
          <!-- Terms and Conditions -->
          <div class="space-y-2">
            <ng-shadcn-checkbox 
              formControlName="terms"
              id="terms-conditions"
            >
              <span labelContent>I accept the terms and conditions</span>
              <span descriptionContent>Required to continue using our service</span>
            </ng-shadcn-checkbox>
            
            @if (form.get('terms')?.touched && form.get('terms')?.errors?.['required']) {
              <div class="text-sm text-destructive mt-1">
                You must accept the terms and conditions to continue
              </div>
            }
  
          </div>
  
          <!-- Email Notifications -->
          <div class="space-y-2">
            <ng-shadcn-checkbox 
              formControlName="emailNotifications"
              id="email-notifications"
            >
              <span labelContent>Email notifications</span>
              <span descriptionContent>Receive email notifications about important updates</span>
            </ng-shadcn-checkbox>
          </div>
  
          <!-- Push Notifications -->
          <div class="space-y-2">
            <ng-shadcn-checkbox 
              formControlName="pushNotifications"
              id="push-notifications"
            >
              <span labelContent>Push notifications</span>
              <span descriptionContent>Get push notifications on your device</span>
            </ng-shadcn-checkbox>
          </div>
  
          <!-- Marketing Emails -->
          <div class="space-y-2">
            <ng-shadcn-checkbox 
              formControlName="marketingEmails"
              id="marketing-emails"
            >
              <span labelContent>Marketing emails</span>
              <span descriptionContent>Receive our newsletter and promotional offers</span>
            </ng-shadcn-checkbox>
          </div>
  
          <!-- Form Actions -->
          <div class="flex flex-col sm:flex-row gap-3 pt-4">
            <button 
              type="submit" 
              class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              [disabled]="formSubmitted && form.invalid"
            >
              Save Preferences
            </button>
            
            <button 
              type="button" 
              (click)="resetForm()" 
              class="px-4 py-2 border rounded-md hover:bg-muted/50 transition-colors"
            >
              Reset
            </button>
          </div>
  
          <!-- Form Status -->
          @if (formSubmitted) {
            <ng-shadcn-alert
              [variant]="form.valid ? 'success' : 'destructive'"
              class="mt-2"
            >
              <ng-shadcn-alert-content>
                {{ form.valid
                  ? 'Your preferences have been saved successfully!'
                  : 'You must accept the terms and conditions to continue'
                }}
              </ng-shadcn-alert-content>
            </ng-shadcn-alert>
            
            <!-- Form Values (for debugging) -->
            <div class="mt-4 p-4 bg-muted/30 rounded-md">
              <h4 class="font-medium mb-2 text-sm">Current Selections:</h4>
              <pre class="text-xs">{{ form.value | json }}</pre>
            </div>
          }
        </div>
      </form>
    \`
  })
  export class ReactiveFormExampleComponent implements OnInit {
    form: FormGroup;
    formSubmitted = false;
  
    constructor(private fb: FormBuilder) {}
  
    ngOnInit() {
      this.form = this.fb.group({
        terms: [false, Validators.requiredTrue],
        emailNotifications: [true],
        pushNotifications: [false],
        marketingEmails: [true]
      });
    }
  
    onSubmit() {
      this.formSubmitted = true;
      if (this.form.valid) {
        console.log('Form submitted:', this.form.value);
        // Here you would typically send the form data to a service
      } else {
        // Mark all fields as touched to show validation messages
        Object.values(this.form.controls).forEach(control => {
          control.markAsTouched();
        });
      }
    }
  
    resetForm() {
      this.form.reset({
        terms: false,
        emailNotifications: true,
        pushNotifications: false,
        marketingEmails: true
      });
      this.formSubmitted = false;
    }
  }
      `,
      },
    },
  },
};

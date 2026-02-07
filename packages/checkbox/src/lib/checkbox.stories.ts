import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { CheckboxComponent } from "./checkbox.component";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Component, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  AlertComponent,
  AlertContentComponent,
} from "@packages/alert/src/public-api";
import { CheckboxIconComponent } from "./checkbox-icon.component";
import { CheckboxLabelComponent } from "./checkbox-label.component";
import { CheckboxDescriptionComponent } from "./checkbox-description.component";
import { ButtonComponent } from "@packages/button/src/public-api";

// Wrapper component for controlled example
@Component({
  selector: "controlled-checkbox-example",
  standalone: true,
  imports: [
    CommonModule,
    CheckboxComponent,
    CheckboxDescriptionComponent,
    CheckboxLabelComponent,
    ButtonComponent
  ],
  template: `
  <div class="space-y-6">
        <div class="space-y-2">
          <h3 class="font-medium mb-2">Controlled Checkbox</h3>
          <ng-shadcn-checkbox
            id="controlledCheckboxExample"
            [checked]="checked()"
            [indeterminate]="indeterminateState()"
            (checkedChange)="toggleCheckbox()"
          >
            <ng-shadcn-checkbox-label>Controlled checkbox</ng-shadcn-checkbox-label>
            <ng-shadcn-checkbox-description>State is managed by the parent component</ng-shadcn-checkbox-description>
          </ng-shadcn-checkbox>
          <p class="text-sm text-muted-foreground mt-2">
            Current state: {{ checked() ? 'Checked' : 'Unchecked' }}
          </p>
          <div class="flex gap-2 flex-wrap">
            <ng-shadcn-button
              (click)="toggleCheckbox()"
            >
              Toggle Checked State
            </ng-shadcn-button>
            <ng-shadcn-button
              (click)="toggleCheckboxIndeterminate()"
            >
              Indeterminate
            </ng-shadcn-button>
          </div>
        </div>

        <div class="pt-4 border-t">
          <h3 class="font-medium mb-2">Uncontrolled Checkbox</h3>
          <ng-shadcn-checkbox
            id="ucontrolledCheckboxExample"
          >
            <ng-shadcn-checkbox-label>Uncontrolled checkbox</ng-shadcn-checkbox-label>
            <ng-shadcn-checkbox-description>State is managed internally</ng-shadcn-checkbox-description>
          </ng-shadcn-checkbox>
        </div>
      </div>
    
  `,
})
export class ControlledCheckboxExampleComponent {
  checked = signal(true);
  indeterminateState = signal(false);
  toggleCheckbox() {
    this.checked.set(!this.checked());
    this.indeterminateState.set(false);
  }
  toggleCheckboxIndeterminate() {
    this.indeterminateState.set(!this.indeterminateState());
  }
}

// Wrapper component for reactive form example
@Component({
  selector: "reactive-form-example",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CheckboxComponent,
    CheckboxDescriptionComponent,
    CheckboxLabelComponent,
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
            <ng-shadcn-checkbox-label>I accept the terms and conditions</ng-shadcn-checkbox-label>
            <ng-shadcn-checkbox-description>Required to continue using our service</ng-shadcn-checkbox-description
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
            <ng-shadcn-checkbox-label>Email notifications</ng-shadcn-checkbox-label>
            <ng-shadcn-checkbox-description
              >Receive email notifications about important updates</ng-shadcn-checkbox-description
            >
          </ng-shadcn-checkbox>
        </div>

        <!-- Push Notifications -->
        <div class="space-y-2">
          <ng-shadcn-checkbox
            formControlName="pushNotifications"
            id="push-notifications"
          >
            <ng-shadcn-checkbox-label>Push notifications</ng-shadcn-checkbox-label>
            <ng-shadcn-checkbox-description
              >Get push notifications on your device</ng-shadcn-checkbox-description
            >
          </ng-shadcn-checkbox>
        </div>

        <!-- Marketing Emails -->
        <div class="space-y-2">
          <ng-shadcn-checkbox
            formControlName="marketingEmails"
            id="marketing-emails"
          >
            <ng-shadcn-checkbox-label>Marketing emails</ng-shadcn-checkbox-label>
            <ng-shadcn-checkbox-description
              >Receive our newsletter and promotional offers</ng-shadcn-checkbox-description
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
  render: (args) => {
    return {
      props: {
        ...args,
      },
      template: `
        <ng-shadcn-checkbox
          [id]="id"
          [checked]="checked"
          [disabled]="disabled"
          [indeterminate]="indeterminate"
          [ariaLabel]="ariaLabel"
          [ariaDescribedby]="ariaDescribedby"
          [size]="size"
          (checkedChange)="handleCheckedChange($event)"
          [class]="class"
          [checkedClass]="checkedClass"
        >
          <ng-shadcn-checkbox-label>
            Label for the Chekcbox
          </ng-shadcn-checkbox-label>
          <ng-shadcn-checkbox-description>
            Description text for the checkbox
          </ng-shadcn-checkbox-description>
        </ng-shadcn-checkbox>
      `
    };
  },
  decorators: [
    moduleMetadata({
      imports: [CheckboxComponent, ReactiveFormsModule, CheckboxIconComponent, CheckboxLabelComponent, CheckboxDescriptionComponent],
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
import { CheckboxLabelComponent } from './checkbox-label.component';
import { CheckboxDescriptionComponent } from './checkbox-description.component';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, CheckboxComponent, CheckboxLabelComponent, CheckboxDescriptionComponent],
  template: \`
    <div class="flex items-center space-x-2">
      <ng-shadcn-checkbox id="terms" (change)="onChange($event)">
        <ng-shadcn-checkbox-label>Accept terms and conditions</ng-shadcn-checkbox-label>
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
import { CheckboxIconComponent } from './checkbox-icon.component';
import { CheckboxLabelComponent } from './checkbox-label.component';
import { CheckboxDescriptionComponent } from './checkbox-description.component';

@NgModule({
  declarations: [YourComponent],
  imports: [
    CommonModule,
    CheckboxModule,
    CheckboxIconComponent,
    CheckboxLabelComponent,
    CheckboxDescriptionComponent,
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
import { CheckboxLabelComponent } from './checkbox-label.component';
import { CheckboxDescriptionComponent } from './checkbox-description.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CheckboxComponent, CheckboxLabelComponent, CheckboxDescriptionComponent],
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <ng-shadcn-checkbox formControlName="terms" id="terms">
        <ng-shadcn-checkbox-label>I accept the terms and conditions</ng-shadcn-checkbox-label>
        <ng-shadcn-checkbox-description>Required to continue</ng-shadcn-checkbox-description>
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
      table:{
        defaultValue: { summary: 'false' },
        type: {
          summary: 'true | false',
        },
      }
    },
    disabled: {
      control: "boolean",
      description: "Whether the checkbox is disabled",
      table:{
        defaultValue: { summary: 'false' },
        type: {
          summary: 'true | false',
        },
      }
    },
    indeterminate: {
      control: "boolean",
      description: "Whether the checkbox is in an indeterminate state",
      table:{
        defaultValue: { summary: 'false' },
        type: {
          summary: 'true | false',
        },
      }
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      description: "Size of the checkbox",
      table:{
        defaultValue: { summary: 'default' },
        type: {
          summary: 'sm | default | lg',
        },
      },
    },
    ariaLabel: {
      control: "text",
      description: "ARIA label for accessibility",
    },
    ariaDescribedby: {
      control: "text",
      description: "ARIA describedby for additional accessibility context",
    },
    class: {
      control: "text",
      description: "Custom class for the checkbox",
      table:{
        defaultValue: { summary: '' },
        type: {
          summary: 'string',
        },
      },
    },
    checkedClass: {
      control: "text",
      description: "Custom class for the checkbox when it is in the checked state. This is useful for applying different styles when the checkbox is selected.",
      table:{
        defaultValue: { summary: '' },
        type: {
          summary: 'string',
        },
      },
    },
    id: {
      control: "text",
      description: "ID for the checkbox",
    },
    customIcon: {
      control: false,
      table: {
        defaultValue: { summary: '<ng-shadcn-checkbox-icon>' },
        type: {
          summary: 'CheckboxIconComponent',
        },
      }
    },
    labelComponent: {
      control: false,
      table: {
        defaultValue: { summary: '<ng-shadcn-checkbox-label>' },
        type: {
          summary: 'CheckboxLabelComponent',
        },
      }
    },
    descriptionComponent: {
      control: false,
      table: {
        defaultValue: { summary: '<ng-shadcn-checkbox-description>' },
        type: {
          summary: 'CheckboxDescriptionComponent',
        },
      }
    }


  },
  subcomponents: {
    CheckboxIconComponent,
    CheckboxLabelComponent,
    CheckboxDescriptionComponent,
  },
  args: {
    checked: false,
    disabled: false,
    indeterminate: false,
    size: "default",
    class: '',
    checkedClass: '',
  },
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

export const Default: Story = {
  args: {
    id: "checkbox-default",
    ariaLabel: "Basic checkbox",
  },
  render: (args) => {
    const checked = signal(args.checked || false);
    const disabled = signal(args.disabled || false);
    const indeterminate = signal(args.indeterminate || false);
    return {
      props: {
        ...args,
        checked,
        disabled,
        indeterminate,
        onToggle: () => {
          if (!disabled()) {
            checked.set(!checked());
            indeterminate.set(false);
          }
        }
      },
      template: `
        <div class="flex flex-col gap-4">
        <div class="mx-auto" >
          <ng-shadcn-checkbox
              [id]="id"
              [checked]="checked()"
              [disabled]="disabled()"
              [indeterminate]="indeterminate()"
              [ariaLabel]="ariaLabel"
              [ariaDescribedby]="ariaDescribedby"
              [size]="size"
              (checkedChange)="checked.set($event)"
              [class]="class"
              [checkedClass]="checkedClass"
            >
            </ng-shadcn-checkbox>
        </div>

          
          <div class="text-sm text-muted-foreground">
            <p>Checked: {{ checked() ? 'Yes' : 'No' }}</p>
            <p>Disabled: {{ disabled() ? 'Yes' : 'No' }}</p>
          </div>
        </div>
      `,
    };
  },
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
          <ng-shadcn-checkbox checked id="checkbox-with-label" checked>
            <ng-shadcn-checkbox-label>Accept terms and conditions</ng-shadcn-checkbox-label>
            <ng-shadcn-checkbox-description>You agree to our Terms of Service and Privacy Policy.</ng-shadcn-checkbox-description>
          </ng-shadcn-checkbox>
        </div>
        
        <div>
          <h3 class="font-medium mb-2">Just label</h3>
          <ng-shadcn-checkbox
            id="label-only"          
            checked
          >
            <ng-shadcn-checkbox-label>I agree to the terms</ng-shadcn-checkbox-label>
          </ng-shadcn-checkbox>
        </div>
        
        <div>
          <h3 class="font-medium mb-2">Just description</h3>
          <ng-shadcn-checkbox
            id="description-only"
            checked
          >
            <ng-shadcn-checkbox-description>You agree to our Terms of Service and Privacy Policy.</ng-shadcn-checkbox-description>
          </ng-shadcn-checkbox>
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
            id="checked-box"
            checked
          >
            <ng-shadcn-checkbox-label>Checked</ng-shadcn-checkbox-label>
          </ng-shadcn-checkbox>
        </div>

        <div class="pt-4 border-t">
          <h3 class="font-medium mb-2">Unchecked</h3>
          <ng-shadcn-checkbox
            id="unchecked-box"
          >
            <ng-shadcn-checkbox-label>Unchecked checkbox</ng-shadcn-checkbox-label>
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
          id="indeterminate-checkbox"
          indeterminate
        >
          <ng-shadcn-checkbox-label>Select all items</ng-shadcn-checkbox-label>
          <ng-shadcn-checkbox-description>Indeterminate state is useful for parent checkboxes that have some but not all children checked</ng-shadcn-checkbox-description>  
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

export const Controlled: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ControlledCheckboxExampleComponent],
    },
    template: `
      <div class="flex justify-center p-6">
        <controlled-checkbox-example></controlled-checkbox-example>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "Fully controlled checkbox with two-way binding and manual state management.",
      },
      source: {
        type: "code",
        language: "typescript",
        code: `
@Component({
  selector: "controlled-checkbox-example",
  standalone: true,
  imports: [
    CommonModule,
    CheckboxComponent,
    CheckboxDescriptionComponent,
    CheckboxLabelComponent,
    ButtonComponent
  ],
  template: \`
  <div class="space-y-6">
        <div class="space-y-2">
          <h3 class="font-medium mb-2">Controlled Checkbox</h3>
          <ng-shadcn-checkbox
            id="controlledCheckboxExample"
            [checked]="checked()"
            [indeterminate]="indeterminateState()"
            (checkedChange)="toggleCheckbox()"
          >
            <ng-shadcn-checkbox-label>Controlled checkbox</ng-shadcn-checkbox-label>
            <ng-shadcn-checkbox-description>State is managed by the parent component</ng-shadcn-checkbox-description>
          </ng-shadcn-checkbox>
          <p class="text-sm text-muted-foreground mt-2">
            Current state: {{ checked() ? 'Checked' : 'Unchecked' }}
          </p>
          <div class="flex gap-2 flex-wrap">
            <ng-shadcn-button
              (click)="toggleCheckbox()"
            >
              Toggle Checked State
            </ng-shadcn-button>
            <ng-shadcn-button
              (click)="toggleCheckboxIndeterminate()"
            >
              Indeterminate
            </ng-shadcn-button>
          </div>
        </div>

        <div class="pt-4 border-t">
          <h3 class="font-medium mb-2">Uncontrolled Checkbox</h3>
          <ng-shadcn-checkbox
            id="ucontrolledCheckboxExample"
          >
            <ng-shadcn-checkbox-label>Uncontrolled checkbox</ng-shadcn-checkbox-label>
            <ng-shadcn-checkbox-description>State is managed internally</ng-shadcn-checkbox-description>
          </ng-shadcn-checkbox>
        </div>
      </div>
    
  \`,
})
export class ControlledCheckboxExampleComponent {
  checked = signal(true);
  indeterminateState = signal(false);
  toggleCheckbox() {
    this.checked.set(!this.checked());
    this.indeterminateState.set(false);
  }
  toggleCheckboxIndeterminate() {
    this.indeterminateState.set(!this.indeterminateState());
  }
}`
     }
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
          <ng-shadcn-checkbox-label>Disabled unchecked</ng-shadcn-checkbox-label>
        </ng-shadcn-checkbox>
        
        <ng-shadcn-checkbox
          [id]="id + '-checked'"
          [checked]="true"
          [disabled]="true"
          [size]="size"
        >
          <ng-shadcn-checkbox-label>Disabled checked</ng-shadcn-checkbox-label>
        </ng-shadcn-checkbox>
        
        <ng-shadcn-checkbox
          [id]="id + '-indeterminate'"
          [indeterminate]="true"
          [disabled]="true"
          [size]="size"
        >
          <ng-shadcn-checkbox-label>Disabled indeterminate</ng-shadcn-checkbox-label>
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
          <ng-shadcn-checkbox-label>Small checkbox</ng-shadcn-checkbox-label>
          <ng-shadcn-checkbox-description>Size: sm</ng-shadcn-checkbox-description>
        </ng-shadcn-checkbox>
        
        <ng-shadcn-checkbox
          [id]="id + '-default'"
          checked
          [disabled]="disabled"
          size="default"
        >
          <ng-shadcn-checkbox-label>Default checkbox</ng-shadcn-checkbox-label>
          <ng-shadcn-checkbox-description>Size: default</ng-shadcn-checkbox-description>
        </ng-shadcn-checkbox>
        
        <ng-shadcn-checkbox
          [id]="id + '-lg'"
          checked
          [disabled]="disabled"
          size="lg"
        >
          <ng-shadcn-checkbox-label>Large checkbox</ng-shadcn-checkbox-label>
          <ng-shadcn-checkbox-description>Size: lg</ng-shadcn-checkbox-description>
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
              <ng-shadcn-checkbox-label>I accept the terms and conditions</ng-shadcn-checkbox-label>
              <ng-shadcn-checkbox-description>Required to continue using our service</ng-shadcn-checkbox-description>
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
              <ng-shadcn-checkbox-label>Email notifications</ng-shadcn-checkbox-label>
              <ng-shadcn-checkbox-description>Receive email notifications about important updates</ng-shadcn-checkbox-description>
            </ng-shadcn-checkbox>
          </div>
  
          <!-- Push Notifications -->
          <div class="space-y-2">
            <ng-shadcn-checkbox 
              formControlName="pushNotifications"
              id="push-notifications"
            >
              <ng-shadcn-checkbox-label>Push notifications</ng-shadcn-checkbox-label>
              <ng-shadcn-checkbox-description>Get push notifications on your device</ng-shadcn-checkbox-description>
            </ng-shadcn-checkbox>
          </div>
  
          <!-- Marketing Emails -->
          <div class="space-y-2">
            <ng-shadcn-checkbox 
              formControlName="marketingEmails"
              id="marketing-emails"
            >
              <ng-shadcn-checkbox-label>Marketing emails</ng-shadcn-checkbox-label>
              <ng-shadcn-checkbox-description>Receive our newsletter and promotional offers</ng-shadcn-checkbox-description>
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

export const CustomCheckbox: Story = {
  args: {},
  render: (args) => ({
    props: {
      ...args,
      checked: signal(false),
    },
    moduleMetadata: {
      imports: [CheckboxComponent, CheckboxIconComponent],
    },
    template: `
      <div class="flex flex-col gap-4">
        <!-- Custom icon checkbox -->
        <div class="flex items-center space-x-2">
          <ng-shadcn-checkbox
            id="checkbox-custom-1"
            checked
            checkedClass="bg-green-500 border-green-500"
            ariaLabel="Custom styled checkbox"
            class="rounded-full"
          >
            <ng-shadcn-checkbox-icon>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="3" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                class="h-full w-full p-px"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </ng-shadcn-checkbox-icon>
            <ng-shadcn-checkbox-label>Custom icon with custom checked state</ng-shadcn-checkbox-label>
            <ng-shadcn-checkbox-description>This checkbox uses a custom checkmark icon and changes to green when checked</ng-shadcn-checkbox-description>
          </ng-shadcn-checkbox>
        </div>
        <!-- Custom icon with different states -->
        <div class="flex items-center space-x-2">
          <ng-shadcn-checkbox
            id="checkbox-custom-2"
            checked
            checkedClass="bg-gradient-to-br from-purple-500 to-pink-500 border-0"
            ariaLabel="Gradient checkbox"
          >
            <ng-shadcn-checkbox-icon class="text-white">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                class="h-full w-full"
              >
                <path d="M20 6 9 17l-5-5"></path>
              </svg>
            </ng-shadcn-checkbox-icon>
            <ng-shadcn-checkbox-label>Gradient background when checked</ng-shadcn-checkbox-label>
          </ng-shadcn-checkbox>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `## Custom Checkbox with Custom Icon and Styles
This example demonstrates how to create a custom checkbox with:
- A custom checkmark icon using \`ng-shadcn-checkbox-icon\`
- Custom styling when checked using the \`checkedClass\` property
- Different visual styles for checked and unchecked states

### Key Features:
- **Custom Icons**: Replace the default checkmark with any SVG or icon
- **Checked State Styling**: Use \`checkedClass\` to apply custom styles when the checkbox is checked
- **Responsive**: Works with the existing size variants and responsive design

### Usage:
\`\`\`html
<ng-shadcn-checkbox [checkedClass]="'bg-green-500 border-green-500'">
  <ng-shadcn-checkbox-icon>
    <!-- Your custom icon SVG here -->
    <svg>...</svg>
  </ng-shadcn-checkbox-icon>
  <ng-shadcn-checkbox-label>Custom checkbox</ng-shadcn-checkbox-label>
</ng-shadcn-checkbox>
\`\`\`

### Customization:
- Use any SVG as the checkmark
- Apply any Tailwind classes via \`checkedClass\` for the checked state
- Combine with other checkbox features like labels and descriptions
        `,
      },
    },
  },
};

import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { SelectComponent } from "./select.component";
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
import { SelectTriggerComponent } from "./select-trigger.component";
import { SelectItemComponent } from "./select-item.component";
import { SelectSearchComponent } from "./select-search.component";
import { ButtonComponent } from "@packages/button/src/public-api";

// Wrapper component for controlled example
@Component({
  selector: "controlled-select-example",
  standalone: true,
  imports: [
    CommonModule,
    SelectComponent,
    SelectTriggerComponent,
    ButtonComponent
  ],
  template: `
  <div class="space-y-6">
        <div class="space-y-2">
          <h3 class="font-medium mb-2">Controlled Select</h3>
          <ng-shadcn-select
            id="controlledSelectExample"
            [options]="options()"
            [(value)]="selectedValue"
            [disabled]="disabled()"
            [searchable]="searchable()"
            (selectionChange)="onSelectionChange($event)"
          >
            <ng-shadcn-select-trigger placeholder="Choose an option..."></ng-shadcn-select-trigger>
          </ng-shadcn-select>
          <p class="text-sm text-muted-foreground mt-2">
            Selected value: {{ selectedValue || 'None' }}
          </p>
          <div class="flex gap-2 flex-wrap">
            <ng-shadcn-button
              (click)="toggleDisabled()"
            >
              {{ disabled() ? 'Enable' : 'Disable' }}
            </ng-shadcn-button>
            <ng-shadcn-button
              (click)="toggleSearchable()"
            >
              {{ searchable() ? 'Disable Search' : 'Enable Search' }}
            </ng-shadcn-button>
            <ng-shadcn-button
              (click)="clearSelection()"
            >
              Clear Selection
            </ng-shadcn-button>
          </div>
        </div>

        <div class="pt-4 border-t">
          <h3 class="font-medium mb-2">Uncontrolled Select</h3>
          <ng-shadcn-select
            id="uncontrolledSelectExample"
            [options]="options()"
          >
            <ng-shadcn-select-trigger placeholder="Choose an option..."></ng-shadcn-select-trigger>
          </ng-shadcn-select>
        </div>
      </div>
    
  `,
})
export class ControlledSelectExampleComponent {
  options = signal([
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'nextjs', label: 'Next.js' }
  ]);
  
  selectedValue = signal<string | null>(null);
  disabled = signal(false);
  searchable = signal(false);

  toggleDisabled() {
    this.disabled.set(!this.disabled());
  }

  toggleSearchable() {
    this.searchable.set(!this.searchable());
  }

  clearSelection() {
    this.selectedValue.set(null);
  }

  onSelectionChange(option: any) {
    console.log('Selection changed:', option);
  }
}

// Wrapper component for reactive form example
@Component({
  selector: "reactive-form-example",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectComponent,
    SelectTriggerComponent,
    AlertComponent,
    AlertContentComponent,
  ],
  template: `
    <form
      [formGroup]="form"
      (ngSubmit)="onSubmit()"
      class="space-y-4 p-6 border rounded-lg max-w-md"
    >
      <h2 class="text-xl font-semibold mb-2">User Preferences</h2>
      <p class="text-muted-foreground text-sm mb-6">
        Select your preferred framework and experience level
      </p>

      <div class="space-y-6">
        <!-- Framework Selection -->
        <div class="space-y-2">
          <label class="text-sm font-medium">Preferred Framework</label>
          <ng-shadcn-select
            formControlName="framework"
            id="framework-select"
            [options]="frameworkOptions"
          >
            <ng-shadcn-select-trigger placeholder="Select a framework..."></ng-shadcn-select-trigger>
          </ng-shadcn-select>

          @if (
            form.get("framework")?.touched &&
            form.get("framework")?.errors?.["required"]
          ) {
            <div class="text-sm text-destructive mt-1">
              Please select a framework
            </div>
          }
        </div>

        <!-- Experience Level -->
        <div class="space-y-2">
          <label class="text-sm font-medium">Experience Level</label>
          <ng-shadcn-select
            formControlName="experience"
            id="experience-select"
            [options]="experienceOptions"
          >
            <ng-shadcn-select-trigger placeholder="Select experience level..."></ng-shadcn-select-trigger>
          </ng-shadcn-select>
        </div>

        <!-- Project Type with Search -->
        <div class="space-y-2">
          <label class="text-sm font-medium">Project Type</label>
          <ng-shadcn-select
            formControlName="projectType"
            id="project-select"
            [options]="projectOptions"
            [searchable]="true"
          >
            <ng-shadcn-select-trigger placeholder="Search and select project type..."></ng-shadcn-select-trigger>
          </ng-shadcn-select>
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
                  : "Please complete all required fields"
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

  frameworkOptions = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'nextjs', label: 'Next.js' }
  ];

  experienceOptions = [
    { value: 'beginner', label: 'Beginner (0-1 years)' },
    { value: 'intermediate', label: 'Intermediate (1-3 years)' },
    { value: 'advanced', label: 'Advanced (3-5 years)' },
    { value: 'expert', label: 'Expert (5+ years)' }
  ];

  projectOptions = [
    { value: 'web-app', label: 'Web Application' },
    { value: 'mobile-app', label: 'Mobile Application' },
    { value: 'desktop-app', label: 'Desktop Application' },
    { value: 'api', label: 'API/Backend Service' },
    { value: 'library', label: 'Component Library' },
    { value: 'tool', label: 'Development Tool' },
    { value: 'prototype', label: 'Prototype/MVP' },
    { value: 'enterprise', label: 'Enterprise Solution' }
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      framework: ['', Validators.required],
      experience: ['intermediate'],
      projectType: ['web-app'],
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
      framework: '',
      experience: 'intermediate',
      projectType: 'web-app',
    });
    this.formSubmitted = false;
  }
}

const meta: Meta<SelectComponent> = {
  title: 'Components/Select',
  component: SelectComponent,
  render: (args) => {
    return {
      props: {
        ...args,
      },
      template: `
        <ng-shadcn-select
          [id]="id"
          [options]="options"
          [disabled]="disabled"
          [searchable]="searchable"
          [searchPlaceholder]="searchPlaceholder"
          [searchClass]="searchClass"
          [class]="class"
          [(value)]="value"
          (selectionChange)="handleSelectionChange($event)"
        >
          <ng-shadcn-select-trigger [placeholder]="placeholder"></ng-shadcn-select-trigger>
        </ng-shadcn-select>
      `
    };
  },
  decorators: [
    moduleMetadata({
      imports: [SelectComponent, SelectTriggerComponent, SelectItemComponent, SelectSearchComponent, ReactiveFormsModule],
    }),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `A customizable select component that displays a list of options for the user to pick from—triggered by a button.
## Installation

\`\`\`bash
# Using npm
npm install @ng-shadcn/select
# Using yarn
yarn add @ng-shadcn/select
# Using pnpm
pnpm add @ng-shadcn/select
\`\`\`

## Usage
### Standalone Components (Recommended)
Import and use the component directly in your standalone components:

\`\`\`typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from '@ng-shadcn/select';
import { SelectTriggerComponent } from './select-trigger.component';
import { SelectItemComponent } from './select-item.component';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, SelectComponent, SelectTriggerComponent, SelectItemComponent],
  template: \`
    <div class="space-y-4">
      <ng-shadcn-select [options]="frameworks" [(value)]="selectedFramework">
        <ng-shadcn-select-trigger placeholder="Select a framework..."></ng-shadcn-select-trigger>
      </ng-shadcn-select>
    </div>
  \`
})
export class ExampleComponent {
  frameworks = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' }
  ];
  
  selectedFramework = signal<string | null>(null);
}
\`\`\`

### Using NgModule (Legacy)
If you're using NgModules, import the \`SelectModule\`:

\`\`\`typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from '@ng-shadcn/select';
import { SelectTriggerComponent } from './select-trigger.component';
import { SelectItemComponent } from './select-item.component';
import { SelectSearchComponent } from './select-search.component';

@NgModule({
  declarations: [YourComponent],
  imports: [
    CommonModule,
    SelectModule,
    SelectTriggerComponent,
    SelectItemComponent,
    SelectSearchComponent,
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
import { SelectComponent } from '@ng-shadcn/select';
import { SelectTriggerComponent } from './select-trigger.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SelectComponent, SelectTriggerComponent],
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <ng-shadcn-select formControlName="framework" [options]="frameworks">
        <ng-shadcn-select-trigger placeholder="Select framework..."></ng-shadcn-select-trigger>
      </ng-shadcn-select>
      
      <button type="submit" [disabled]="form.invalid">Submit</button>
    </form>
  \`
})
export class SettingsComponent implements OnInit {
  form: FormGroup;
  frameworks = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      framework: ['', Validators.required]
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
- **Searchable**: Built-in search functionality for large option lists
- **Keyboard Navigation**: Full keyboard navigation support (Arrow keys, Enter, Escape)
- **Accessible**: Follows WAI-ARIA design patterns for select components
- **Customizable**: Supports custom styling through Tailwind CSS
- **Disabled State**: Supports disabled state with proper ARIA attributes
- **Sizes**: Multiple size variants (sm, default, lg)
- **TypeScript Support**: Fully typed API with strict type checking
- **RTL Support**: Right-to-left layout support
- **High Contrast**: Optimized for high contrast mode
- **Form Integration**: Works with both template-driven and reactive forms
- **No External Dependencies**: Lightweight with no external dependencies
- **Server-Side Rendering**: Compatible with Angular Universal
- **Animations**: Smooth transitions for state changes
- **Custom Options**: Support for custom option components
- **Form Validation**: Built-in support for form validation
- **Error States**: Visual feedback for error states
- **Theming**: Supports theming through CSS variables
- **Responsive**: Works on all screen sizes
- **Performance**: Optimized for performance with OnPush change detection
- **Tested**: Comprehensive test coverage
- **Documented**: Complete API documentation and examples`,
      },
      extractComponentDescription: (component: any) => {
        if (component === SelectComponent) {
          return 'A customizable select component that displays a dropdown list of options. Supports search functionality, form integration, and keyboard navigation.';
        }
        return null;
      },
    },
  },
  tags: ['autodocs', 'form-control', 'ui'],
  argTypes: {
    options: {
      control: "object",
      description: "Array of select options with value, label, and optional disabled property",
      table:{
        defaultValue: { summary: '[]' },
        type: {
          summary: '{label: string, value: string, disabled: boolean}[]',
        },
      }
    },
    disabled: {
      control: "boolean",
      description: "Whether the select is disabled",
      table:{
        name: 'disabled',
        defaultValue: { summary: 'false' },
        type: {
          summary: 'true | false',
        },
        category: 'inputs'
      }
    },
    searchable: {
      control: "boolean",
      description: "Whether the select is searchable",
      table:{
        defaultValue: { summary: 'false' },
        type: {
          summary: 'true | false',
        },
      }
    },
    searchPlaceholder: {
      control: "text",
      description: "Placeholder text for the search input",
      table:{
        defaultValue: { summary: 'Search...' },
        type: {
          summary: 'string',
        },
      }
    },
    id: {
      control: "text",
      description: "ID for the select component",
      table:{
        defaultValue: { summary: 'sel-<random>' },
        type: {
          summary: 'string',
        },
      }
    },
    value: {
      control: "text",
      description: "Current selected value",
      table:{
        type: {
          summary: 'string | null',
        },
        category: 'inputs'
      }
    },
    optionBoxClass: {
      control: "text",
      description: "Custom class for the select options container",
      table:{
        defaultValue: { summary: '' },
        type: {
          summary: 'string',
        },
      }
    },
    searchClass: {
      control: "text",
      description: "Custom class for the search input",
      table:{
        defaultValue: { summary: '' },
        type: {
          summary: 'string',
        },
      }
    },

    
    
  },
  subcomponents: {
    SelectTriggerComponent,
    SelectItemComponent,
  },
  args: {
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue.js' },
      { value: 'angular', label: 'Angular' },
      { value: 'svelte', label: 'Svelte' },
      { value: 'nextjs', label: 'Next.js' }
    ],
    id: "select-default",
    value: null,
    disabled: false,
    searchable: false,
    optionBoxClass: '',
    searchClass: '',
    searchPlaceholder: 'Search Placeholder'

  },
};

export default meta;
type Story = StoryObj<SelectComponent>;

export const Default: Story = {
  render: (args) => {
    const selectedValue = signal(args.value || null);
    return {
      props: {
        ...args,
        selectedValue,
        id: "select-default",
        onSelectionChange: (option: any) => {
          selectedValue.set(option?.value || null);
        }
      },
      template: `
        <div class="flex flex-col gap-4 w-64">
        <div class="mx-auto w-full" >
          <ng-shadcn-select
              [id]="id"
              [options]="options"
              [disabled]="disabled"
              [searchable]="searchable"
              [searchClass]="searchClass"
              [class]="class"
              [(value)]="selectedValue"
              (selectionChange)="onSelectionChange($event)"
            >
              <ng-shadcn-select-trigger [placeholder]="searchPlaceholder"></ng-shadcn-select-trigger>
            </ng-shadcn-select>
        </div>

          
          <div class="text-sm text-muted-foreground">
            <p>Selected: {{ selectedValue() || 'None' }}</p>
            <p>Disabled: {{ controlledDisabled ? 'Yes' : 'No' }}</p>
            <p>Searchable: {{ searchable ? 'Yes' : 'No' }}</p>
          </div>
        </div>
      `,
    };
  },
};

export const WithLabel: Story = {
  args: {
    id: "select-with-label",
  },
  render: (args) => ({
    props: {
      ...args,
      optionsWithDisabled: [
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue.js', disabled: true },
        { value: 'angular', label: 'Angular' },
        { value: 'svelte', label: 'Svelte', disabled: true },
        { value: 'nextjs', label: 'Next.js' }
      ]
    },
    template: `
      <div class="space-y-4 w-64">
      
        <div>
          <h3 class="font-medium mb-2">With placeholder</h3>
          <ng-shadcn-select [options]="options" id="select-with-placeholder">
            <ng-shadcn-select-trigger placeholder="Choose your framework..."></ng-shadcn-select-trigger>
          </ng-shadcn-select>
        </div>
        
        <div>
          <h3 class="font-medium mb-2">Pre-selected value</h3>
          <ng-shadcn-select [options]="options" value="react" id="select-preselected">
            <ng-shadcn-select-trigger placeholder="Choose your framework..."></ng-shadcn-select-trigger>
          </ng-shadcn-select>
        </div>
        
        <div>
          <h3 class="font-medium mb-2">Disabled options</h3>
          <ng-shadcn-select [options]="optionsWithDisabled" id="select-disabled-options">
            <ng-shadcn-select-trigger placeholder="Choose an option..."></ng-shadcn-select-trigger>
          </ng-shadcn-select>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "Select component with different label configurations and disabled options.",
      },
    },
  },
};

export const Controlled: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ControlledSelectExampleComponent],
    },
    template: `
      <div class="flex justify-center p-6">
        <controlled-select-example></controlled-select-example>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "Fully controlled select with two-way binding and manual state management.",
      },
      source: {
        type: "code",
        language: "typescript",
        code: `
@Component({
  selector: "controlled-select-example",
  standalone: true,
  imports: [
    CommonModule,
    SelectComponent,
    SelectTriggerComponent,
    SelectItemComponent,
    ButtonComponent
  ],
  template: \`
  <div class="space-y-6">
        <div class="space-y-2">
          <h3 class="font-medium mb-2">Controlled Select</h3>
          <ng-shadcn-select
            id="controlledSelectExample"
            [options]="options()"
            [(value)]="selectedValue"
            [disabled]="disabled()"
            [searchable]="searchable()"
            (selectionChange)="onSelectionChange($event)"
          >
            <ng-shadcn-select-trigger placeholder="Choose an option..."></ng-shadcn-select-trigger>
          </ng-shadcn-select>
          <p class="text-sm text-muted-foreground mt-2">
            Selected value: {{ selectedValue || 'None' }}
          </p>
          <div class="flex gap-2 flex-wrap">
            <ng-shadcn-button
              (click)="toggleDisabled()"
            >
              {{ disabled() ? 'Enable' : 'Disable' }}
            </ng-shadcn-button>
            <ng-shadcn-button
              (click)="toggleSearchable()"
            >
              {{ searchable() ? 'Disable Search' : 'Enable Search' }}
            </ng-shadcn-button>
            <ng-shadcn-button
              (click)="clearSelection()"
            >
              Clear Selection
            </ng-shadcn-button>
          </div>
        </div>

        <div class="pt-4 border-t">
          <h3 class="font-medium mb-2">Uncontrolled Select</h3>
          <ng-shadcn-select
            id="uncontrolledSelectExample"
            [options]="options()"
          >
            <ng-shadcn-select-trigger placeholder="Choose an option..."></ng-shadcn-select-trigger>
          </ng-shadcn-select>
        </div>
      </div>
    
  \`,
})
export class ControlledSelectExampleComponent {
  options = signal([
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'nextjs', label: 'Next.js' }
  ]);
  
  selectedValue = signal<string | null>(null);
  disabled = signal(false);
  searchable = signal(false);

  toggleDisabled() {
    this.disabled.set(!this.disabled());
  }

  toggleSearchable() {
    this.searchable.set(!this.searchable());
  }

  clearSelection() {
    this.selectedValue.set(null);
  }

  onSelectionChange(option: any) {
    console.log('Selection changed:', option);
  }
}`
     }
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    id: "select-disabled",
  },
  render: (args) => ({
    props: {
      ...args,
      optionsWithDisabled: [
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue.js', disabled: true },
        { value: 'angular', label: 'Angular' },
        { value: 'svelte', label: 'Svelte', disabled: true },
        { value: 'nextjs', label: 'Next.js' }
      ]
    },
    template: `
      <div class="grid grid-cols-1 gap-4 w-64">
        <ng-shadcn-select
          [id]="id"
          [options]="options"
          [disabled]="true"
        >
          <ng-shadcn-select-trigger placeholder="Disabled select"></ng-shadcn-select-trigger>
        </ng-shadcn-select>
        
        <ng-shadcn-select
          [id]="id + '-with-value'"
          [options]="options"
          [disabled]="true"
          value="react"
        >
          <ng-shadcn-select-trigger placeholder="Disabled with value"></ng-shadcn-select-trigger>
        </ng-shadcn-select>
        
        <ng-shadcn-select
          [id]="id + '-disabled-options'"
          [options]="optionsWithDisabled"
        >
          <ng-shadcn-select-trigger placeholder="With disabled options"></ng-shadcn-select-trigger>
        </ng-shadcn-select>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "Select component in disabled state and with disabled options.",
      },
    },
  },
};

export const Sizes: Story = {
  args: {
    id: "select-sizes",
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="grid grid-cols-1 gap-4 w-64">
        <div>
          <h3 class="font-medium mb-2 text-sm">Small select</h3>
          <ng-shadcn-select
            [id]="id + '-sm'"
            [options]="options"
            value="react"
          >
            <ng-shadcn-select-trigger placeholder="Small select" size="sm"></ng-shadcn-select-trigger>
          </ng-shadcn-select>
        </div>
        
        <div>
          <h3 class="font-medium mb-2 text-sm">Default select</h3>
          <ng-shadcn-select
            [id]="id + '-default'"
            [options]="options"
            value="react"
          >
            <ng-shadcn-select-trigger placeholder="Default select" size="default"></ng-shadcn-select-trigger>
          </ng-shadcn-select>
        </div>
        
        <div>
          <h3 class="font-medium mb-2 text-sm">Large select</h3>
          <ng-shadcn-select
            [id]="id + '-lg'"
            [options]="options"
            value="react"
          >
            <ng-shadcn-select-trigger placeholder="Large select" size="lg"></ng-shadcn-select-trigger>
          </ng-shadcn-select>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "Select component in different sizes: sm, default, and lg.",
      },
    },
  },
};

export const Searchable: Story = {
  args: {
    searchable: true,
    id: "select-searchable",
  },
  render: (args) => ({
    props: {
      ...args,
      largeOptions: [
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue.js' },
        { value: 'angular', label: 'Angular' },
        { value: 'svelte', label: 'Svelte' },
        { value: 'nextjs', label: 'Next.js' },
        { value: 'nuxt', label: 'Nuxt.js' },
        { value: 'gatsby', label: 'Gatsby' },
        { value: 'remix', label: 'Remix' },
        { value: 'solid', label: 'SolidJS' },
        { value: 'qwik', label: 'Qwik' },
        { value: 'alpine', label: 'Alpine.js' },
        { value: 'lit', label: 'Lit' },
        { value: 'preact', label: 'Preact' },
        { value: 'ember', label: 'Ember.js' },
        { value: 'backbone', label: 'Backbone.js' }
      ]
    },
    template: `
      <div class="space-y-4 w-64">
        <div>
          <h3 class="font-medium mb-2">Searchable select</h3>
          <ng-shadcn-select
            [id]="id"
            [options]="largeOptions"
            [searchable]="true"
            searchPlaceholder="Search frameworks..."
          >
            <ng-shadcn-select-trigger placeholder="Search and select..."></ng-shadcn-select-trigger>
          </ng-shadcn-select>
        </div>
        
        <div>
          <h3 class="font-medium mb-2">With custom search class</h3>
          <ng-shadcn-select
            [id]="id + '-custom'"
            [options]="largeOptions"
            [searchable]="true"
            searchPlaceholder="Type to filter..."
            searchClass="border-blue-500 focus:border-blue-600"
          >
            <ng-shadcn-select-trigger placeholder="Custom search style..."></ng-shadcn-select-trigger>
          </ng-shadcn-select>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "Select component with search functionality for filtering large option lists.",
      },
    },
  },
};

@Component({
  selector: "customized-select-example",
  standalone: true,
  imports: [
    CommonModule,
    SelectComponent,
    SelectTriggerComponent,
    SelectItemComponent,
  ],
  template: `
    <div class="space-y-6 w-80">
      <div>
        <h3 class="font-medium mb-4 text-lg bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Custom Styled Select
        </h3>
        <p class="text-sm text-muted-foreground mb-4">
          A modern select with custom trigger and individual items
        </p>
        
        <ng-shadcn-select 
          id="custom-select"
          optionBoxClass="border-2 border-purple-200 rounded-xl shadow-lg"
          [(value)]="selectedValue"
        >
          <ng-shadcn-select-trigger 
            asChild="true"
            class="w-full"
          >
            @if(selectedValue()){
            <div tabindex="0" 
              role="button" 
              class="relative w-full inline-block p-0.75 rounded-lg bg-linear-to-r from-purple-500 to-pink-500 shadow-lg cursor-pointer"
            >
              <div class="w-full bg-background/70 rounded-lg px-4 overflow-hidden" [innerHTML]="labels[selectedValue()!]"></div>
            </div>
            }@else{
              <button 
                class="w-full flex items-center justify-between px-4 py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span class="font-medium">Choose your creative framework</span>
                <svg 
                  class="ml-2 h-5 w-5 transition-transform duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M19 9l-7 7-7-7 7" 
                  />
                </svg>
              </button>
            }
          </ng-shadcn-select-trigger>
          
          <ng-shadcn-select-item 
            value="header"
            label="Popular Frameworks"
            class="px-4 py-1 text-sm font-semibold text-purple-600 bg-purple-50 border-b border-purple-100 cursor-default"
            disabled="true"
          >
          </ng-shadcn-select-item>
          
          <ng-shadcn-select-item 
            value="react"
            [label]="labels.react"
            class="group px-4 py-3 hover:bg-linear-to-r hover:from-blue-50 hover:to-cyan-50 transition-all duration-200"
          >
          </ng-shadcn-select-item>
          
          <ng-shadcn-select-item 
            value="vue"
            [label]="labels.vue"
            class="group px-4 py-3 hover:bg-linear-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200"
          >
          </ng-shadcn-select-item>
          
          <ng-shadcn-select-item 
            value="angular"
            [label]="labels.angular"
            class="group px-4 py-3 hover:bg-linear-to-r hover:from-red-50 hover:to-rose-50 transition-all duration-200"
          >
          </ng-shadcn-select-item>
          
          <ng-shadcn-select-item 
            value="svelte"
            [label]="labels.svelte"
            class="group px-4 py-3 hover:bg-linear-to-r hover:from-orange-50 hover:to-amber-50 transition-all duration-200"
          >
          </ng-shadcn-select-item>
          
          <ng-shadcn-select-item 
            value="nextjs"
            [label]="labels.nextjs"
            class="group px-4 py-3 hover:bg-linear-to-r hover:from-gray-50 hover:to-slate-50 transition-all duration-200"
          >
          </ng-shadcn-select-item>
          
          <ng-shadcn-select-item 
            value="other"
            label="+ 20 more frameworks available"
            class="px-4 py-3 text-sm text-gray-500 text-center border-t border-gray-100 cursor-default"
            disabled="true"
          >
          </ng-shadcn-select-item>
        </ng-shadcn-select>
      </div>
      
      <div class="mt-6 p-4 bg-linear-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
        <h4 class="font-medium text-purple-900 mb-2">Current Selection:</h4>
        <p class="text-sm text-purple-700">{{ selectedValue() ? selectedValue() : 'No framework selected' }}</p>
      </div>
    </div>
  `,
})
export class CustomizedSelectExampleComponent {
  selectedValue = signal('');
  
  labels = {
    react: `
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
          R
        </div>
        <div>
          <div class="font-medium text-gray-900 group-hover:text-blue-600">React</div>
          <div class="text-xs text-gray-500">Component library</div>
        </div>
      </div>
    `,
    vue: `
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-linear-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
          V
        </div>
        <div>
          <div class="font-medium text-gray-900 group-hover:text-green-600">Vue.js</div>
          <div class="text-xs text-gray-500">Progressive framework</div>
        </div>
      </div>
    `,
    angular: `
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-linear-to-br from-red-500 to-rose-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
          A
        </div>
        <div>
          <div class="font-medium text-gray-900 group-hover:text-red-600">Angular</div>
          <div class="text-xs text-gray-500">Full-featured framework</div>
        </div>
      </div>
    `,
    svelte: `
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-linear-to-br from-orange-400 to-amber-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
          S
        </div>
        <div>
          <div class="font-medium text-gray-900 group-hover:text-orange-600">Svelte</div>
          <div class="text-xs text-gray-500">Compiler & framework</div>
        </div>
      </div>
    `,
    nextjs: `
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-linear-to-br from-gray-700 to-slate-900 rounded-lg flex items-center justify-center text-white text-xs font-bold">
          N
        </div>
        <div>
          <div class="font-medium text-gray-900 group-hover:text-gray-700">Next.js</div>
          <div class="text-xs text-gray-500">React framework</div>
        </div>
      </div>
    `,
  };
}

export const Customized: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [CustomizedSelectExampleComponent],
    },
    template: `
      <div class="flex justify-center p-6">
        <customized-select-example></customized-select-example>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `A highly customized select component featuring:
- **Custom Trigger**: Uses \`asChild="true"\` to render a completely custom button with gradient styling
- **Individual Items**: Custom select items with rich content including icons, descriptions, and hover effects
- **Modern Design**: Gradient backgrounds, smooth transitions, and micro-interactions
- **Structured Layout**: Header, categorized items, and footer sections
- **Accessibility**: Maintains proper ARIA attributes and keyboard navigation
- **Responsive**: Works across all screen sizes with consistent spacing

This example demonstrates the full flexibility of the select component when you need complete control over appearance and behavior.`,
      },
      source: {
        type: "code",
        language: "typescript",
        code: `
@Component({
  selector: "customized-select-example",
  standalone: true,
  imports: [
    CommonModule,
    SelectComponent,
    SelectTriggerComponent,
    SelectItemComponent,
  ],
  template: \`
    <div class="space-y-6 w-80">
      <div>
        <h3 class="font-medium mb-4 text-lg bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Custom Styled Select
        </h3>
        <p class="text-sm text-muted-foreground mb-4">
          A modern select with custom trigger and individual items
        </p>
        
        <ng-shadcn-select 
          id="custom-select"
          optionBoxClass="border-2 border-purple-200 rounded-xl shadow-lg"
          [(value)]="selectedValue"
        >
          <ng-shadcn-select-trigger 
            asChild="true"
            class="w-full"
          >
            @if(selectedValue()){
              <div tabindex="0" 
                role="button" 
                class="relative w-full inline-block p-0.75 rounded-lg bg-linear-to-r from-purple-500 to-pink-500 shadow-lg cursor-pointer"
              >
                <div class="w-full bg-background/70 rounded-lg px-4 overflow-hidden" [innerHTML]="labels[selectedValue()!]"></div>
              </div>
            }@else{
              <button 
                class="w-full flex items-center justify-between px-4 py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span class="font-medium">Choose your creative framework</span>
                <svg 
                  class="ml-2 h-5 w-5 transition-transform duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M19 9l-7 7-7-7 7" 
                  />
                </svg>
              </button>
            }
          </ng-shadcn-select-trigger>
          
          <ng-shadcn-select-item 
            value="header"
            label="Popular Frameworks"
            class="px-4 py-1 text-sm font-semibold text-purple-600 bg-purple-50 border-b border-purple-100 cursor-default"
            disabled="true"
          >
          </ng-shadcn-select-item>
          
          <ng-shadcn-select-item 
            value="react"
            [label]="labels.react"
            class="group px-4 py-3 hover:bg-linear-to-r hover:from-blue-50 hover:to-cyan-50 transition-all duration-200"
          >
          </ng-shadcn-select-item>
          
          <ng-shadcn-select-item 
            value="vue"
            [label]="labels.vue"
            class="group px-4 py-3 hover:bg-linear-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200"
          >
          </ng-shadcn-select-item>
          
          <ng-shadcn-select-item 
            value="angular"
            [label]="labels.angular"
            class="group px-4 py-3 hover:bg-linear-to-r hover:from-red-50 hover:to-rose-50 transition-all duration-200"
          >
          </ng-shadcn-select-item>
          
          <ng-shadcn-select-item 
            value="svelte"
            [label]="labels.svelte"
            class="group px-4 py-3 hover:bg-linear-to-r hover:from-orange-50 hover:to-amber-50 transition-all duration-200"
          >
          </ng-shadcn-select-item>
          
          <ng-shadcn-select-item 
            value="nextjs"
            [label]="labels.nextjs"
            class="group px-4 py-3 hover:bg-linear-to-r hover:from-gray-50 hover:to-slate-50 transition-all duration-200"
          >
          </ng-shadcn-select-item>
          
          <ng-shadcn-select-item 
            value="other"
            label="+ 20 more frameworks available"
            class="px-4 py-3 text-sm text-gray-500 text-center border-t border-gray-100 cursor-default"
            disabled="true"
          >
          </ng-shadcn-select-item>
        </ng-shadcn-select>
      </div>
      
      <div class="mt-6 p-4 bg-linear-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
        <h4 class="font-medium text-purple-900 mb-2">Current Selection:</h4>
        <p class="text-sm text-purple-700">{{ selectedValue() ? selectedValue() : 'No framework selected' }}</p>
      </div>
    </div>
  \`,
})
export class CustomizedSelectExampleComponent {
  selectedValue = signal('');
  
  labels = {
    react: \`
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
          R
        </div>
        <div>
          <div class="font-medium text-gray-900 group-hover:text-blue-600">React</div>
          <div class="text-xs text-gray-500">Component library</div>
        </div>
      </div>
    \`,
    vue: \`
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-linear-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
          V
        </div>
        <div>
          <div class="font-medium text-gray-900 group-hover:text-green-600">Vue.js</div>
          <div class="text-xs text-gray-500">Progressive framework</div>
        </div>
      </div>
    \`,
    angular: \`
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-linear-to-br from-red-500 to-rose-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
          A
        </div>
        <div>
          <div class="font-medium text-gray-900 group-hover:text-red-600">Angular</div>
          <div class="text-xs text-gray-500">Full-featured framework</div>
        </div>
      </div>
    \`,
    svelte: \`
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-linear-to-br from-orange-400 to-amber-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
          S
        </div>
        <div>
          <div class="font-medium text-gray-900 group-hover:text-orange-600">Svelte</div>
          <div class="text-xs text-gray-500">Compiler & framework</div>
        </div>
      </div>
    \`,
    nextjs: \`
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-linear-to-br from-gray-700 to-slate-900 rounded-lg flex items-center justify-center text-white text-xs font-bold">
          N
        </div>
        <div>
          <div class="font-medium text-gray-900 group-hover:text-gray-700">Next.js</div>
          <div class="text-xs text-gray-500">React framework</div>
        </div>
      </div>
    \`,
  };
}`
     }
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
        story: `Example of using select components in a reactive form with validation. This example includes:
- Required field validation for framework selection
- Form submission handling with validation feedback
- Reset functionality
- Visual feedback for form state
- Error messages for invalid fields
- Searchable select for project type

Try submitting the form without selecting a framework to see the validation in action.`,
      },
      source: {
        type: "code",
        language: "typescript",
        code: `
@Component({
  selector: "reactive-form-example",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectComponent,
    SelectTriggerComponent,
    SelectItemComponent,
    AlertComponent,
    AlertContentComponent,
  ],
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4 p-6 border rounded-lg max-w-md">
      <h2 class="text-xl font-semibold mb-2">User Preferences</h2>
      <p class="text-muted-foreground text-sm mb-6">Select your preferred framework and experience level</p>
      
      <div class="space-y-6">
        <!-- Framework Selection -->
        <div class="space-y-2">
          <label class="text-sm font-medium">Preferred Framework</label>
          <ng-shadcn-select
            formControlName="framework"
            id="framework-select"
            [options]="frameworkOptions"
          >
            <ng-shadcn-select-trigger placeholder="Select a framework..."></ng-shadcn-select-trigger>
          </ng-shadcn-select>
          
          @if (form.get('framework')?.touched && form.get('framework')?.errors?.['required']) {
            <div class="text-sm text-destructive mt-1">
              Please select a framework
            </div>
          }
        </div>
  
        <!-- Experience Level -->
        <div class="space-y-2">
          <label class="text-sm font-medium">Experience Level</label>
          <ng-shadcn-select
            formControlName="experience"
            id="experience-select"
            [options]="experienceOptions"
          >
            <ng-shadcn-select-trigger placeholder="Select experience level..."></ng-shadcn-select-trigger>
          </ng-shadcn-select>
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
      </div>
    </form>
  \`,
})
export class ReactiveFormExampleComponent implements OnInit {
  form: FormGroup;
  formSubmitted = false;

  frameworkOptions = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'nextjs', label: 'Next.js' }
  ];

  experienceOptions = [
    { value: 'beginner', label: 'Beginner (0-1 years)' },
    { value: 'intermediate', label: 'Intermediate (1-3 years)' },
    { value: 'advanced', label: 'Advanced (3-5 years)' },
    { value: 'expert', label: 'Expert (5+ years)' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      framework: ['', Validators.required],
      experience: ['intermediate'],
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.form.valid) {
      console.log("Form submitted:", this.form.value);
    } else {
      Object.values(this.form.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  resetForm() {
    this.form.reset({
      framework: '',
      experience: 'intermediate',
    });
    this.formSubmitted = false;
  }
}`
     }
    },
  },
};

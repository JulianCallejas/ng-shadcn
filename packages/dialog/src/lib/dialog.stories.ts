import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { DialogComponent } from "./dialog.component";
import { DialogTriggerComponent } from "./dialog-trigger.component";
import { DialogCloseComponent } from "./dialog-close.component";
import { DialogHeaderComponent } from "./dialog-header.component";
import { DialogTitleComponent } from "./dialog-title.component";
import { DialogDescriptionComponent } from "./dialog-description.component";
import { DialogContentComponent } from "./dialog-content.component";
import { DialogFooterComponent } from "./dialog-footer.component";
import { ButtonComponent } from "@packages/button/src/public-api";
import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";


// Wrapper component for controlled dialog example
@Component({
  selector: "controlled-dialog-example",
  standalone: true,
  imports: [
    CommonModule,
    DialogComponent,
    DialogTriggerComponent,
    DialogCloseComponent,
    DialogHeaderComponent,
    DialogTitleComponent,
    DialogContentComponent,
    DialogFooterComponent,
    ButtonComponent
  ],
  template: `
    <div class="space-y-4">
      <h3 class="font-medium mb-2">Controlled Dialog</h3>
      <div class="flex gap-4 flex-wrap">
        <ng-shadcn-button (click)="handleOpen()">Controlled Button</ng-shadcn-button>
        
        <ng-shadcn-dialog [isOpen]="isOpen()" (opened)="openListener()" (closed)="closeListener()">
          <ng-shadcn-dialog-trigger>
            Uncontrolled Trigger
          </ng-shadcn-dialog-trigger>
          <ng-shadcn-dialog-content>
            <ng-shadcn-dialog-header>
              <ng-shadcn-dialog-title>Controlled Dialog</ng-shadcn-dialog-title>
            </ng-shadcn-dialog-header>
          <p>This dialog is controlled by the parent component.</p>
          <p class="mt-2">Current state: {{ isOpen ? 'Open' : 'Closed' }}</p>
          <ng-shadcn-dialog-footer>
            <ng-shadcn-button variant="default" (click)="handleClose()">Controlled Close</ng-shadcn-button>
            <ng-shadcn-dialog-close>Uncontrolled Close</ng-shadcn-dialog-close>
          </ng-shadcn-dialog-footer>
        </ng-shadcn-dialog-content>
      </ng-shadcn-dialog>
      </div>
      Current state: {{ isOpen() }}
    </div>
  `
})
export class ControlledDialogExampleComponent {
  isOpen = signal(false);
  handleOpen() {
    if (this.isOpen()) return;
    this.isOpen.set(true);
    console.log('Controlled open action')
  }
  handleClose() {
    if (!this.isOpen()) return;
    this.isOpen.set(false);
    console.log('Controlled close action')
  }
  openListener(){
    console.log('Dialog is open')
    this.isOpen.set(true)
  }
  closeListener(){
    console.log('Dialog is close')
    this.isOpen.set(false)
  }
}


// Wrapper component for custom close button example
@Component({
  selector: "custom-close-button-example",
  standalone: true,
  imports: [
    CommonModule,
    DialogComponent,
    DialogTriggerComponent,
    DialogCloseComponent,
    DialogHeaderComponent,
    DialogTitleComponent,
    DialogContentComponent,
    DialogFooterComponent,
    ButtonComponent
  ],
  template: `
    <ng-shadcn-dialog showCloseButton="false" backdropClick="false">
      <ng-shadcn-dialog-trigger asChild>
        <ng-shadcn-button variant="destructive" class="rounded-full">Custom Open Trigger</ng-shadcn-button>
      </ng-shadcn-dialog-trigger>
      
      <ng-shadcn-dialog-content>
        <ng-shadcn-dialog-header>
          <ng-shadcn-dialog-title>Custom Close Button</ng-shadcn-dialog-title>
        </ng-shadcn-dialog-header>
        
        <div class="py-4">
          <p>This dialog has a custom close button in the footer instead of the default one.</p>
        </div>
        
        <ng-shadcn-dialog-footer>
          <ng-shadcn-dialog-close asChild>
            <ng-shadcn-button variant="outline" class="hover:scale-105 transition rounded-full">Custom Close Button</ng-shadcn-button>
          </ng-shadcn-dialog-close>
        </ng-shadcn-dialog-footer>
      </ng-shadcn-dialog-content>
    </ng-shadcn-dialog>
  `
})
export class CustomCloseButtonExampleComponent {}

// Wrapper component for different sizes example
@Component({
  selector: "sizes-example",
  standalone: true,
  imports: [
    CommonModule,
    DialogComponent,
    DialogTriggerComponent,
    DialogHeaderComponent,
    DialogTitleComponent,
    DialogContentComponent,
    ButtonComponent
  ],
  template: `
    <div class="space-y-4">
      <h3 class="font-medium mb-2">Dialog Sizes</h3>
      
      <div class="flex gap-2 flex-wrap">
        <ng-shadcn-dialog size="sm">
          <ng-shadcn-dialog-trigger asChild>
            <ng-shadcn-button>Small (sm)</ng-shadcn-button>
          </ng-shadcn-dialog-trigger>
          <ng-shadcn-dialog-content>
            <ng-shadcn-dialog-header>
              <ng-shadcn-dialog-title>Small Dialog</ng-shadcn-dialog-title>
            </ng-shadcn-dialog-header>
            <div class="py-4">
              <p>This is a small dialog (max-width: 24rem)</p>
            </div>
          </ng-shadcn-dialog-content>
        </ng-shadcn-dialog>
        
        <ng-shadcn-dialog size="md">
          <ng-shadcn-dialog-trigger asChild>
            <ng-shadcn-button>Medium (md)</ng-shadcn-button>
          </ng-shadcn-dialog-trigger>
          <ng-shadcn-dialog-content>
            <ng-shadcn-dialog-header>
              <ng-shadcn-dialog-title>Medium Dialog</ng-shadcn-dialog-title>
            </ng-shadcn-dialog-header>
            <div class="py-4">
              <p>This is a medium dialog (max-width: 32rem)</p>
            </div>
          </ng-shadcn-dialog-content>
        </ng-shadcn-dialog>
        
        <ng-shadcn-dialog size="lg">
          <ng-shadcn-dialog-trigger asChild>
            <ng-shadcn-button>Large (lg)</ng-shadcn-button>
          </ng-shadcn-dialog-trigger>
          <ng-shadcn-dialog-content>
            <ng-shadcn-dialog-header>
              <ng-shadcn-dialog-title>Large Dialog</ng-shadcn-dialog-title>
            </ng-shadcn-dialog-header>
            <div class="py-4">
              <p>This is a large dialog (max-width: 42rem)</p>
            </div>
          </ng-shadcn-dialog-content>
        </ng-shadcn-dialog>
        
        <ng-shadcn-dialog size="xl">
          <ng-shadcn-dialog-trigger asChild>
            <ng-shadcn-button>Extra Large (xl)</ng-shadcn-button>
          </ng-shadcn-dialog-trigger>
          <ng-shadcn-dialog-content>
            <ng-shadcn-dialog-header>
              <ng-shadcn-dialog-title>Extra Large Dialog</ng-shadcn-dialog-title>
            </ng-shadcn-dialog-header>
            <div class="py-4">
              <p>This is an extra large dialog (max-width: 64rem)</p>
            </div>
          </ng-shadcn-dialog-content>
        </ng-shadcn-dialog>
      </div>
    </div>
  `
})
export class SizesExampleComponent {}

const meta: Meta<DialogComponent> = {
  title: 'Components/Dialog',
  component: DialogComponent,
  decorators: [
    moduleMetadata({
      imports: [
        DialogComponent,
        DialogTriggerComponent,
        DialogCloseComponent,
        DialogHeaderComponent,
        DialogTitleComponent,
        DialogDescriptionComponent,
        DialogContentComponent,
        DialogFooterComponent,
        ButtonComponent,
        ControlledDialogExampleComponent,
        CustomCloseButtonExampleComponent,
        SizesExampleComponent,
        CommonModule,
        FormsModule
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: `
A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.

## Installation

\`\`\`bash
# Using npm
npm install @ng-shadcn/dialog
# Using yarn
yarn add @ng-shadcn/dialog
# Using pnpm
pnpm add @ng-shadcn/dialog
\`\`\`

## Usage
### Standalone Components (Recommended)
Import and use the component directly in your standalone components:

\`\`\`typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '@ng-shadcn/dialog';
import { DialogTriggerComponent } from './dialog-trigger.component';
import { DialogCloseComponent } from './dialog-close.component';
import { DialogHeaderComponent } from './dialog-header.component';
import { DialogTitleComponent } from './dialog-title.component';
import { DialogDescriptionComponent } from './dialog-description.component';
import { DialogContentComponent } from './dialog-content.component';
import { DialogFooterComponent } from './dialog-footer.component';
import { ButtonComponent } from '@ng-shadcn/button';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [
    CommonModule,
    DialogComponent,
    DialogTriggerComponent,
    DialogCloseComponent,
    DialogHeaderComponent,
    DialogTitleComponent,
    DialogDescriptionComponent,
    DialogContentComponent,
    DialogFooterComponent,
    ButtonComponent
  ],
  template: \`
    <div class="space-y-4">
      <h3 class="font-medium mb-2">Standalone Dialog</h3>
      
      <ng-shadcn-dialog [(isOpen)]="isOpen">
        <ng-shadcn-dialog-trigger>
          <ng-shadcn-button>Open Standalone Dialog</ng-shadcn-button>
        </ng-shadcn-dialog-trigger>
        
        <ng-shadcn-dialog-content>
          <ng-shadcn-dialog-header>
            <ng-shadcn-dialog-title>Standalone Dialog</ng-shadcn-dialog-title>
            <ng-shadcn-dialog-close></ng-shadcn-dialog-close>
          </ng-shadcn-dialog-header>

          <div class="py-4">
            <p>This is a standalone dialog component</p>
          </div>
          
          <ng-shadcn-dialog-footer>
            <ng-shadcn-dialog-close>
              <ng-shadcn-button>Cancel</ng-shadcn-button>
            </ng-shadcn-dialog-close>
            <ng-shadcn-button>Save</ng-shadcn-button>
          </ng-shadcn-dialog-footer>
        </ng-shadcn-dialog-content>
      </ng-shadcn-dialog>
    </div>
  \`
})
export class ExampleComponent {
  isOpen = false;
}
\`\`\`

### Using NgModule (Legacy)
If you're using NgModules, import the \`DialogModule\`:

\`\`\`typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from '@ng-shadcn/dialog';
import { ButtonComponent } from '@ng-shadcn/button';

@NgModule({
  declarations: [YourComponent],
  imports: [
    CommonModule,
    DialogModule,
  ]
})
export class YourModule { }
\`\`\`



## Features
- **Accessible**: Follows WAI-ARIA dialog pattern
- **Keyboard Navigation**: Supports keyboard navigation and focus trapping
- **Animated**: Smooth enter/exit animations
- **Customizable**: Supports custom content and styling
- **Responsive**: Adapts to different screen sizes
- **Multiple Sizes**: Predefined size variants (sm, md, lg, xl)
- **Controlled/Uncontrolled**: Can be controlled or uncontrolled
`
      }
    }
  },
  tags: ['autodocs', 'form-control', 'ui'],
  argTypes: {
    backdropClick: {
      control: "boolean",
      description: "Whether to close the dialog when clicking the backdrop",
      table:{
        defaultValue: { summary: 'true' },
        type: {
          summary: 'true | false',
        },
      }
    },
    isOpen: {
      control: "boolean",
      description: "Whether the dialog is open or closed. Determines the controlled behavior of the dialog. When 'true', the dialog is open and the state is managed by the parent component. When 'false', the dialog is closed and the state is managed internally.",
      table:{
        defaultValue: { summary: 'false' },
        type: {
          summary: 'true | false',
        },
      }
    },
    id: {
      control: "text",
      description: "A unique identifier for the element. This is used to associate the dialog with an element in the DOM and is necessary for accessibility.",
      table:{
        defaultValue: { summary: 'dialog-01' },
        type: {
          summary: 'string',
        },
      }
    },
    showCloseButton: {
      control: "boolean",
      description: "Whether to show the close button (✕) at the top-right of the dialog, allowing the user to close it.",
      table:{
        defaultValue: { summary: 'true' },
        type: {
          summary: 'true | false',
        },
      }
    },
    size:{
      control: "select",
      options: ['sm', 'md', 'lg', 'xl'],
      description: "The size of the dialog. Can be 'sm', 'md', 'lg', or 'xl'.",
      table:{
        defaultValue: { summary: 'md' },
        type: {
          summary: 'string',
        },
      }
    },
    closed:{
      control: false,
    },
    opened:{
      control: false,
    }
  },
  subcomponents: {
    DialogTriggerComponent,
    DialogHeaderComponent,
    DialogTitleComponent,
    DialogDescriptionComponent,
    DialogContentComponent,
    DialogFooterComponent,
    DialogCloseComponent,
  },
  args: {
    size: "md",
    backdropClick: true,
    showCloseButton: true,
    class: '',
  },

};

export default meta;
type Story = StoryObj<DialogComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {...args},
    template: `
      <ng-shadcn-dialog [size]="size" [backdropClick]="backdropClick" [showCloseButton]="showCloseButton" [class]="class">
        <ng-shadcn-dialog-trigger>
          Open Dialog
        </ng-shadcn-dialog-trigger>
        <ng-shadcn-dialog-content>
          <ng-shadcn-dialog-header>
            <ng-shadcn-dialog-title>Dialog Title</ng-shadcn-dialog-title>
            <ng-shadcn-dialog-description>Dialog description</ng-shadcn-dialog-description>
          </ng-shadcn-dialog-header>
          <p>This is a basic dialog example. Click outside or press Escape to close.</p>
          <ng-shadcn-dialog-footer>
            <ng-shadcn-dialog-close asChild>
              <ng-shadcn-button variant="destructive">Cancel</ng-shadcn-button>
            </ng-shadcn-dialog-close>
            <ng-shadcn-button>Save</ng-shadcn-button>
          </ng-shadcn-dialog-footer>
        </ng-shadcn-dialog-content>
      </ng-shadcn-dialog>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'A basic dialog with a trigger button and content.'
      },
      source:{
        type: "code",
        language: "html",
        code: `
<ng-shadcn-dialog>
  <ng-shadcn-dialog-trigger>
    Open Dialog
  </ng-shadcn-dialog-trigger>
  <ng-shadcn-dialog-content>
    <ng-shadcn-dialog-header>
      <ng-shadcn-dialog-title>Dialog Title</ng-shadcn-dialog-title>
      <ng-shadcn-dialog-description>Dialog description</ng-shadcn-dialog-description>
    </ng-shadcn-dialog-header>
    <p>This is a basic dialog example. Click outside or press Escape to close.</p>
    <ng-shadcn-dialog-footer>
      <ng-shadcn-dialog-close asChild>
        <ng-shadcn-button variant="destructive">Cancel</ng-shadcn-button>
      </ng-shadcn-dialog-close>
      <ng-shadcn-button>Save</ng-shadcn-button>
    </ng-shadcn-dialog-footer>
  </ng-shadcn-dialog-content>
</ng-shadcn-dialog>
        `
      }
    }
  }
};

export const Controlled: Story = {
  render: () => ({
    template: `<controlled-dialog-example></controlled-dialog-example>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'A dialog that is controlled by its parent component, meaning the parent component decides whether the dialog is open or closed, and the dialog emits events when it is opened or closed.'
      },
      source: {
        type: "code",
          language: "typescript",
          code: `
  @Component({
    selector: "controlled-dialog-example",
    standalone: true,
    imports: [
      CommonModule,
      DialogComponent,
      DialogTriggerComponent,
      DialogCloseComponent,
      DialogHeaderComponent,
      DialogTitleComponent,
      DialogContentComponent,
      DialogFooterComponent,
      ButtonComponent
    ],
    template: \`
      <div class="space-y-4">
        <h3 class="font-medium mb-2">Controlled Dialog</h3>
        <div class="flex gap-4 flex-wrap">
          <ng-shadcn-button (click)="handleOpen()">Controlled Button</ng-shadcn-button>
          
          <ng-shadcn-dialog [isOpen]="isOpen()" (opened)="openListener()" (closed)="closeListener()">
            <ng-shadcn-dialog-trigger>
              Uncontrolled Trigger
            </ng-shadcn-dialog-trigger>
            <ng-shadcn-dialog-content>
              <ng-shadcn-dialog-header>
                <ng-shadcn-dialog-title>Controlled Dialog</ng-shadcn-dialog-title>
              </ng-shadcn-dialog-header>
            <p>This dialog is controlled by the parent component.</p>
            <p class="mt-2">Current state: {{ isOpen ? 'Open' : 'Closed' }}</p>
            <ng-shadcn-dialog-footer>
              <ng-shadcn-button variant="default" (click)="handleClose()">Controlled Close</ng-shadcn-button>
              <ng-shadcn-dialog-close>Uncontrolled Close</ng-shadcn-dialog-close>
            </ng-shadcn-dialog-footer>
          </ng-shadcn-dialog-content>
        </ng-shadcn-dialog>
        </div>
      </div>
      
    \`
  })
  export class ControlledDialogExampleComponent {
    isOpen = signal(false);
    handleOpen() {
      if (this.isOpen()) return;
      this.isOpen.set(true);
      console.log('Controlled open action')
    }
    handleClose() {
      if (!this.isOpen()) return;
      this.isOpen.set(false);
      console.log('Controlled close action')
    }
    openListener(){
      console.log('Dialog is open')
      this.isOpen.set(true)
    }
    closeListener(){
      console.log('Dialog is close')
      this.isOpen.set(false)
    }
  }
          `,
      }
    },
  }
};

export const CustomCloseButton: Story = {
  render: () => ({
    template: `<custom-close-button-example></custom-close-button-example>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'A dialog with a custom close button in the footer instead of the default one.'
      },
      source:{
        type: "code",
            language: "html",
            code: `
  <ng-shadcn-dialog showCloseButton="false" backdropClick="false">
    <ng-shadcn-dialog-trigger asChild>
      <ng-shadcn-button 
        variant="destructive" 
        class="rounded-full"
      >
        Custom Open Trigger
      </ng-shadcn-button>
    </ng-shadcn-dialog-trigger>
    
    <ng-shadcn-dialog-content>
      <ng-shadcn-dialog-header>
        <ng-shadcn-dialog-title>Custom Close Button</ng-shadcn-dialog-title>
      </ng-shadcn-dialog-header>
      
      <div class="py-4">
        <p>This dialog has a custom close button in the footer instead of the default one.</p>
      </div>
      
      <ng-shadcn-dialog-footer>
        <ng-shadcn-dialog-close asChild>
          <ng-shadcn-button 
            variant="outline" 
            class="hover:scale-105 transition rounded-full"
          >
            Custom Close Button
          </ng-shadcn-button>
        </ng-shadcn-dialog-close>
      </ng-shadcn-dialog-footer>
    </ng-shadcn-dialog-content>
  </ng-shadcn-dialog>
            `
  
      }
    },
  }
};

export const Sizes: Story = {
  render: () => ({
    applicationConfig: {
      providers: []
    },
    moduleMetadata: {
      imports: [SizesExampleComponent],
    },
    template: `<sizes-example></sizes-example>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Dialogs come in different sizes: sm, md (default), lg, and xl.'
      },
      source:{
        type: "code",
        language: "html",
        code: `
  <div class="space-y-4">
    <h3 class="font-medium mb-2">Dialog Sizes</h3>
    
    <div class="flex gap-2 flex-wrap">
      <ng-shadcn-dialog size="sm">
        <ng-shadcn-dialog-trigger asChild>
          <ng-shadcn-button>Small (sm)</ng-shadcn-button>
        </ng-shadcn-dialog-trigger>
        <ng-shadcn-dialog-content>
          <ng-shadcn-dialog-header>
            <ng-shadcn-dialog-title>Small Dialog</ng-shadcn-dialog-title>
          </ng-shadcn-dialog-header>
          <div class="py-4">
            <p>This is a small dialog (max-width: 24rem)</p>
          </div>
        </ng-shadcn-dialog-content>
      </ng-shadcn-dialog>
      
      <ng-shadcn-dialog size="md">
        <ng-shadcn-dialog-trigger asChild>
          <ng-shadcn-button>Medium (md)</ng-shadcn-button>
        </ng-shadcn-dialog-trigger>
        <ng-shadcn-dialog-content>
          <ng-shadcn-dialog-header>
            <ng-shadcn-dialog-title>Medium Dialog</ng-shadcn-dialog-title>
          </ng-shadcn-dialog-header>
          <div class="py-4">
            <p>This is a medium dialog (max-width: 32rem)</p>
          </div>
        </ng-shadcn-dialog-content>
      </ng-shadcn-dialog>
      
      <ng-shadcn-dialog size="lg">
        <ng-shadcn-dialog-trigger asChild>
          <ng-shadcn-button>Large (lg)</ng-shadcn-button>
        </ng-shadcn-dialog-trigger>
        <ng-shadcn-dialog-content>
          <ng-shadcn-dialog-header>
            <ng-shadcn-dialog-title>Large Dialog</ng-shadcn-dialog-title>
          </ng-shadcn-dialog-header>
          <div class="py-4">
            <p>This is a large dialog (max-width: 42rem)</p>
          </div>
        </ng-shadcn-dialog-content>
      </ng-shadcn-dialog>
      
      <ng-shadcn-dialog size="xl">
        <ng-shadcn-dialog-trigger asChild>
          <ng-shadcn-button>Extra Large (xl)</ng-shadcn-button>
        </ng-shadcn-dialog-trigger>
        <ng-shadcn-dialog-content>
          <ng-shadcn-dialog-header>
            <ng-shadcn-dialog-title>Extra Large Dialog</ng-shadcn-dialog-title>
          </ng-shadcn-dialog-header>
          <div class="py-4">
            <p>This is an extra large dialog (max-width: 64rem)</p>
          </div>
        </ng-shadcn-dialog-content>
      </ng-shadcn-dialog>
    </div>
  </div>
  
            `
  
      }
    },
  }
};


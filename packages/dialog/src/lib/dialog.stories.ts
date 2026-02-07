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
      
      <ng-shadcn-dialog [isOpen]="isOpen">
        <ng-shadcn-dialog-trigger>
          <ng-shadcn-button>Open Controlled Dialog</ng-shadcn-button>
        </ng-shadcn-dialog-trigger>
        
        <ng-shadcn-dialog-content>
          <ng-shadcn-dialog-header>
            <ng-shadcn-dialog-title>Controlled Dialog</ng-shadcn-dialog-title>
            <ng-shadcn-dialog-close></ng-shadcn-dialog-close>
          </ng-shadcn-dialog-header>
          
          <div class="py-4">
            <p>This dialog is controlled by the parent component.</p>
            <p class="mt-2">Current state: {{ isOpen ? 'Open' : 'Closed' }}</p>
          </div>
          
          <ng-shadcn-dialog-footer>
            <ng-shadcn-button (click)="isOpen = false">Close</ng-shadcn-button>
            <ng-shadcn-button variant="default">Save changes</ng-shadcn-button>
          </ng-shadcn-dialog-footer>
        </ng-shadcn-dialog-content>
      </ng-shadcn-dialog>
      
      <div class="space-x-2">
        <ng-shadcn-button (click)="isOpen = true">Open from Outside</ng-shadcn-button>
        <ng-shadcn-button (click)="isOpen = false">Close from Outside</ng-shadcn-button>
      </div>
    </div>
  `
})
export class ControlledDialogExampleComponent {
  isOpen = false;
}


// Wrapper component for alert dialog example
@Component({
  selector: "alert-dialog-example",
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
    <ng-shadcn-dialog>
      <ng-shadcn-dialog-trigger>
        <ng-shadcn-button variant="destructive">Delete Account</ng-shadcn-button>
      </ng-shadcn-dialog-trigger>
      
      <ng-shadcn-dialog-content>
        <ng-shadcn-dialog-header>
          <ng-shadcn-dialog-title>Are you sure?</ng-shadcn-dialog-title>
          <ng-shadcn-dialog-close></ng-shadcn-dialog-close>
        </ng-shadcn-dialog-header>
        
        <div class="py-4">
          <p class="text-destructive">
            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
          </p>
        </div>
        
        <ng-shadcn-dialog-footer>
          <ng-shadcn-dialog-close>
            <ng-shadcn-button variant="outline">Cancel</ng-shadcn-button>
          </ng-shadcn-dialog-close>
          <ng-shadcn-button variant="destructive" (click)="deleteAccount()">
            Delete Account
          </ng-shadcn-button>
        </ng-shadcn-dialog-footer>
      </ng-shadcn-dialog-content>
    </ng-shadcn-dialog>
  `
})
export class AlertDialogExampleComponent {
  deleteAccount() {
    // In a real app, you would delete the account here
    console.log('Account deleted');
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
    <ng-shadcn-dialog [showCloseButton]="false">
      <ng-shadcn-dialog-trigger>
        <ng-shadcn-button>Open with Custom Close</ng-shadcn-button>
      </ng-shadcn-dialog-trigger>
      
      <ng-shadcn-dialog-content>
        <ng-shadcn-dialog-header>
          <ng-shadcn-dialog-title>Custom Close Button</ng-shadcn-dialog-title>
        </ng-shadcn-dialog-header>
        
        <div class="py-4">
          <p>This dialog has a custom close button in the footer instead of the default one.</p>
        </div>
        
        <ng-shadcn-dialog-footer>
          <ng-shadcn-dialog-close>
            <ng-shadcn-button variant="outline">Custom Close Button</ng-shadcn-button>
          </ng-shadcn-dialog-close>
          <ng-shadcn-button>Save Changes</ng-shadcn-button>
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
    DialogCloseComponent,
    DialogHeaderComponent,
    DialogTitleComponent,
    DialogContentComponent,
    DialogFooterComponent,
    ButtonComponent
  ],
  template: `
    <div class="space-y-4">
      <h3 class="font-medium mb-2">Dialog Sizes</h3>
      
      <div class="flex gap-2 flex-wrap">
        <ng-shadcn-dialog size="sm">
          <ng-shadcn-dialog-trigger>
            <ng-shadcn-button>Small (sm)</ng-shadcn-button>
          </ng-shadcn-dialog-trigger>
          <ng-shadcn-dialog-content>
            <ng-shadcn-dialog-header>
              <ng-shadcn-dialog-title>Small Dialog</ng-shadcn-dialog-title>
              <ng-shadcn-dialog-close></ng-shadcn-dialog-close>
            </ng-shadcn-dialog-header>
            <div class="py-4">
              <p>This is a small dialog (max-width: 24rem)</p>
            </div>
          </ng-shadcn-dialog-content>
        </ng-shadcn-dialog>
        
        <ng-shadcn-dialog size="md">
          <ng-shadcn-dialog-trigger>
            <ng-shadcn-button>Medium (md)</ng-shadcn-button>
          </ng-shadcn-dialog-trigger>
          <ng-shadcn-dialog-content>
            <ng-shadcn-dialog-header>
              <ng-shadcn-dialog-title>Medium Dialog</ng-shadcn-dialog-title>
              <ng-shadcn-dialog-close></ng-shadcn-dialog-close>
            </ng-shadcn-dialog-header>
            <div class="py-4">
              <p>This is a medium dialog (max-width: 32rem)</p>
            </div>
          </ng-shadcn-dialog-content>
        </ng-shadcn-dialog>
        
        <ng-shadcn-dialog size="lg">
          <ng-shadcn-dialog-trigger>
            <ng-shadcn-button>Large (lg)</ng-shadcn-button>
          </ng-shadcn-dialog-trigger>
          <ng-shadcn-dialog-content>
            <ng-shadcn-dialog-header>
              <ng-shadcn-dialog-title>Large Dialog</ng-shadcn-dialog-title>
              <ng-shadcn-dialog-close></ng-shadcn-dialog-close>
            </ng-shadcn-dialog-header>
            <div class="py-4">
              <p>This is a large dialog (max-width: 42rem)</p>
            </div>
          </ng-shadcn-dialog-content>
        </ng-shadcn-dialog>
        
        <ng-shadcn-dialog size="xl">
          <ng-shadcn-dialog-trigger>
            <ng-shadcn-button>Extra Large (xl)</ng-shadcn-button>
          </ng-shadcn-dialog-trigger>
          <ng-shadcn-dialog-content>
            <ng-shadcn-dialog-header>
              <ng-shadcn-dialog-title>Extra Large Dialog</ng-shadcn-dialog-title>
              <ng-shadcn-dialog-close></ng-shadcn-dialog-close>
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
  tags: ['autodocs'],
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
        AlertDialogExampleComponent,
        CustomCloseButtonExampleComponent,
        SizesExampleComponent,
        CommonModule,
        FormsModule
      ]
    })
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.

## Installation

Import the component in your module:

\`\`\`typescript
import { DialogModule } from '@packages/dialog';

@NgModule({
  imports: [
    // ...
    DialogModule
  ]
})
export class YourModule { }
\`\`\`

## Usage

### Basic Usage
\`\`\`html
<ng-shadcn-dialog>
  <ng-shadcn-dialog-trigger>
    <button>Open Dialog</button>
  </ng-shadcn-dialog-trigger>
  
  <ng-shadcn-dialog-content>
    <ng-shadcn-dialog-header>
      <ng-shadcn-dialog-title>Dialog Title</ng-shadcn-dialog-title>
      <ng-shadcn-dialog-close></ng-shadcn-dialog-close>
    </ng-shadcn-dialog-header>
    
    <div class="py-4">
      Dialog content goes here
    </div>
    
    <ng-shadcn-dialog-footer>
      <ng-shadcn-dialog-close>
        <button>Cancel</button>
      </ng-shadcn-dialog-close>
      <button>Save</button>
    </ng-shadcn-dialog-footer>
  </ng-shadcn-dialog-content>
</ng-shadcn-dialog>
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
  }
};

export default meta;
type Story = StoryObj<DialogComponent>;

export const Default: Story = {
  args: {},
  render: () => ({
    template: `
      <ng-shadcn-dialog>
        <ng-shadcn-dialog-trigger>
          <ng-shadcn-button>Open Dialog</ng-shadcn-button>
        </ng-shadcn-dialog-trigger>
        
        <ng-shadcn-dialog-content>
          <ng-shadcn-dialog-header>
            <ng-shadcn-dialog-title>Dialog Title</ng-shadcn-dialog-title>
            <ng-shadcn-dialog-close></ng-shadcn-dialog-close>
          </ng-shadcn-dialog-header>
          
          <div class="py-4">
            <p>This is a basic dialog example. Click outside or press Escape to close.</p>
          </div>
          
          <ng-shadcn-dialog-footer>
            <ng-shadcn-dialog-close>
              <ng-shadcn-button variant="outline">Cancel</ng-shadcn-button>
            </ng-shadcn-dialog-close>
            <ng-shadcn-button>Save</ng-shadcn-button>
          </ng-shadcn-dialog-footer>
        </ng-shadcn-dialog-content>
      </ng-shadcn-dialog>
    `,
  }),
  parameters: {
    layout: 'fullscreen'
  }
};

export const Controlled: Story = {
  render: () => ({
    template: `<controlled-dialog-example></controlled-dialog-example>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'A dialog with its open/close state controlled by the parent component.'
      }
    }
  }
};

export const FormDialog: Story = {
  render: () => ({
    template: `<form-dialog-example></form-dialog-example>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'A dialog containing a form with input fields and form controls.'
      }
    }
  }
};

export const AlertDialog: Story = {
  render: () => ({
    template: `<alert-dialog-example></alert-dialog-example>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'A confirmation dialog for destructive actions like deletion.'
      }
    }
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
      }
    }
  }
};

export const Sizes: Story = {
  render: () => ({
    template: `<sizes-example></sizes-example>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Dialogs come in different sizes: sm, md (default), lg, and xl.'
      }
    }
  }
};

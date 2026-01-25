import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AlertComponent } from './alert.component';
import { AlertIconComponent } from './alert-icon.component';
import { AlertTitleComponent } from './alert-title.component';
import { AlertContentComponent } from './alert-content.component';
import { AlertActionComponent } from './alert-action.component';

const meta: Meta<AlertComponent> = {
  title: 'Components/Alert',
  component: AlertComponent,
  decorators: [
    moduleMetadata({
      imports: [
        AlertComponent,
        AlertIconComponent,
        AlertTitleComponent,
        AlertContentComponent,
        AlertActionComponent
      ],
    }),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable alert component for displaying important information to users with various styles and interactions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'success', 'warning', 'info'],
      description: 'The visual style variant of the alert',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fade: {
      control: 'boolean',
      description: 'Whether the alert should fade out when dismissed',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onAlertAction: {
      action: 'onAlertAction',
      description: 'Event emitted when the action button is clicked',
      table: {
        type: { summary: 'EventEmitter<void>' },
      },
    },
    dismissed: {
      action: 'dismissed',
      description: 'Event emitted when the alert is dismissed',
      table: {
        type: { summary: 'EventEmitter<void>' },
      },
    },
  },
  args: {
    variant: 'default',
    dismissible: false,
    fade: false,
  },
};

export default meta;
type Story = StoryObj<AlertComponent>;

//#region Basic Usage
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="w-125">
        <ng-shadcn-alert [variant]="variant" [dismissible]="dismissible" [fade]="fade" (dismissed)="dismissed()">
          <ng-shadcn-alert-title>Alert Title</ng-shadcn-alert-title>
          <ng-shadcn-alert-content>
            This is a default alert with some information.
          </ng-shadcn-alert-content>
        </ng-shadcn-alert>
      </div>
    `,
  }),
};

//#region Variants
export const Variants: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-4 w-125">
        <ng-shadcn-alert>
          <ng-shadcn-alert-title>Default Alert</ng-shadcn-alert-title>
          <ng-shadcn-alert-content>
            This is a default alert with some information.
          </ng-shadcn-alert-content>
        </ng-shadcn-alert>

        <ng-shadcn-alert variant="success">
          <ng-shadcn-alert-title>Success!</ng-shadcn-alert-title>
          <ng-shadcn-alert-content>
            Your operation completed successfully.
          </ng-shadcn-alert-content>
        </ng-shadcn-alert>

        <ng-shadcn-alert variant="warning">
          <ng-shadcn-alert-title>Warning</ng-shadcn-alert-title>
          <ng-shadcn-alert-content>
            Please review your settings before proceeding.
          </ng-shadcn-alert-content>
        </ng-shadcn-alert>

        <ng-shadcn-alert variant="destructive">
          <ng-shadcn-alert-title>Error</ng-shadcn-alert-title>
          <ng-shadcn-alert-content>
            Something went wrong. Please try again.
          </ng-shadcn-alert-content>
        </ng-shadcn-alert>

        <ng-shadcn-alert variant="info">
          <ng-shadcn-alert-title>Information</ng-shadcn-alert-title>
          <ng-shadcn-alert-content>
            Here's some helpful information for you.
          </ng-shadcn-alert-content>
        </ng-shadcn-alert>
      </div>
    `,
  }),
};
//#endregion

//#region Dismissible Alerts
export const Dismissible: Story = {
  args: {
    dismissible: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="w-125">
        <ng-shadcn-alert 
          [variant]="variant" 
          [dismissible]="dismissible" 
          [fade]="fade" 
          (dismissed)="dismissed()"
        >
          <ng-shadcn-alert-title>Dismissible Alert</ng-shadcn-alert-title>
          <ng-shadcn-alert-content>
            This alert can be dismissed by clicking the X button.
          </ng-shadcn-alert-content>
        </ng-shadcn-alert>
      </div>
    `,
  }),
};

//#region With Action Buttons
export const WithAction: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-4 w-125">
        <ng-shadcn-alert variant="success" (onAlertAction)="onAlertAction()">
          <ng-shadcn-alert-title>Success!</ng-shadcn-alert-title>
          <ng-shadcn-alert-content>
            Your operation completed successfully.
          </ng-shadcn-alert-content>
          <ng-shadcn-alert-action>Undo</ng-shadcn-alert-action>
        </ng-shadcn-alert>

        <ng-shadcn-alert variant="destructive" dismissible (dismissed)="dismissed()">
          <ng-shadcn-alert-title>Dismissible Action Alert</ng-shadcn-alert-title>
          <ng-shadcn-alert-content>
            Will execute the action and dismiss the alert.
          </ng-shadcn-alert-content>
          <ng-shadcn-alert-action (click)="onAlertAction()">Retry</ng-shadcn-alert-action>
        </ng-shadcn-alert>
      </div>
    `,
  }),
};
//#endregion

//#region With Icons
export const Icons: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-4 w-125">
        <ng-shadcn-alert variant="success">
          <ng-shadcn-alert-icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </ng-shadcn-alert-icon>
          <ng-shadcn-alert-title>Success</ng-shadcn-alert-title>
          <ng-shadcn-alert-content>
            Operation completed successfully with a custom icon.
          </ng-shadcn-alert-content>
        </ng-shadcn-alert>

        <ng-shadcn-alert variant="warning" showIcon="false">
          <ng-shadcn-alert-title>Warning</ng-shadcn-alert-title>
          <ng-shadcn-alert-content>
            This is a warning without icon.
          </ng-shadcn-alert-content>
        </ng-shadcn-alert>
      </div>
    `,
  }),
};
//#endregion

//#region Custom Alert
export const CustomAlert: Story = {
  render: () => ({
    template: `
      <div class="w-125">
        <ng-shadcn-alert 
          class="bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-lg border-0 shadow-lg"
          (onAlertAction)="onAlertAction()"
        >
          <ng-shadcn-alert-icon class="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
          </ng-shadcn-alert-icon>
          <ng-shadcn-alert-title class="text-white font-bold">Custom Styled Alert</ng-shadcn-alert-title>
          <ng-shadcn-alert-content class="text-white/90 mt-3">
            This alert has a custom gradient background, white text, and a custom icon.
            You can fully customize the appearance using Tailwind CSS classes.
          </ng-shadcn-alert-content>
          <ng-shadcn-alert-action class="bg-white/20 hover:bg-white/30">
            Got it!
          </ng-shadcn-alert-action>
        </ng-shadcn-alert>
      </div>
    `,
  }),
};
//#endregion

//#region Fade Effect
export const WithFade: Story = {
  args: {
    dismissible: true,
    fade: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="w-125">
        <ng-shadcn-alert 
          [variant]="variant" 
          [dismissible]="dismissible" 
          [fade]="fade" 
          (dismissed)="dismissed()"
        >
          <ng-shadcn-alert-title>Fade Effect</ng-shadcn-alert-title>
          <ng-shadcn-alert-content>
            This alert will fade out when dismissed. Try clicking the X button!
          </ng-shadcn-alert-content>
        </ng-shadcn-alert>
      </div>
    `,
  }),
};
//#endregion

import { Component } from '@angular/core';
import { AlertComponent, AlertIconComponent, AlertTitleComponent, AlertContentComponent, AlertActionComponent } from '@packages/alert/src/public-api';
import { CardComponent } from '@packages/card/src/public-api';


@Component({
  selector: 'app-alert-example',
  standalone: true,
  imports: [
    AlertComponent, 
    AlertIconComponent,
    AlertTitleComponent,
    AlertContentComponent,
    AlertActionComponent,
    CardComponent,
    
  ],
  template: `
    <ng-shadcn-card>
      <div class="p-6">
        <h2 class="text-2xl font-semibold mb-4">Alerts</h2>
        <div class="grid gap-4">
          <!-- Default Alert -->
          <ng-shadcn-alert>
            <ng-shadcn-alert-title>Default Alert</ng-shadcn-alert-title>
            <ng-shadcn-alert-content>
              This is a default alert with some information.
            </ng-shadcn-alert-content>
          </ng-shadcn-alert>

          <!-- Success Alert with Action -->
          <ng-shadcn-alert variant="success" (onAlertAction)="onAction('success')">
            <ng-shadcn-alert-title>Success!</ng-shadcn-alert-title>
            <ng-shadcn-alert-content>
              Your operation completed successfully.
            </ng-shadcn-alert-content>
            <ng-shadcn-alert-action>Undo</ng-shadcn-alert-action>
          </ng-shadcn-alert>

          <!-- Warning Dismissible Alert -->
          <ng-shadcn-alert 
            variant="warning" 
            [dismissible]="true" 
            (dismissed)="onDismissed('warning')"
          >
            <ng-shadcn-alert-title>Warning</ng-shadcn-alert-title>
            <ng-shadcn-alert-content>
              Please review your settings before proceeding.
            </ng-shadcn-alert-content>
          </ng-shadcn-alert>

          <!-- Destructive Alert with Custom Icon -->
          <ng-shadcn-alert variant="destructive">
            <ng-shadcn-alert-icon>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </ng-shadcn-alert-icon>
            <ng-shadcn-alert-title>Error</ng-shadcn-alert-title>
            <ng-shadcn-alert-content>
              Something went wrong. Please try again.
            </ng-shadcn-alert-content>
          </ng-shadcn-alert>

          <!-- Info Alert with Fade -->
          <ng-shadcn-alert 
            variant="info" 
            [fade]="true" 
            [dismissible]="true"
            (dismissed)="onDismissed('info')"
          >
            <ng-shadcn-alert-title>Information</ng-shadcn-alert-title>
            <ng-shadcn-alert-content>
              Here's some helpful information for you. This alert will fade out when dismissed.
            </ng-shadcn-alert-content>
          </ng-shadcn-alert>
        </div>
      </div>
    </ng-shadcn-card>
  `
})
export class AlertExampleComponent {
  onDismissed(type: string) {
    console.log(`${type} alert was dismissed`);
  }

  onAction(type: string) {
    console.log(`Action clicked on ${type} alert`);
  }
}
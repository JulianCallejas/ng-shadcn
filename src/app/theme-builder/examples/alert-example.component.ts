import { Component } from '@angular/core';
import { AlertComponent } from '@packages/alert/src/public-api';
import { CardComponent } from '@packages/card/src/public-api';

@Component({
  selector: 'app-alert-example',
  standalone: true,
  imports: [AlertComponent, CardComponent],
  template: `
    <ng-shadcn-card>
      <div class="p-6">
        <h2 class="text-2xl font-semibold mb-4">Alerts</h2>
        <div class="grid gap-4">
          <ng-shadcn-alert title="Default Alert">
            This is a default alert with some information.
          </ng-shadcn-alert>
          <ng-shadcn-alert variant="success" title="Success!">
            Your operation completed successfully.
          </ng-shadcn-alert>
          <ng-shadcn-alert variant="warning" title="Warning" [dismissible]="true">
            Please review your settings before proceeding.
          </ng-shadcn-alert>
          <ng-shadcn-alert variant="destructive" title="Error">
            Something went wrong. Please try again.
          </ng-shadcn-alert>
          <ng-shadcn-alert variant="info" title="Information">
            Here's some helpful information for you.
          </ng-shadcn-alert>
        </div>
      </div>
    </ng-shadcn-card>
  `
})
export class AlertExampleComponent { }

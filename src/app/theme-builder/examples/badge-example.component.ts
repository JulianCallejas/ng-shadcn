import { Component } from '@angular/core';
import { BadgeComponent } from '@packages/badge/src/public-api';
import { CardComponent } from '@packages/card/src/public-api';

@Component({
  selector: 'app-badge-example',
  standalone: true,
  imports: [BadgeComponent, CardComponent],
  template: `
    <ng-shadcn-card>
      <div class="p-6">
        <h2 class="text-2xl font-semibold mb-4">Badges</h2>
        <div class="flex flex-wrap gap-4">
          <ng-shadcn-badge>Default</ng-shadcn-badge>
          <ng-shadcn-badge variant="secondary">Secondary</ng-shadcn-badge>
          <ng-shadcn-badge variant="destructive">Error</ng-shadcn-badge>
          <ng-shadcn-badge variant="outline">Outline</ng-shadcn-badge>
          <ng-shadcn-badge variant="success">Success</ng-shadcn-badge>
          <ng-shadcn-badge variant="warning">Warning</ng-shadcn-badge>
          <ng-shadcn-badge variant="info">Info</ng-shadcn-badge>
          <ng-shadcn-badge [dismissible]="true">Dismissible</ng-shadcn-badge>
        </div>
      </div>
    </ng-shadcn-card>
  `
})
export class BadgeExampleComponent { }

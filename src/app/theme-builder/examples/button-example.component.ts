import { Component } from '@angular/core';
import { ButtonComponent } from '@packages/button/src/public-api';
import { CardComponent } from '@packages/card/src/public-api';

@Component({
  selector: 'app-button-example',
  standalone: true,
  imports: [ButtonComponent, CardComponent],
  template: `
    <ng-shadcn-card>
      <div class="p-6">
        <h2 class="text-2xl font-semibold mb-4">Buttons</h2>
        <div class="flex gap-4 flex-wrap">
          <ng-shadcn-button>Default</ng-shadcn-button>
          <ng-shadcn-button variant="secondary" (click)="handleClick()" >Secondary</ng-shadcn-button>
          <ng-shadcn-button variant="destructive">Destructive</ng-shadcn-button>
          <ng-shadcn-button variant="outline">Outline</ng-shadcn-button>
          <ng-shadcn-button variant="ghost">Ghost</ng-shadcn-button>
          <ng-shadcn-button [disabled]="true">Disabled</ng-shadcn-button>
          <ng-shadcn-button size="sm">Small</ng-shadcn-button>
          <ng-shadcn-button size="lg">Large</ng-shadcn-button>
        </div>
      </div>
    </ng-shadcn-card>
  `,
  styles: []
})
export class ButtonExampleComponent {
  handleClick() {
    alert('clicked');
  }
}

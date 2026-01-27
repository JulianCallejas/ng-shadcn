import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

/**
 * Card component for content containers
 * Provides consistent styling and spacing
 */
@Component({
  selector: 'ng-shadcn-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="computedClasses">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {
  @Input() class = '';

  get computedClasses(): string {
    return cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      this.class
    );
  }
}

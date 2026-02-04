import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div [ngClass]="computedClasses()">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {
  class = input<string>('');

  /** @ignore */
  computedClasses = computed(() =>
    cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      this.class()
    )
  );
}

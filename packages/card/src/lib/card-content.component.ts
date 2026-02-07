import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

/**
 * Card content component
 */
@Component({
  selector: 'ng-shadcn-card-content',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div [class]="computedClasses()">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardContentComponent {
  /**
   * Additional classes to apply to the card content.
   * Useful for custom styling.
   */
  class = input<string>('');

  /** @ignore */
  computedClasses = computed(() =>
    cn(
      'px-6',
      this.class()
    )
  );

}
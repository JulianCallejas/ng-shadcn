import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

/**
 * Card title component
 */
@Component({
  selector: 'ng-shadcn-card-title',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <h3 [class]="computedClasses()">
      <ng-content></ng-content>
    </h3>
  `,
})
export class CardTitleComponent {
  /**
   * Additional classes to apply to the card title.
   * Useful for custom styling.
   */
  class = input<string>('');

  /** @ignore */
  computedClasses = computed(() =>
    cn(
      'text-2xl font-semibold leading-none tracking-tight',
      this.class()
    )
  );
}
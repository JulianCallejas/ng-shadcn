import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

/**
 * Card description component
 */
@Component({
  selector: 'ng-shadcn-card-description',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <p [class]="computedClasses()">
      <ng-content></ng-content>
    </p>
  `,
})
export class CardDescriptionComponent {
  /**
   * Additional classes to apply to the card description.
   * Useful for custom styling.
   */
  class = input<string>('');

  /** @ignore */
  computedClasses = computed(() =>
    cn(
      'text-sm text-muted-foreground',
      this.class()
    )
  );
}
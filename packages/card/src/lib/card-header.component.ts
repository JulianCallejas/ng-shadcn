import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

/**
 * Card header component
 */
@Component({
  selector: 'ng-shadcn-card-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div [class]="computedClasses()">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardHeaderComponent {
  /**
   * Additional classes to apply to the card header.
   * Useful for custom styling.
   */
  class = input<string>('');

  /** @ignore */
  computedClasses = computed(() =>
    cn(
      'flex flex-col space-y-1.5 p-6',
      this.class()
    )
  );
}
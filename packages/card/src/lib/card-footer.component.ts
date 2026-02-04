import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

/**
 * Card footer component
 */
@Component({
  selector: 'ng-shadcn-card-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div [class]="computedClasses()">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardFooterComponent {
  class = input<string>('');

  /** @ignore */
  computedClasses = computed(() =>
    cn(
      'flex items-center p-6',
      this.class
    )
  );
}
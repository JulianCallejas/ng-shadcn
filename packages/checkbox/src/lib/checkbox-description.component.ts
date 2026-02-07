import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

@Component({
  selector: 'ng-shadcn-checkbox-description',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  providers: [],
  template: `
  <p
    [class]="computedClasses()"
    [class.text-sm]="size === 'lg'"
  >
    <ng-content ></ng-content>
  </p>
  `,
})
export class CheckboxDescriptionComponent  {
  
  /**
   * Additional classes to apply to the checkbox description.
   * Useful for custom styling.
   */
  class = input<string>('');
  
  /** @ignore */
  size = 'default';
    
  // Computed properties
  /** @ignore */
  computedClasses = computed(() =>
    cn(
        'text-xs leading-none text-muted-foreground',
        this.class()
    )
  );
};

import { CommonModule } from "@angular/common";
import { Component, computed, Input } from "@angular/core";
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

@Component({
  selector: 'ng-shadcn-checkbox-icon',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  template: `
  <span [class]="computedClasses()" >
    <ng-content></ng-content>
  </span>
  `,
})
export class CheckboxIconComponent  {
  @Input() class = '';
    
  // Computed properties
  /** @ignore */
  computedClasses = computed(() =>
    cn(
        'w-full h-full overflow-hidden text-current',
        this.class
    )
  );
};

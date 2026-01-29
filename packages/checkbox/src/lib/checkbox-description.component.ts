import { CommonModule } from "@angular/common";
import { Component, computed, Input } from "@angular/core";
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

@Component({
  selector: 'ng-shadcn-checkbox-description',
  standalone: true,
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
  @Input() class = '';
  
  /** @ignore */
  size = 'default';
    
  // Computed properties
  /** @ignore */
  computedClasses = computed(() =>
    cn(
        'text-xs leading-none text-muted-foreground',
        this.class
    )
  );
};

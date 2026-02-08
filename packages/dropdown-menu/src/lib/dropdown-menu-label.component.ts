import { CommonModule } from "@angular/common";
import { Component, computed, input } from "@angular/core";

// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

@Component({
  selector: 'ng-shadcn-dropdown-menu-label',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="computedClasses()">
      <ng-content></ng-content>
    </div>
  `,
})
export class DropdownMenuLabelComponent {
  
  class = input<string>('');
  
  
  /** @ignore */
  computedClasses = computed(() => cn(
    'px-2 py-1.5 text-sm font-semibold',
    this.class()
  ));
}
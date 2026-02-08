import { CommonModule } from "@angular/common";
import { Component, computed, input } from "@angular/core";

// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

@Component({
  selector: 'ng-shadcn-dropdown-menu-separator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="computedClasses()" role="separator"></div>
  `,
})
export class DropdownMenuSeparatorComponent {
  
  class = input<string>('');
    
  /** @ignore */
  computedClasses = computed(() => cn(
    '-mx-1 my-1 h-px bg-muted',
    this.class()
  ));
}
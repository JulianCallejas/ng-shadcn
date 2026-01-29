import { CommonModule } from "@angular/common";
import { Component, computed, EventEmitter, Input, Output } from "@angular/core";
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';


@Component({
  selector: 'ng-shadcn-checkbox-label',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  template: `
  <label
    [class]="computedClasses()"
    [class.text-xs]="size === 'sm'"
    [class.text-base]="size === 'lg'"
    (click)="handleClick()"
    [for]="id"
  >
    <ng-content></ng-content>
  </label>
  `,
})
export class CheckboxLabelComponent  {
  @Input() class = '';
    
  /** @ignore */
  id = '';
  
  /** @ignore */
  size = 'default';

  @Output() toggleCheckbox = new EventEmitter<string>();

  /** @ignore */
  handleClick(): void {
    this.toggleCheckbox.emit(this.id);
  }

    
  // Computed properties
  /** @ignore */
  computedClasses = computed(() =>
    cn(
        'text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer',
        this.class
    )
  );
};

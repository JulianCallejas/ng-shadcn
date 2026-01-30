import { Component, Input, booleanAttribute, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

/**
 * Individual accordion content component
 */
@Component({
  selector: 'ng-shadcn-accordion-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="computedClasses()"
      [attr.data-state]="isExpanded() ? 'open' : 'closed'"
      role="region"
      [attr.aria-labelledby]="'accordion-trigger-' + id"
      [attr.id]="'accordion-content-' + id"
    >
      <div class="pb-4 pt-0">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class AccordionContentComponent {
  
  /** @ignore */
  id = '';

  @Input() class = '';
  
  /** @ignore */
  readonly isExpanded = signal(false);

  /** @ignore */
  computedClasses(): string {
    return cn(
      'overflow-hidden text-sm transition-all min-h-[0px]',
      this.class
    );
  }
}
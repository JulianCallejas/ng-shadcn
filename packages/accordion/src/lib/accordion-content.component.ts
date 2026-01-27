import { Component, Input, booleanAttribute } from '@angular/core';
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
  styles: `
  @keyframes accordion-down {
    from { height: 0; }
    to { height: var(--radix-accordion-content-height); }
  }
  @keyframes accordion-up {
    0% { 
      height: var(--radix-accordion-content-height); 
    }
    100% { 
      height: 0; 
    }
  }
  .animate-accordion-down {
    interpolate-size: allow-keywords;
    animation: accordion-down 0.2s ease-out forwards;
  }
  .animate-accordion-up {
    interpolate-size: allow-keywords;
    animation: accordion-up 0.2s ease-out forwards;
  }
  `,
  template: `
    <div
      [class]="computedClasses"
      [attr.data-state]="isExpanded ? 'open' : 'closed'"
      role="region"
      [attr.aria-labelledby]="triggerId"
      [attr.id]="contentId"
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
  @Input({ transform: booleanAttribute }) isExpanded = false;

  get triggerId(): string {
    return `accordion-trigger-${this.id}`;
  }

  get contentId(): string {
    return `accordion-content-${this.id}`;
  }

  get computedClasses(): string {
    const baseClasses = 'overflow-hidden text-sm transition-all';
    const stateClasses = this.isExpanded ? 'animate-accordion-down' : 'animate-accordion-up';
    return cn(
      baseClasses,
      stateClasses,
      this.class
    );
  }
}
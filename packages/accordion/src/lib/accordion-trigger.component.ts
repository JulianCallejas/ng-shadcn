import { Component, Input, Output, EventEmitter, booleanAttribute, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

/**
 * Individual accordion trigger component
 */
@Component({
  selector: 'ng-shadcn-accordion-trigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      class="gap-2 w-full"
      [class]="computedClasses()"
      [attr.data-state]="dataState"
      [disabled]="isDisabled"
      [attr.aria-expanded]="isExpanded()"
      [attr.aria-controls]="'accordion-content-' + id"
      [attr.id]="'accordion-trigger-' + id"
      (click)="handleClick()"
      (keydown)="handleKeyDown($event)"
      >
      <ng-content></ng-content>
      <svg
        class="h-4 w-4 shrink-0 transition-transform duration-200"
        [class.rotate-180]="isExpanded()"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
  `,
})
export class AccordionTriggerComponent {
  
  /** @ignore */
  id = '';
  
  @Input() class = '';
  @Input({ transform: booleanAttribute }) disabled = false;
  // @Input({ transform: booleanAttribute }) isExpanded = false;
  
  /** @ignore */
  readonly isExpanded = signal(false);

  @Output() itemToggled = new EventEmitter<string>();

  get dataState(): 'open' | 'closed' {
    return this.isExpanded() ? 'open' : 'closed';
  }

  get isDisabled(): boolean {
    return this.disabled;
  }

  /** @ignore */
  computedClasses(): string {
    const baseClasses = 'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline';
    const stateClasses = this.disabled
      ? 'pointer-events-none opacity-50'
      : '[&[data-state=open]>svg]:rotate-180';

    return cn(
      baseClasses,
      stateClasses,
      this.class
    );

  }

  /** @ignore */
  handleClick(): void {
    if (!this.disabled) {
      this.itemToggled.emit(this.id);
    }
  }

  /** @ignore */
  handleKeyDown(event: Event): void {
    if (
      event instanceof KeyboardEvent &&
      (event.key === 'Enter' || event.key === ' ')
    ) {
      event.preventDefault();
      this.handleClick();
    }
  }
}
import { Component, computed, input, inject, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva } from 'class-variance-authority';
import { SelectComponent } from './select.component';

// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

const selectVariants = cva(
  'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        default: 'h-10 px-3 py-2',
        sm: 'h-9 px-3 py-2 text-xs',
        lg: 'h-11 px-4 py-2',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type SelectSize = 'default' | 'sm' | 'lg';

@Component({
  selector: 'ng-shadcn-select-trigger',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  host: {
    '(click)': 'toggleDropdown()',
    '(keydown)': 'onTriggerKeydown($event)'
  },
  template: `
    <ng-template #content>
      <ng-content></ng-content>
    </ng-template>
      
    @if (!asChild()) {
      <button
        type="button"
        [class]="computedClasses()"
        [disabled]="select.disabled()"
        [attr.aria-expanded]="select.isOpen()"
        [attr.aria-haspopup]="true"
        [attr.aria-label]="placeholder || 'Select option'"
        role="combobox"
        [attr.aria-expanded]="select.isOpen()"
        [attr.aria-controls]="select.id() + '-optionsContainer'"
        [attr.aria-activedescendant]="select.highlightedItem()?.value"
      >
        <span class="block truncate text-left">
          {{ select.selectedOption()?.label || placeholder() || 'Select...' }}
        </span>
        <svg
          class="ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform"
          [class.rotate-180]="select.isOpen()"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    } @else {
      <ng-container *ngTemplateOutlet="content"></ng-container>
    }
  `,
})
export class SelectTriggerComponent {
  
  /**
   * Whether to render the trigger as a child component
   */
  asChild = input(false, { transform: booleanAttribute });
  class = input('')
  placeholder = input('')
  size = input('default', { transform: (value: SelectSize) => {
    if (value === 'default') return 'default';
    if (value === 'sm') return 'sm';
    if (value === 'lg') return 'lg';
    return 'default';
  } });
  
  /** @ignore */
  select = inject(SelectComponent);
  
  /** @ignore */
  computedClasses = computed(() => cn(
    selectVariants({ size: this.size() }),
    this.class()
  ));

  /** @ignore */
  toggleDropdown(): void {
    if (this.select.disabled()) return;
    this.select.toggleDropdown();
    // lose focus from this element
  }

  /** @ignore */
  onTriggerKeydown(event: KeyboardEvent): void {
    if (this.select.disabled()) return;
    this.select.onTriggerKeydown(event);
  }
  
}

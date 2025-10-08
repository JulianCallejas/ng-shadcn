import { Component, Input, Output, EventEmitter, signal, computed, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Accordion item interface
 */
export interface AccordionItem {
  id: string;
  title: string;
  content: string;
  disabled?: boolean;
  expanded?: boolean;
}

/**
 * Individual accordion content component
 */
@Component({
  selector: 'ng-shadcn-accordion-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="computedClasses"
      [attr.data-state]="isExpanded ? 'open' : 'closed'"
      role="region"
      [attr.aria-labelledby]="triggerId"
      [attr.id]="contentId"
      [style.display]="isExpanded ? 'block' : 'none'">
      <div class="pb-4 pt-0">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class AccordionContentComponent {
  @Input() value = '';
  @Input() className = '';
  @Input() isExpanded = false;

  get triggerId(): string {
    return `accordion-trigger-${this.value}`;
  }

  get contentId(): string {
    return `accordion-content-${this.value}`;
  }

  get computedClasses(): string {
    const baseClasses = 'overflow-hidden text-sm transition-all';
    const stateClasses = this.isExpanded 
      ? 'data-[state=open]:animate-accordion-down' 
      : 'data-[state=closed]:animate-accordion-up';
    
    return `${baseClasses} ${stateClasses} ${this.className}`;
  }
}

/**
 * Individual accordion trigger component
 */
@Component({
  selector: 'ng-shadcn-accordion-trigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class]="computedClasses"
      [attr.data-state]="isExpanded ? 'open' : 'closed'"
      [disabled]="disabled"
      [attr.aria-expanded]="isExpanded"
      [attr.aria-controls]="contentId"
      [attr.id]="triggerId"
      (click)="handleClick()"
      (keydown)="handleKeyDown($event)">
      
      <ng-content></ng-content>
      
      <svg 
        class="h-4 w-4 shrink-0 transition-transform duration-200"
        [class.rotate-180]="isExpanded"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
  `,
})
export class AccordionTriggerComponent {
  @Input() value = '';
  @Input() className = '';
  @Input() disabled = false;
  @Input() isExpanded = false;

  @Output() itemToggled = new EventEmitter<string>();

  get triggerId(): string {
    return `accordion-trigger-${this.value}`;
  }

  get contentId(): string {
    return `accordion-content-${this.value}`;
  }

  get computedClasses(): string {
    const baseClasses = 'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline';
    const stateClasses = this.disabled 
      ? 'pointer-events-none opacity-50' 
      : '[&[data-state=open]>svg]:rotate-180';
    
    return `${baseClasses} ${stateClasses} ${this.className}`;
  }

  handleClick(): void {
    if (!this.disabled) {
      this.itemToggled.emit(this.value);
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    if ((event.key === 'Enter' || event.key === ' ') && !this.disabled) {
      event.preventDefault();
      this.handleClick();
    }
  }
}

/**
 * Individual accordion item component
 */
@Component({
  selector: 'ng-shadcn-accordion-item',
  standalone: true,
  imports: [CommonModule, AccordionTriggerComponent, AccordionContentComponent],
  template: `
    <div
      [class]="computedClasses"
      [attr.data-state]="isExpanded ? 'open' : 'closed'"
      [attr.data-disabled]="disabled">
      <ng-content select="ng-shadcn-accordion-trigger"></ng-content>
      <ng-content select="ng-shadcn-accordion-content"></ng-content>
    </div>
  `,
})
export class AccordionItemComponent {
  @Input() value = '';
  @Input() className = '';
  @Input() disabled = false;
  @Input() isExpanded = false;

  get computedClasses(): string {
    const baseClasses = 'border-b';
    return `${baseClasses} ${this.className}`;
  }
}

/**
 * Main accordion component
 */
@Component({
  selector: 'ng-shadcn-accordion',
  standalone: true,
  imports: [CommonModule, AccordionItemComponent, AccordionTriggerComponent, AccordionContentComponent],
  template: `
    <div [class]="computedClasses">
      <ng-content></ng-content>
    </div>
  `,
})
export class AccordionComponent implements AfterContentInit {
  @Input() type: 'single' | 'multiple' = 'single';
  @Input() collapsible = false;
  @Input() defaultValue: string | string[] = '';
  @Input() value: string | string[] = '';
  @Input() className = '';

  @Output() valueChange = new EventEmitter<string | string[]>();

  @ContentChildren(AccordionItemComponent) accordionItems!: QueryList<AccordionItemComponent>;
  @ContentChildren(AccordionTriggerComponent) accordionTriggers!: QueryList<AccordionTriggerComponent>;
  @ContentChildren(AccordionContentComponent) accordionContents!: QueryList<AccordionContentComponent>;

  private expandedItems = signal<string[]>([]);

  // Computed property for expanded items
  expandedState = computed(() => this.expandedItems());

  ngAfterContentInit(): void {
    // Set initial expanded items
    const initialValue = this.value || this.defaultValue;
    if (initialValue) {
      const initialItems = Array.isArray(initialValue) ? initialValue : [initialValue];
      this.expandedItems.set(initialItems);
    }

    // Subscribe to trigger events
    this.accordionTriggers.forEach(trigger => {
      trigger.itemToggled.subscribe(value => {
        this.toggleItem(value);
      });
    });

    this.updateItemStates();
  }

  ngOnChanges(): void {
    if (this.value) {
      const valueArray = Array.isArray(this.value) ? this.value : [this.value];
      this.expandedItems.set(valueArray);
      this.updateItemStates();
    }
  }

  private toggleItem(value: string): void {
    const currentExpanded = this.expandedItems();
    let newExpanded: string[];

    if (this.type === 'single') {
      // Single mode: only one item can be expanded at a time
      if (currentExpanded.includes(value)) {
        // If collapsible is true, allow closing the current item
        newExpanded = this.collapsible ? [] : currentExpanded;
      } else {
        newExpanded = [value];
      }
    } else {
      // Multiple mode: multiple items can be expanded
      if (currentExpanded.includes(value)) {
        newExpanded = currentExpanded.filter(item => item !== value);
      } else {
        newExpanded = [...currentExpanded, value];
      }
    }

    this.expandedItems.set(newExpanded);
    
    // Emit the appropriate value format
    const emitValue = this.type === 'single' 
      ? (newExpanded.length > 0 ? newExpanded[0] : '')
      : newExpanded;
    
    this.valueChange.emit(emitValue);
    this.updateItemStates();
  }

  private updateItemStates(): void {
    const expandedItems = this.expandedItems();

    // Update item states
    this.accordionItems?.forEach(item => {
      item.isExpanded = expandedItems.includes(item.value);
    });

    // Update trigger states
    this.accordionTriggers?.forEach(trigger => {
      trigger.isExpanded = expandedItems.includes(trigger.value);
    });

    // Update content states
    this.accordionContents?.forEach(content => {
      content.isExpanded = expandedItems.includes(content.value);
    });
  }

  get computedClasses(): string {
    const baseClasses = 'w-full';
    return `${baseClasses} ${this.className}`;
  }
}

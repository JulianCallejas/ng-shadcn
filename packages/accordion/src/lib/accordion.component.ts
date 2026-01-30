import { 
  Component, Input, Output, EventEmitter, signal, computed, 
  ContentChildren, QueryList, effect,
  OnChanges, SimpleChanges, 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionItemComponent } from './accordion-item.component';

// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';


declare const ngDevMode: boolean;
export interface AccordionProps {
  /**
   * The type of the accordion. Determines whether multiple items can be open at once.
   * @default 'single'
   */
  type?: 'single' | 'multiple';
  
  /**
   * The IDs of the items that should be expanded by default.
   * In 'single' mode, only the first ID will be used.
   */
  defaultExpanded?: string | string[];
  
  /**
   * Additional CSS classes to apply to the accordion container
   */
  class?: string;
  
}

/**
 * Main accordion component
 */
@Component({
  selector: 'ng-shadcn-accordion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="computedClasses()">
      <ng-content></ng-content>
    </div>
  `,
})
export class AccordionComponent implements OnChanges, AccordionProps {
  @Input() type: 'single' | 'multiple' = 'single';
  @Input() defaultExpanded: string | string[] = '';
  @Input() expandedItems?: string[];
  @Input() class = '';
  
  @Output() expandedItemsChange = new EventEmitter<string[]>();

  @ContentChildren(AccordionItemComponent) accordionItems!: QueryList<AccordionItemComponent>;

  /** @ignore */
  readonly expandedSet = signal<Set<string>>(new Set());
  
  /** @ignore */
  private readonly isControlled = computed(() => this.expandedItems !== undefined);
  
  /** @ignore */
  private readonly seenItemIds = new Set<string>();
  
  /** @ignore */
  private readonly items = signal<ReadonlyArray<AccordionItemComponent>>([]);
  
  constructor() {
    effect(() => {
      if (!ngDevMode) return;

      if (this.isControlled() && this.type === 'single' && this.expandedItems?.length > 1) {
        console.warn('[Accordion] type="single" is ignored when using expandedItems.');
      }

      if (this.isControlled() && this.defaultExpanded) {
        console.warn('[Accordion] defaultExpanded is ignored in controlled mode.');
      }
    });
    
    effect(() => {
      const expanded = this.expandedSet();
      const items = this.items();

      items.forEach(item =>
        item.isExpanded.set(expanded.has(item.id))
      );
    });
  }

  

  ngAfterContentInit(): void {
    const updateItems = () => {
      this.items.set(this.accordionItems.toArray());
    };
    updateItems();
    this.accordionItems.changes.subscribe(updateItems);
    
    if (!this.isControlled()) {
      const defaults = Array.isArray(this.defaultExpanded)
        ? this.defaultExpanded
        : this.defaultExpanded
          ? [this.defaultExpanded]
          : [];

      const initial =
        this.type === 'single' ? defaults.slice(0, 1) : defaults;

      this.expandedSet.set(new Set(initial));
    }

    this.accordionItems.forEach(item => {
      item.itemToggled.subscribe(id => this.toggleItem(id));

      if (ngDevMode) {
        if (this.seenItemIds.has(item.id)) {
          console.warn(`[Accordion] Duplicate accordion item ID: ${item.id}`);
        }
        this.seenItemIds.add(item.id);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('expandedItems' in changes) {
      this.expandedSet.set(new Set(this.expandedItems ?? []));
    }
  }
    
  /** @ignore */
  private getCurrentExpanded(): Set<string> {
    return this.isControlled()
      ? new Set(this.expandedItems ?? [])
      : new Set(this.expandedSet());
  }

  /** @ignore */
  private toggleItem(id: string): void {
    const current = this.getCurrentExpanded();
    const next = new Set(current);

    if (next.has(id)) {
      next.delete(id);
    } else {
      if (this.type !== 'multiple') {
        next.clear();
      }
      next.add(id);
    }

    if (!this.isControlled()) {
      this.expandedSet.set(next);
    }

    this.expandedItemsChange.emit([...next]);
  }
  
  /** @ignore */
  computedClasses(): string {
    return cn(
      'w-full',
      this.class
    );
  }
  
}

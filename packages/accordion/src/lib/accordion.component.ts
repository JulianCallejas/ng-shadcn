import { 
  Component, Input, Output, EventEmitter, signal, computed, 
  ContentChildren, QueryList, effect, 
  OnChanges, SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionItemComponent } from './accordion-item.component';
import { AccordionTriggerComponent } from './accordion-trigger.component';
import { AccordionContentComponent } from './accordion-content.component';
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
   * The currently expanded items. When provided, the component becomes controlled.
   * Use with expandedItemsChange to implement two-way binding.
   */
  expandedItems?: string[];
  
  /**
   * Additional CSS classes to apply to the accordion container
   */
  class?: string;
  
  /**
   * Event emitted when the expanded items change.
   * Only emitted in uncontrolled mode.
   */
  expandedItemsChange?: EventEmitter<string[]>;
  
  /**
   * Callback when an item is toggled
   * @param id The ID of the toggled item
   * @param isExpanded Whether the item is now expanded
   */
  onItemToggle?: (id: string, isExpanded: boolean) => void;
}

/**
 * Main accordion component
 */
@Component({
  selector: 'ng-shadcn-accordion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="computedClasses">
      <ng-content></ng-content>
    </div>
  `,
})
export class AccordionComponent implements AccordionProps, OnChanges {
  @Input() type: 'single' | 'multiple' = 'single';
  @Input() defaultExpanded: string | string[] = '';
  @Input() expandedItems?: string[];
  @Input() class = '';
  
  @Output() expandedItemsChange = new EventEmitter<string[]>();

  @ContentChildren(AccordionItemComponent) accordionItems!: QueryList<AccordionItemComponent>;
  @ContentChildren(AccordionTriggerComponent) accordionTriggers!: QueryList<AccordionTriggerComponent>;
  @ContentChildren(AccordionContentComponent) accordionContents!: QueryList<AccordionContentComponent>;

  readonly autoExpandedItems = signal<string[]>([]);
  private readonly isControlled = computed(() => this.expandedItems !== undefined);
  private initialized = false;
  private readonly seenItemIds = new Set<string>();

  constructor() {
    // Sync expanded items to children when autoExpandedItems changes
    effect(() => {
      const expanded = this.autoExpandedItems();
      this.syncChildren(expanded);
      
      // Only emit in uncontrolled mode
      if (!this.isControlled() && this.initialized) {
        this.expandedItemsChange.emit([...expanded]);
      }
    });
  }

  private updateControlledState(): void {
    if (!this.isControlled() || !this.expandedItems) return;
    
    // Only update if the state has actually changed
    const currentState = this.autoExpandedItems();
    const newState = [...(this.expandedItems || [])];
    
    if (JSON.stringify(currentState) !== JSON.stringify(newState)) {
      this.autoExpandedItems.set(newState);
      this.syncChildren(newState);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['expandedItems'] && this.isControlled()) {
      this.updateControlledState();
    } else if ((changes['defaultExpanded'] || changes['type']) && !this.initialized) {
      this.initializeFromDefaults();
    }

    if (ngDevMode) {
      this.validateProps();
    }
  }

  ngAfterContentInit(): void {
    this.initialized = true;
    
    // Set up item toggling
    this.accordionItems.forEach(item => {
      item.itemToggled.subscribe(id => this.toggleItem(id));
      
      if (ngDevMode) {
        if (this.seenItemIds.has(item.id)) {
          console.warn(`[Accordion] Duplicate accordion item ID: ${item.id}`);
        }
        this.seenItemIds.add(item.id);
      }
    });

    // Initial sync
    this.syncChildren(this.autoExpandedItems());
  }

  private toggleItem(id: string): void {
    if (this.isControlled()) {
      return; // No-op in controlled mode
    }
    
    const currentItems = this.autoExpandedItems();
    const index = currentItems.indexOf(id);
    let newItems: string[];

    if (index === -1) {
      // Item not in array, add it
      if (this.type === 'single') {
        newItems = [id];
      } else {
        newItems = [...currentItems, id];
      }
    } else {
      // Item in array, remove it
      newItems = [...currentItems];
      newItems.splice(index, 1);
    }
    this.autoExpandedItems.set(newItems);
  }

  private syncChildren(expandedItems: string[]): void {
    this.accordionItems?.forEach(item => {
      item.isExpanded = expandedItems.includes(item.id);
    });
  }

  private initializeFromDefaults(): void {
    if (this.isControlled()) return;

    let defaultExpanded = Array.isArray(this.defaultExpanded) 
      ? this.defaultExpanded 
      : this.defaultExpanded ? [this.defaultExpanded] : [];

    if (this.type === 'single' && defaultExpanded.length > 0) {
      defaultExpanded = [defaultExpanded[0]];
    }

    this.autoExpandedItems.set(defaultExpanded);
  }

  private validateProps(): void {
    if (ngDevMode) {
      if (this.isControlled() && this.type === 'single' && this.expandedItems && this.expandedItems.length > 1) {
        console.warn('[Accordion] type="single" is ignored when using expandedItems. The accordion will behave as multiple.');
      }
      
      if (this.isControlled() && this.defaultExpanded) {
        console.warn('[Accordion] defaultExpanded is ignored in controlled mode. Use expandedItems instead.');
      }
    }
  }

  get computedClasses(): string {
    return cn(
      'w-full',
      this.class
    );
  }
}

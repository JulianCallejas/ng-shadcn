import { 
  Component, Input, Output, EventEmitter, signal, computed, 
  ContentChildren, QueryList, effect, booleanAttribute, 
  inject, OnChanges, SimpleChanges, AfterContentInit,
  ContentChild,
  DestroyRef,
  EnvironmentInjector,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';

declare const ngDevMode: boolean;

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
      display: block;
    }
    100% { 
      height: 0; 
      display: none;
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
    return `${baseClasses} ${stateClasses} ${this.class}`.trim();
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
      class="gap-2 w-full"
      [class]="computedClasses"
      [attr.data-state]="dataState"
      [disabled]="isDisabled"
      [attr.aria-expanded]="isExpanded"
      [attr.aria-controls]="contentId"
      [attr.id]="triggerId"
      (click)="handleClick()"
      (keydown.enter)="handleKeyDown($event)"
      (keydown.space)="handleKeyDown($event)">
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
  id = '';
  @Input() class = '';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) isExpanded = false;
  

  @Output() itemToggled = new EventEmitter<string>();

   get dataState(): 'open' | 'closed' {
    return this.isExpanded ? 'open' : 'closed';
  }

  get triggerId(): string {
    return `accordion-trigger-${this.id}`;
  }

  get contentId(): string {
    return `accordion-content-${this.id}`;
  }

  get isDisabled(): boolean {
    return this.disabled;
  }

  get computedClasses(): string {
    const baseClasses = 'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline';
    const stateClasses = this.disabled
      ? 'pointer-events-none opacity-50'
      : '[&[data-state=open]>svg]:rotate-180';

    return `${baseClasses} ${stateClasses} ${this.class}`.trim();
  }

  handleClick(): void {
    if (!this.disabled) {
      this.itemToggled.emit(this.id);
    }
  }

  handleKeyDown(event: Event): void {
    if (event instanceof KeyboardEvent) {
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
  imports: [CommonModule],
  template: `
    <div
      [class]="computedClasses"
      [attr.data-state]="isExpanded ? 'open' : 'closed'"
      [attr.data-disabled]="disabled">
      <ng-content select="ng-shadcn-accordion-trigger" 
        (itemToggled)="onItemToggled($event)">
      </ng-content>
      <ng-content select="ng-shadcn-accordion-content" 
        >
      </ng-content>
    </div>
  `,
})
export class AccordionItemComponent implements AfterContentInit {
  @Input({ required: true }) id = '';
  @Input() class = '';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) isExpanded = false;
  @ContentChild(AccordionTriggerComponent) trigger?: AccordionTriggerComponent;
  @ContentChild(AccordionContentComponent) content?: AccordionContentComponent;
  private destroyRef = inject(DestroyRef);
  private expandedItems = inject(AccordionComponent).autoExpandedItems;

  @Output() itemToggled = new EventEmitter<string>();

  constructor(private cdr: ChangeDetectorRef) {
    effect(() => {
      this.updateExpandedState();
    }, { injector: inject(EnvironmentInjector) });
  }
  

  ngAfterContentInit() { 
    this.updateExpandedState();
    
    if (this.trigger) { 
      this.trigger.id = this.id;
      this.trigger.isExpanded = this.isExpanded; 
      this.trigger.itemToggled.subscribe(value => { this.onItemToggled(value); })
    } 
    if (this.content) { 
      this.content.id = this.id; 
      this.content.isExpanded = this.isExpanded; 
    }

  }

  private updateExpandedState(): void {
    const isExpanded = this.expandedItems().includes(this.id);
    this.isExpanded = isExpanded;
    
    // Update child components
    if (this.trigger) this.trigger.isExpanded = isExpanded;
    if (this.content) this.content.isExpanded = isExpanded;
    this.cdr.markForCheck();
  }

  onItemToggled(id: string): void {
    if (!this.disabled) {
      this.itemToggled.emit(id);
    }
  }

  get computedClasses(): string {
    return `border-b ${this.class}`.trim();
  }
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
export class AccordionComponent implements OnChanges {
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
    return `w-full ${this.class}`.trim();
  }
}

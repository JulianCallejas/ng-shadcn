import { 
  Component, Input, Output, EventEmitter, signal, computed, 
  ContentChildren, QueryList, effect,
  input,
  InputSignal,
  inject,
  DestroyRef,
  ChangeDetectionStrategy, 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionItemComponent } from './accordion-item.component';

// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


declare const ngDevMode: boolean;

/**
 * Main accordion component
 */
@Component({
  selector: 'ng-shadcn-accordion',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="computedClasses()">
      <ng-content></ng-content>
    </div>
  `,
})
export class AccordionComponent {
  
  /**
   * The expanded items controlled by the parent component.
   */
  expandedItems = input<string[] | undefined>(undefined);
  
  /**
   * The type of accordion behavior.
   * 
   * - **single**: only one item can be expanded at a time.
   * - **multiple**: multiple items can be expanded at the same time.
   * 
   */
  readonly type = input<'single' | 'multiple'>('single');
  
    
  /**
   * Additional CSS classes to be applied to the accordion container.
   * 
   * @default ''
   */
  readonly class = input<string>('');
  
  /**
   * Emits the updated expanded items when the component's state changes.
   * 
   * @default new EventEmitter<string[]>()
   */
  @Output() expandedItemsChange = new EventEmitter<string[]>();

  /**
   * The collection of AccordionItemComponent instances nested within the AccordionComponent.
   * 
   * This is used internally by the AccordionComponent to manage the state of the accordion.
   * 
   */
  @ContentChildren(AccordionItemComponent) accordionItems!: QueryList<AccordionItemComponent>;

  /**
   * The item(s) that will be expanded by default when the component loads.
   * 
   * This input is ignored when using expandedItems.
   * 
   * @default ''
   */
  @Input() defaultExpanded: string | string[] = '';

  
  /** @ignore */
  private readonly isControlled = computed(() => this.expandedItems() !== undefined);

  /** @ignore */
  readonly privateExpandedItems = signal<string[] | undefined>(undefined);
  
  /** @ignore */
  readonly expandedSet = computed<Set<string>>(() => {
    const value = this.isControlled()
      ? this.expandedItems()
      : this.privateExpandedItems();

    return new Set(value ?? []);
  });
  
  /** @ignore */
  private readonly seenItemIds = new Set<string>();

  /** @ignore */
  private destroyRef = inject(DestroyRef);
  
  constructor() {
    effect(() => {
      if (!ngDevMode) return;

      if (this.isControlled() && this.type() === 'single' && this.expandedItems()?.length > 1) {
        console.warn('[Accordion] type="single" is ignored when using expandedItems.');
      }

      if (this.isControlled() && this.defaultExpanded) {
        console.warn('[Accordion] defaultExpanded is ignored in controlled mode.');
      }
    });
  }

  /** @ignore */
  ngAfterContentInit(): void {
    if (!this.isControlled()) {
      const defaults = Array.isArray(this.defaultExpanded)
        ? this.defaultExpanded
        : this.defaultExpanded
          ? [this.defaultExpanded]
          : [];

      const initial =
        this.type() === 'single' ? defaults.slice(0, 1) : defaults;

      this.privateExpandedItems.set(initial);
    }

    // Subscribe to item toggles and handle cleanup
    this.seenItemIds.clear();
    this.accordionItems.forEach(item => {
      item.itemToggled
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(id => this.toggleItem(id));

      if (ngDevMode) {
        if (this.seenItemIds.has(item.id)) {
          console.warn(`[Accordion] Duplicate accordion item ID: ${item.id}`);
        }
        this.seenItemIds.add(item.id);
      }
    });
  }

  /** @ignore */
  private toggleItem(id: string): void {
    const next = new Set(this.expandedSet());

    if (next.has(id)) {
      next.delete(id);
    } else {
      if (this.type() !== 'multiple') {
        next.clear();
      }
      next.add(id);
    }

    if (!this.isControlled()) {
      this.privateExpandedItems.set([...next]);
    }

    this.expandedItemsChange.emit([...next]);
  }
  
  /** @ignore */
  computedClasses = computed(()=>
    cn(
      'w-full',
      this.class()
    )
  );
  
}

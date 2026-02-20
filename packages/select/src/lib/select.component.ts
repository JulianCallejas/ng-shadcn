import {
  Component,
  Output,
  EventEmitter,
  computed,
  signal,
  forwardRef,
  input,
  booleanAttribute,
  viewChild,
  ElementRef,
  model,
  linkedSignal,
  effect,
  inject,
  contentChildren} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectSearchComponent } from './select-search.component';
import { SelectItemComponent } from './select-item.component';

// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  component?: boolean;
}

/**
 * Select component with dropdown, search functionality, and form integration
 * Supports keyboard navigation and accessibility features
 */
@Component({
  selector: 'ng-shadcn-select',
  standalone: true,
  imports: [CommonModule, SelectSearchComponent, SelectItemComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  template: `
    <div class="relative w-full" [id]="id()">
    <ng-content select="ng-shadcn-select-trigger"></ng-content>

      @if (isOpen()) {
        <!-- Dropdown -->
        <div
          #optionsContainer
          [id]="id() + '-optionsContainer'"
          [class]="computedClasses()"
          role="listbox"
          aria-label="Select options"
        >
          <!-- Search input -->
          @if (searchable()) {
            <ng-shadcn-select-search></ng-shadcn-select-search>
          }

          <!-- Options -->
          <div class="py-1">
            <!-- Array Options -->
            @for ( option of options(); track option.value ) {
              <ng-shadcn-select-item [option]="option"></ng-shadcn-select-item>
            }
            <!-- Custom Options -->
            <ng-content select="ng-shadcn-select-item"></ng-content>

            <!-- No options -->
            @if (renderedItems().length === 0){
              <div class="py-2 px-3 text-sm text-muted-foreground">
                No options found
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
})
export class SelectComponent implements ControlValueAccessor {
  options = input<SelectOption[]>([]);
  controlledDisabled = input(false, { transform: booleanAttribute, alias: 'disabled' });
  searchable = input(false, { transform: booleanAttribute });
  searchClass = input('');
  searchPlaceholder = input('');
  value = model<string | null>(null);
  class = input('');
  _id = input('', {alias: 'id'});
  
  @Output() selectionChange = new EventEmitter<SelectOption | null>();
  
  /** @ignore */
  id = linkedSignal(this._id);

  /** @ignore */
  contentChildren = contentChildren(SelectItemComponent);

  /** @ignore */
  selectedOption = computed<SelectOption | undefined>(() => {
    const selectedValue = this.value();
    return this.renderedItems().find(option => option.value === selectedValue);
  });
  
  /** @ignore */
  renderedItems = computed(()=>{
    const term = this.debouncedSearch().toLowerCase();
    if (!term) return [
      ...this.options(),
      ...this.contentChildren().map(child=> child.itemData())
    ];
    let filteredContentChildren: SelectOption[] = [];
    this.contentChildren().forEach(child => {
      if (child.itemData().label.toLowerCase().includes(term)) {
        filteredContentChildren.push(child.itemData());
      }
    });
    return [
      ...[...this.options()].filter(option => option.label.toLowerCase().includes(term)),
      ...filteredContentChildren
    ]
  });
  
  /** @ignore */
  searchInput = viewChild(SelectSearchComponent);
  
  /** @ignore */
  searchTerm = signal('');
  
  /** @ignore */
  debouncedSearch = signal('');

  /** @ignore */
  optionsContainer = viewChild<ElementRef>('optionsContainer');
  
  /** @ignore */
  disabled = linkedSignal(this.controlledDisabled);
  
  /** @ignore */
  isOpen = signal(false);
  
  /** @ignore */
  highlightedItem = signal<SelectOption | null>(null);

  /** @ignore */
  private elementRef = inject(ElementRef<HTMLElement>);

  /** @ignore */
  itemIndexMap = computed(() => {
    const map = new Map<string, number>();
    this.renderedItems().forEach((item, i) => map.set(item.value, i));
    return map;
  });
  
  constructor(){
    if (!this.id()) {
      this.id.set(`sel-${crypto.getRandomValues(new Uint32Array(1))[0]}`);
    }

    effect((onCleanup) => {
      const term = this.searchTerm();
      if (term === this.debouncedSearch()) return;

      const timeout = setTimeout(() =>
        this.debouncedSearch.set(term),
        150
      );
      onCleanup(() => clearTimeout(timeout));
    });

    // Close when click outside the component
    effect((onCleanup) => {
      if (!this.isOpen()) return;

      const handler = (event: PointerEvent) => {
        if (!this.elementRef.nativeElement.contains(event.target)) {
          this.closeDropdown();
        }
      };

      document.addEventListener('pointerdown', handler);

      onCleanup(() => {
        document.removeEventListener('pointerdown', handler);
      });
    });

    effect(() => {
      if (!this.isOpen() || !this.searchable()) return;

      queueMicrotask(() => this.focusSearchInput());
    });
  }

  /** @ignore */
  toggleDropdown() {
    if (this.disabled()) return;
    
    if (this.isOpen()) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  /** @ignore */
  openDropdown() {
    this.isOpen.set(true);
    if (!this.value()) this.highlightedItem.set(null);
  }

  /** @ignore */
  private focusSearchInput() {
    const searchInput = this.searchInput()
      ?.elementRef.nativeElement
      .querySelector('input');

    searchInput?.focus();
  }

  /** @ignore */
  closeDropdown() {
    this.isOpen.set(false);
    this.searchTerm.set('');
    if (!this.value()) this.highlightedItem.set(null);
    this.onTouched();
  }

  /** @ignore */
  selectOption(option: SelectOption) {
    if (option.disabled) return;
    
    this.value.set(option.value);
    this.onChange(option.value);
    this.selectionChange.emit(option);
    this.closeDropdown();
  }

  /** @ignore */
  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
    this.highlightedItem.set(null);
  }

  /** @ignore */
  onTriggerKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen()) this.openDropdown();
        this.navigateOptions(1);
        break;
      
      case 'ArrowUp':
        event.preventDefault();
        if (this.isOpen()) {
          this.navigateOptions(-1);
        }
        break;
      
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!this.isOpen()) {
          this.openDropdown();
          return;
        }
        const highlighted = this.highlightedItem();
        if (highlighted && !highlighted.disabled) {
          this.selectOption(highlighted);
        }else{
          this.closeDropdown();
        }
        break;

      case 'Escape':
        this.closeDropdown();
        break;
    }
  }

  /** @ignore */
  onSearchKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.navigateOptions(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.navigateOptions(-1);
        break;
      case 'Enter':
        event.preventDefault();
        const highlighted = this.highlightedItem();
        if (highlighted && !highlighted.disabled) {
          this.selectOption(highlighted);
        }
        break;
      case 'Escape':
        this.closeDropdown();
        break;
    }
  }

  /** @ignore */
  private navigateOptions(direction: number) {
    const options = this.renderedItems();
    if (options.length === 0) return;

    const currentIndex = this.itemIndexMap().get(this.highlightedItem()?.value) ?? -1;
    let newIndex = currentIndex + direction;
   
    // Wrap around
    if (newIndex < 0) {
      newIndex = options.length - 1;
    } else if (newIndex >= options.length) {
      newIndex = 0;
    }

    // Skip disabled options
    let attempts = 0;
    while (options[newIndex]?.disabled && attempts < options.length) {
      newIndex += direction;
      if (newIndex < 0) newIndex = options.length - 1;
      if (newIndex >= options.length) newIndex = 0;
      attempts++;
    }
    if (attempts === options.length) return;
    this.highlightedItem.set(options[newIndex]);
  }

  /** @ignore */
    computedClasses = computed(() => cn(
      'absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-md max-h-60 overflow-auto',
      this.class()
    ));

   // ControlValueAccessor implementation
  private onChange = (value: string | null) => {};
  private onTouched = () => {};

  writeValue(value: string | null): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}

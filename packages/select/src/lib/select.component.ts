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
  contentChildren,
  viewChildren,
  effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { SelectSearchComponent } from './select-search.component';
import { SelectItemComponent } from './select-item.component';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * Select component with dropdown, search functionality, and form integration
 * Supports keyboard navigation and accessibility features
 */
@Component({
  selector: 'ng-shadcn-select',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectSearchComponent, SelectItemComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  template: `
    <div class="relative w-full">
      <ng-content select="ng-shadcn-select-trigger"></ng-content>

      <!-- Dropdown -->
      <div
        *ngIf="isOpen()"
        class="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-md max-h-60 overflow-auto"
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
          @for (option of filteredOptions(); track option.value) {
            <ng-shadcn-select-item [option]="option"></ng-shadcn-select-item>
          }

          <!-- Content Options -->
          @if (!searchTerm()){
            <ng-content select="ng-shadcn-select-item"></ng-content>
          }
          
          <!-- No options -->
          @if (filteredOptions().length === 0){
            <div class="py-2 px-3 text-sm text-muted-foreground">
              No options found
            </div>
          }
        </div>
      </div>
    </div>

    <!-- Backdrop -->
    @if (isOpen()) {
      <div
        class="fixed inset-0 z-40"
        (click)="closeDropdown()"
      ></div>
    }
  `,
})
export class SelectComponent implements ControlValueAccessor {
  options = input<SelectOption[]>([]);
  disabled = input(false, { transform: booleanAttribute });
  searchable = input(false, { transform: booleanAttribute });
  searchClass = input('');
  searchPlaceholder = input('');

 

  @Output() selectionChange = new EventEmitter<SelectOption | null>();
  
  searchInput = viewChild(SelectSearchComponent);
  searchTerm = signal('');

  viewItems = viewChildren(SelectItemComponent);
  contentItems = contentChildren(SelectItemComponent);
  itemList = computed(() => [...this.viewItems(), ...this.contentItems()]);

  constructor(){
    effect(()=>{
      if (!this.isOpen()) return;

      const items = this.itemList();
      if (items.length === 0) return;
      
      items.forEach((item, index) => {
        item.isHighlighted = computed(()=> this.highlightedIndex() === index);
        item.isSelected = computed(()=> this.selectedValue() === item.itemData().value);
      });
    });
    
    effect(onCleanup => {
      if (!this.isOpen()) return;
      
      const items = this.itemList();
      if (items.length === 0) return;
      

      const subs = items.map(item => {
        return item.onSelectOption
          .subscribe((option) => {
            this.selectOption(option);
          });
      });
      
      onCleanup(() => {
        subs.forEach(sub => sub.unsubscribe());
      });
    });
    
  }

  // Signals for reactive state
  protected selectedValue = signal<string | null>(null);
  protected isOpen = signal(false);
  protected highlightedIndex = signal(-1);
  getIsOpen = computed(() => this.isOpen());
  
  // Computed properties
  selectedOption = computed(() => {
    const value = this.selectedValue();
    return this.options().find(option => option.value === value) || null;
  });

  filteredOptions = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.options();
    const filteredOptions = this.options().filter(option => 
      option.label.toLowerCase().includes(term)
    );
    const filteredContentOptions = 
      this.contentItems().reduce((acc, item)=>{
        if (item.itemData().label.toLowerCase().includes(term)) {
          acc.push(item.itemData());
        }
        return acc;
      }, [] as SelectOption[])
    return [...filteredOptions, ...filteredContentOptions];
  });

  toggleDropdown() {
    if (this.disabled()) return;
    
    if (this.isOpen()) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  openDropdown() {
    this.isOpen.set(true);
    this.highlightedIndex.set(-1);
    
    // Focus search input if searchable
    if (this.searchable()) {
      setTimeout(() => {
        const searchInput = this.searchInput()?.elementRef.nativeElement.querySelector('input');
        searchInput?.focus();
      });
    }
  }

  closeDropdown() {
    this.isOpen.set(false);
    this.searchTerm.set('');
    this.highlightedIndex.set(-1);
    this.onTouched();
  }

  selectOption(option: SelectOption) {
    if (option.disabled) return;
    
    this.selectedValue.set(option.value);
    this.onChange(option.value);
    this.selectionChange.emit(option);
    this.closeDropdown();
  }

  setHighlightedIndex(index: number) {
    this.highlightedIndex.set(index);
  }

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
    this.highlightedIndex.set(-1);
  }

  onTriggerKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.toggleDropdown();
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen()) {
          this.openDropdown();
        } else {
          this.navigateOptions(1);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (this.isOpen()) {
          this.navigateOptions(-1);
        }
        break;
      case 'Escape':
        this.closeDropdown();
        break;
    }
  }

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
        const highlighted = this.filteredOptions()[this.highlightedIndex()];
        if (highlighted && !highlighted.disabled) {
          this.selectOption(highlighted);
        }
        break;
      case 'Escape':
        this.closeDropdown();
        break;
    }
  }

  private navigateOptions(direction: number) {
    const options = this.itemList();
    if (options.length === 0) return;

    let newIndex = this.highlightedIndex() + direction;
    
    // Wrap around
    if (newIndex < 0) {
      newIndex = options.length - 1;
    } else if (newIndex >= options.length) {
      newIndex = 0;
    }

    // Skip disabled options
    while (options[newIndex]?.isDisabled()) {
      newIndex += direction;
      if (newIndex < 0) newIndex = options.length - 1;
      if (newIndex >= options.length) newIndex = 0;
    }

    this.highlightedIndex.set(newIndex);
  }

   // ControlValueAccessor implementation
  private onChange = (value: string | null) => {};
  private onTouched = () => {};

  writeValue(value: string | null): void {
    this.selectedValue.set(value);
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}

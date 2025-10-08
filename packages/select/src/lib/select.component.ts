import { Component, Input, Output, EventEmitter, computed, signal, forwardRef, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';

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

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends VariantProps<typeof selectVariants> {
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  options: SelectOption[];
}

/**
 * Select component with dropdown, search functionality, and form integration
 * Supports keyboard navigation and accessibility features
 */
@Component({
  selector: 'ng-shadcn-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  template: `
    <div class="relative w-full">
      <button
        #trigger
        type="button"
        [class]="computedClasses()"
        [disabled]="disabled"
        (click)="toggleDropdown()"
        (keydown)="onTriggerKeydown($event)"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-haspopup]="true"
        [attr.aria-label]="placeholder || 'Select option'"
      >
        <span class="block truncate text-left">
          {{ selectedOption()?.label || placeholder || 'Select...' }}
        </span>
        <svg
          class="ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform"
          [class.rotate-180]="isOpen()"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <!-- Dropdown -->
      <div
        *ngIf="isOpen()"
        class="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-md max-h-60 overflow-auto"
        role="listbox"
        [attr.aria-label]="placeholder || 'Select options'"
      >
        <!-- Search input -->
        <div *ngIf="searchable" class="p-2 border-b border-border">
          <input
            #searchInput
            type="text"
            class="w-full px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Search..."
            [(ngModel)]="searchTerm"
            (input)="onSearch($event)"
            (keydown)="onSearchKeydown($event)"
          />
        </div>

        <!-- Options -->
        <div class="py-1">
          <div
            *ngFor="let option of filteredOptions(); let i = index"
            class="relative cursor-pointer select-none py-2 px-3 text-sm hover:bg-accent hover:text-accent-foreground"
            [class.bg-accent]="highlightedIndex() === i"
            [class.text-accent-foreground]="highlightedIndex() === i"
            [class.opacity-50]="option.disabled"
            [class.cursor-not-allowed]="option.disabled"
            (click)="selectOption(option)"
            (mouseenter)="setHighlightedIndex(i)"
            role="option"
            [attr.aria-selected]="selectedValue() === option.value"
            [attr.aria-disabled]="option.disabled"
          >
            <span class="block truncate">{{ option.label }}</span>
            <svg
              *ngIf="selectedValue() === option.value"
              class="absolute right-2 top-2.5 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
          
          <div *ngIf="filteredOptions().length === 0" class="py-2 px-3 text-sm text-muted-foreground">
            No options found
          </div>
        </div>
      </div>
    </div>

    <!-- Backdrop -->
    <div
      *ngIf="isOpen()"
      class="fixed inset-0 z-40"
      (click)="closeDropdown()"
    ></div>
  `,
})
export class SelectComponent implements SelectProps, ControlValueAccessor {
  @Input() options: SelectOption[] = [];
  @Input() placeholder?: string;
  @Input() disabled = false;
  @Input() searchable = false;
  @Input() size: SelectProps['size'] = 'default';
  @Input() className = '';

  @Output() selectionChange = new EventEmitter<SelectOption | null>();

  @ViewChild('trigger') trigger!: ElementRef<HTMLButtonElement>;
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  // Signals for reactive state
  protected selectedValue = signal<string | null>(null);
  protected isOpen = signal(false);
  protected searchTerm = signal('');
  protected highlightedIndex = signal(-1);
  private sizeSignal = signal(this.size);
  private classNameSignal = signal(this.className);

  // Computed properties
  selectedOption = computed(() => {
    const value = this.selectedValue();
    return this.options.find(option => option.value === value) || null;
  });

  filteredOptions = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.options;
    return this.options.filter(option => 
      option.label.toLowerCase().includes(term)
    );
  });

  computedClasses = computed(() => {
    return selectVariants({
      size: this.sizeSignal(),
      className: this.classNameSignal(),
    });
  });

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

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit() {
    this.sizeSignal.set(this.size);
    this.classNameSignal.set(this.className);
  }

  ngOnChanges() {
    this.sizeSignal.set(this.size);
    this.classNameSignal.set(this.className);
  }

  toggleDropdown() {
    if (this.disabled) return;
    
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
    if (this.searchable) {
      setTimeout(() => {
        this.searchInput?.nativeElement?.focus();
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
    const options = this.filteredOptions();
    if (options.length === 0) return;

    let newIndex = this.highlightedIndex() + direction;
    
    // Wrap around
    if (newIndex < 0) {
      newIndex = options.length - 1;
    } else if (newIndex >= options.length) {
      newIndex = 0;
    }

    // Skip disabled options
    while (options[newIndex]?.disabled) {
      newIndex += direction;
      if (newIndex < 0) newIndex = options.length - 1;
      if (newIndex >= options.length) newIndex = 0;
    }

    this.highlightedIndex.set(newIndex);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.trigger?.nativeElement.contains(event.target as Node)) {
      this.closeDropdown();
    }
  }
}

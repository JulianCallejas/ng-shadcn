import { Component, Input, Output, EventEmitter, computed, signal, forwardRef, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';

const radioVariants = cva(
  'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        default: 'h-4 w-4',
        sm: 'h-3 w-3',
        lg: 'h-5 w-5',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends VariantProps<typeof radioVariants> {
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

/**
 * Radio Group component with form integration and keyboard navigation
 * Supports both template-driven and reactive forms
 */
@Component({
  selector: 'ng-shadcn-radio-group',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true,
    },
  ],
  template: `
    <div
      role="radiogroup"
      [class]="containerClasses()"
      [attr.aria-label]="ariaLabel"
      [attr.aria-describedby]="ariaDescribedby"
      [attr.aria-disabled]="disabled"
      (keydown)="onKeydown($event)"
    >
      <div
        *ngFor="let option of options; let i = index"
        class="flex items-center space-x-2"
        [class.opacity-50]="option.disabled || disabled"
      >
        <button
          type="button"
          role="radio"
          [class]="computedClasses()"
          [class.bg-primary]="selectedValue() === option.value"
          [class.border-primary]="selectedValue() === option.value"
          [disabled]="option.disabled || disabled"
          [attr.aria-checked]="selectedValue() === option.value"
          [attr.aria-disabled]="option.disabled || disabled"
          [attr.tabindex]="getTabIndex(option.value, i)"
          (click)="selectOption(option)"
          (focus)="setFocusedIndex(i)"
        >
          <!-- Selected indicator -->
          <div
            *ngIf="selectedValue() === option.value"
            class="flex items-center justify-center w-full h-full"
          >
            <div class="h-2.5 w-2.5 rounded-full bg-primary-foreground"></div>
          </div>
        </button>

        <div class="grid gap-1.5 leading-none">
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            [class.text-xs]="size === 'sm'"
            [class.text-base]="size === 'lg'"
            (click)="selectOption(option)"
          >
            {{ option.label }}
          </label>
          <p
            *ngIf="option.description"
            class="text-xs text-muted-foreground"
            [class.text-xs]="size === 'sm'"
            [class.text-sm]="size === 'lg'"
          >
            {{ option.description }}
          </p>
        </div>
      </div>
    </div>
  `,
})
export class RadioGroupComponent implements RadioGroupProps, ControlValueAccessor, AfterContentInit {
  @Input() options: RadioOption[] = [];
  @Input() disabled = false;
  @Input() orientation: RadioGroupProps['orientation'] = 'vertical';
  @Input() size: RadioGroupProps['size'] = 'default';
  @Input() className = '';
  @Input() ariaLabel?: string;
  @Input() ariaDescribedby?: string;

  @Output() selectionChange = new EventEmitter<RadioOption>();

  // Signals for reactive state
  protected selectedValue = signal<string | null>(null);
  private focusedIndex = signal(0);
  private sizeSignal = signal(this.size);
  private classNameSignal = signal(this.className);
  private orientationSignal = signal(this.orientation);

  // Computed properties
  computedClasses = computed(() => {
    return radioVariants({
      size: this.sizeSignal(),
      className: this.classNameSignal(),
    });
  });

  containerClasses = computed(() => {
    const orientation = this.orientationSignal();
    return orientation === 'horizontal' 
      ? 'flex flex-row gap-6' 
      : 'grid gap-2';
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
    this.orientationSignal.set(this.orientation);
  }

  ngOnChanges() {
    this.sizeSignal.set(this.size);
    this.classNameSignal.set(this.className);
    this.orientationSignal.set(this.orientation);
  }

  ngAfterContentInit() {
    // Set initial focus to first enabled option or selected option
    const selectedIndex = this.options.findIndex(option => option.value === this.selectedValue());
    if (selectedIndex >= 0) {
      this.focusedIndex.set(selectedIndex);
    } else {
      const firstEnabledIndex = this.options.findIndex(option => !option.disabled);
      this.focusedIndex.set(Math.max(0, firstEnabledIndex));
    }
  }

  selectOption(option: RadioOption) {
    if (option.disabled || this.disabled) return;

    this.selectedValue.set(option.value);
    this.onChange(option.value);
    this.selectionChange.emit(option);
    this.onTouched();
  }

  setFocusedIndex(index: number) {
    this.focusedIndex.set(index);
  }

  getTabIndex(value: string, index: number): number {
    // Only the selected radio button or the first one should be tabbable
    if (this.selectedValue()) {
      return this.selectedValue() === value ? 0 : -1;
    }
    return index === 0 ? 0 : -1;
  }

  onKeydown(event: KeyboardEvent) {
    const enabledOptions = this.options.filter(option => !option.disabled);
    if (enabledOptions.length === 0) return;

    let newIndex = this.focusedIndex();
    let handled = false;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        handled = true;
        newIndex = this.getNextEnabledIndex(1);
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        handled = true;
        newIndex = this.getNextEnabledIndex(-1);
        break;
      case 'Home':
        handled = true;
        newIndex = this.options.findIndex(option => !option.disabled);
        break;
      case 'End':
        handled = true;
        for (let i = this.options.length - 1; i >= 0; i--) {
          if (!this.options[i].disabled) {
            newIndex = i;
            break;
          }
        }
        break;
      case ' ':
      case 'Enter':
        handled = true;
        const focusedOption = this.options[this.focusedIndex()];
        if (focusedOption && !focusedOption.disabled) {
          this.selectOption(focusedOption);
        }
        break;
    }

    if (handled) {
      event.preventDefault();
      if (newIndex !== this.focusedIndex() && newIndex >= 0) {
        this.focusedIndex.set(newIndex);
        // Focus the radio button
        const radioButtons = document.querySelectorAll('[role="radio"]');
        const targetButton = radioButtons[newIndex] as HTMLElement;
        targetButton?.focus();
      }
    }
  }

  private getNextEnabledIndex(direction: number): number {
    let currentIndex = this.focusedIndex();
    let newIndex = currentIndex;
    
    do {
      newIndex = (newIndex + direction + this.options.length) % this.options.length;
    } while (this.options[newIndex]?.disabled && newIndex !== currentIndex);

    return newIndex;
  }
}

import { Component, Input, Output, EventEmitter, computed, signal, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';

const checkboxVariants = cva(
  'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
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

export interface CheckboxProps extends VariantProps<typeof checkboxVariants> {
  disabled?: boolean;
  indeterminate?: boolean;
}

/**
 * Checkbox component with indeterminate state, accessibility features, and form integration
 * Supports signal-based state management and multiple sizes
 */
@Component({
  selector: 'ng-shadcn-checkbox',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
  template: `
    <div class="flex items-center space-x-2">
      <button
        type="button"
        role="checkbox"
        [class]="computedClasses()"
        [class.bg-primary]="checked() && !indeterminate"
        [class.border-primary]="checked() && !indeterminate"
        [class.bg-primary]="indeterminate"
        [class.border-primary]="indeterminate"
        [disabled]="disabled"
        [attr.aria-checked]="indeterminate ? 'mixed' : checked()"
        [attr.aria-disabled]="disabled"
        [attr.aria-label]="ariaLabel"
        [attr.aria-describedby]="ariaDescribedby"
        (click)="toggle()"
        (keydown)="onKeydown($event)"
      >
        <!-- Checked state -->
        <svg
          *ngIf="checked() && !indeterminate"
          class="h-full w-full text-primary-foreground"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>

        <!-- Indeterminate state -->
        <svg
          *ngIf="indeterminate"
          class="h-full w-full text-primary-foreground"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <rect x="4" y="9" width="12" height="2" rx="1" />
        </svg>
      </button>

      <!-- Label content -->
      <div *ngIf="hasLabelContent" class="grid gap-1.5 leading-none">
        <label
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          [class.text-xs]="size === 'sm'"
          [class.text-base]="size === 'lg'"
          (click)="toggle()"
        >
          <ng-content select="[slot=label]"></ng-content>
        </label>
        <p
          *ngIf="hasDescriptionContent"
          class="text-xs text-muted-foreground"
          [class.text-xs]="size === 'sm'"
          [class.text-sm]="size === 'lg'"
        >
          <ng-content select="[slot=description]"></ng-content>
        </p>
      </div>
    </div>
  `,
})
export class CheckboxComponent implements CheckboxProps, ControlValueAccessor {
  @Input() disabled = false;
  @Input() indeterminate = false;
  @Input() size: CheckboxProps['size'] = 'default';
  @Input() className = '';
  @Input() ariaLabel?: string;
  @Input() ariaDescribedby?: string;

  @Output() checkedChange = new EventEmitter<boolean>();

  // Signals for reactive state
  protected checked = signal(false);
  private sizeSignal = signal(this.size);
  private classNameSignal = signal(this.className);

  // Check if there's content projected
  hasLabelContent = false;
  hasDescriptionContent = false;

  // Computed properties
  computedClasses = computed(() => {
    return checkboxVariants({
      size: this.sizeSignal(),
      className: this.classNameSignal(),
    });
  });

  // ControlValueAccessor implementation
  private onChange = (value: boolean) => {};
  private onTouched = () => {};

  writeValue(value: boolean): void {
    this.checked.set(!!value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
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

  ngAfterContentInit() {
    // Check for projected content
    this.hasLabelContent = true; // Assume content exists for now
    this.hasDescriptionContent = true; // Assume content exists for now
  }

  toggle() {
    if (this.disabled) return;

    const newValue = !this.checked();
    this.checked.set(newValue);
    this.onChange(newValue);
    this.checkedChange.emit(newValue);
    this.onTouched();
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggle();
    }
  }
}

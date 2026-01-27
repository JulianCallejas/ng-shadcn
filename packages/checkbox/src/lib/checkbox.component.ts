import { Component, Input, Output, EventEmitter, computed, signal, forwardRef, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

const checkboxVariants = cva(
  'peer text-primary-foreground h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
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
        [class]="computedClasses"
        [class.bg-primary]="(_checked() && !indeterminate) || indeterminate"
        [class.border-primary]="(_checked() && !indeterminate) || indeterminate"
        [disabled]="disabled"
        [attr.aria-checked]="indeterminate ? 'mixed' : _checked()"
        [attr.aria-disabled]="disabled"
        [attr.aria-label]="ariaLabel"
        [attr.aria-describedby]="ariaDescribedby"
        (click)="toggle()"
        (keydown)="onKeydown($event)"
      >
      <!-- Checked state -->
      @if (_checked() && !indeterminate) {
        <svg
          class="h-full w-full"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      }
      <!-- Indeterminate state -->
      @if (indeterminate) {
        <svg
          class="h-full w-full"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <rect x="4" y="9" width="12" height="2" rx="1" />
        </svg>
      }
      </button>

      <!-- Label content -->
      <div class="grid gap-1 leading-none h-full items-center">
        <label
          class="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          [class.text-xs]="size === 'sm'"
          [class.text-base]="size === 'lg'"
          (click)="toggle()"
          [for]="id"
          #labelContent
        >
          <ng-content select="[labelContent]"></ng-content>
        </label>
        <p
          class="text-xs leading-none text-muted-foreground"
          [class.text-sm]="size === 'lg'"
          #descriptionContent
        >
          <ng-content select="[descriptionContent]"></ng-content>
        </p>
      </div>
    </div>
  `,
})
export class CheckboxComponent implements CheckboxProps, ControlValueAccessor, AfterViewInit {

  @Input() id = '';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) indeterminate = false;
  @Input() size: CheckboxProps['size'] = 'default';
  @Input() class = '';
  @Input() ariaLabel?: string;
  @Input() ariaDescribedby?: string;
  @Input({ transform: booleanAttribute })
  get checked(): boolean {
    return this._checked();
  }
  set checked(value: boolean | null) {
    this._checked.set(!!value);
  }
  
  @Output() checkedChange = new EventEmitter<boolean>();
  
  /** @ignore */
  _checked = signal<boolean>(false);

  // Check if there's content projected
  /** @ignore */
  hasLabelContent = false;

  /** @ignore */
  hasDescriptionContent = false;

  // Computed properties
  get computedClasses(): string {
    return cn(
      checkboxVariants({size: this.size}),
      this.class
    );
    
  };

  // ControlValueAccessor implementation
  /** @ignore */
  private onChange = (value: boolean) => {};

  /** @ignore */
  private onTouched = () => {};

  
  /**
   * Writes a new value from the form model into the view.
   * Part of the ControlValueAccessor interface.
   * @param value The new value for the checkbox
   */
  writeValue(value: any): void {
    const newValue = !!value;
    if (this._checked() !== newValue) {
      this._checked.set(newValue);
    }
  }

  /**
   * Registers a callback function that is called when the control's value changes in the UI.
   * Part of the ControlValueAccessor interface.
   * @param fn The callback function to register
   */
  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  /**
   * Registers a callback function that is called by the forms API on initialization
   * to update the form model on blur.
   * Part of the ControlValueAccessor interface.
   * @param fn The callback function to register
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Sets the disabled state of the control.
   * Part of the ControlValueAccessor interface.
   * @param isDisabled Whether the control should be disabled
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  
  /**
   * Reference to the projected label content element.
   * Used to check if label content was provided and conditionally render it.
   */
  @ViewChild('labelContent', { read: ElementRef, static: false }) labelContent?: ElementRef<HTMLElement>;
  
  /**
   * Reference to the projected description content element.
   * Used to check if description content was provided and conditionally render it.
   */
  @ViewChild('descriptionContent', { read: ElementRef, static: false }) descriptionContent?: ElementRef<HTMLElement>;

  /** @ignore */
  ngAfterViewInit() {
    // Check for projected content after view is initialized
    if (!this.labelContent?.nativeElement?.children?.length){
      this.labelContent?.nativeElement.remove();
    }
    if (!this.descriptionContent?.nativeElement?.children?.length){
      this.descriptionContent?.nativeElement.remove();
    }
  }

  /** @ignore */
  toggle(event?: MouseEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    if (this.disabled) return;

    // Toggle the checked state
    const newValue = !this._checked();
    
    // Update the signal
    this.indeterminate = false;
    this._checked.set(newValue);
    
    // Update the checked property (which will also update the signal again)
    this.checked = newValue;
    
    // Notify form controls and parent components
    this.onChange(newValue);
    this.checkedChange.emit(newValue);
    this.onTouched();
  }

  /** @ignore */
  onKeydown(event: KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggle();
    }
  }
}

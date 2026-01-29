import { 
  AfterContentInit,
  booleanAttribute,
  Component,
  computed,
  ContentChild,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';
import { CheckboxIconComponent } from './checkbox-icon.component';
import { CheckboxLabelComponent } from './checkbox-label.component';
import { CheckboxDescriptionComponent } from './checkbox-description.component';
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

const checkboxVariants = cva(
  'peer text-primary-foreground h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden',
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
        tabindex="0"
        [id]="id"
        [class]="computedClasses()"
        [disabled]="disabled"
        [attr.aria-checked]="indeterminate ? 'mixed' : checkedSignal()"
        [attr.aria-disabled]="disabled"
        [attr.aria-label]="ariaLabel"
        [attr.aria-describedby]="ariaDescribedby"
        (click)="toggle($event)"
        (keydown)="onKeydown($event)"
      >
      <!-- Checked state -->
      @if (checkedSignal() && !indeterminate) {
        <span class="w-full h-full overflow-hidden text-current">
          <!-- <ng-content select="[icon]"></ng-content> -->
          <ng-content select="ng-shadcn-checkbox-icon"></ng-content>
        @if (!hasIcon()) {
          <svg
            class="h-full w-full"
            fill="currentColor"
            viewBox="0 0 20 20"
            select="[defaultIcon]"
            >
            <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
            />
          </svg>
        }
      </span>
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
       @if (hasContent()) {
        <div class="grid gap-1 leading-none h-full items-center">
          <ng-content select="ng-shadcn-checkbox-label"></ng-content>
          <ng-content select="ng-shadcn-checkbox-description"></ng-content>
        </div>
      }
      </div>
  `,
})
export class CheckboxComponent implements AfterContentInit, CheckboxProps, ControlValueAccessor  {

  @Input() id = '';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) indeterminate = false;
  @Input() size: CheckboxProps['size'] = 'default';
  @Input() class = '';
  @Input() checkedClass = '';
  @Input() ariaLabel?: string;
  @Input() ariaDescribedby?: string;
  // @Input({ transform: (value?: any) => {
  //   const receivedValue = value === '' ? true : !!value;
  //   return signal(receivedValue);
  // } }) checked = signal<boolean>(false);
  @Input({ transform: booleanAttribute }) set checked(value: boolean | string | null | undefined) {
    this.checkedSignal.set(value === '' ? true : !!value);
  }

  protected checkedSignal = signal<boolean>(false);
  
  
  @Output() checkedChange = new EventEmitter<boolean>();
 
  /** @ignore */
  hasContent = signal(false);
  
  /** @ignore */
  hasIcon = signal(false);

  
  /**
   * Used to include a label for the checkbox.
   */
  @ContentChild(CheckboxLabelComponent) 
  labelComponent?: CheckboxLabelComponent;
  
  /**
   * Used to include a description text to the checkbox.
   */
  @ContentChild(CheckboxDescriptionComponent)
  descriptionComponent?: CheckboxDescriptionComponent;
  
  /**
   * Custom icon to be used instead of the default one.
   * It is highly recommended to use SVG icons when using a custom icon.
   */
  @ContentChild(CheckboxIconComponent) 
  customIcon?: CheckboxIconComponent;

  /** @ignore */
  ngAfterContentInit() {
    if (this.labelComponent) {
      // Set the htmlFor property to match the checkbox's id
      this.labelComponent.id = this.id;
      this.labelComponent.size = this.size;
      this.labelComponent.toggleCheckbox.subscribe((id: string) => this.toggle());
    }
    if (this.descriptionComponent) {
      this.descriptionComponent.size = this.size;
    }
    this.hasContent.set(!!this.labelComponent || !!this.descriptionComponent);
    this.hasIcon.set(!!this.customIcon);
  }
 

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
    if (this.checkedSignal() !== newValue) {
      this.checkedSignal.set(newValue);
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
  
  /** @ignore */
  toggle(event?: MouseEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    if (this.disabled) return;

    // Toggle the checked state
    const newValue = !this.checkedSignal();
    
    // Update the signal
    this.indeterminate = false;
    this.checkedSignal.set(newValue);
    
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

  // Computed properties
  /** @ignore */
  computedClasses = computed(() =>
    cn(
      checkboxVariants({ size: this.size }),
      this.class,
      ((this.checkedSignal() && !this.indeterminate) || this.indeterminate) && 'bg-primary border-primary',
      ((this.checkedSignal() && !this.indeterminate) || this.indeterminate) && this.checkedClass
    )
  );

}

import { 
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  effect,
  EventEmitter,
  forwardRef,
  input,
  Input,
  linkedSignal,
  Output,
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

export type CheckboxVariantProps = VariantProps<typeof checkboxVariants>;


/**
 * Checkbox component with indeterminate state, accessibility features, and form integration
 * Supports signal-based state management and multiple sizes
 */
@Component({
  selector: 'ng-shadcn-checkbox',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
        [id]="id()"
        [class]="computedClasses()"
        [disabled]="disabled()"
        [attr.aria-checked]="indeterminateState() ? 'mixed' : checkedSignal()"
        [attr.aria-disabled]="disabled()"
        [attr.aria-label]="ariaLabel"
        [attr.aria-describedby]="ariaDescribedby"
        (click)="toggle($event)"
        (keydown)="onKeydown($event)"
      >
      <!-- Checked state -->
      @if (checkedSignal() && !indeterminateState()) {
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
      @if (indeterminateState()) {
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
export class CheckboxComponent implements ControlValueAccessor  {

  /**
   * Unique identifier for the checkbox.
   */
  id = input<string>('');

  /**
   * Whether the checkbox is disabled.
   */
  disabled = input(false, { transform: booleanAttribute });

  /**
   * Whether the checkbox is in an indeterminate state.
   */
  indeterminate = input(false, { transform: booleanAttribute });

  /**
   * Internal signal for tracking the indeterminate state.
   * @ignore
   */
  indeterminateState = linkedSignal(() => this.indeterminate())

  /**
   * Size of the checkbox.
   */
  size = input<CheckboxVariantProps['size']>('default');

  /**
   * Additional CSS classes for the checkbox.
   */
  class = input<string>('');

  /**
   * Additional CSS classes for the checked state of the checkbox.
   */
  checkedClass = input<string>('');

  /**
   * ARIA label for accessibility.
   */
  @Input() ariaLabel?: string;

  /**
   * ARIA describedby for additional accessibility context.
   */
  @Input() ariaDescribedby?: string;
  
  /**
   * Whether the checkbox is checked, also used for controlled components.
   *
   * @remarks
   * Use this property with reactive forms for two-way binding.
   */
  checked = input(false, { transform: booleanAttribute });

  /** @ignore */
  protected checkedSignal = linkedSignal(() => this.checked());
    
  /**
   * Fires when the checkbox checked state changes.
   * Useful for two-way binding with reactive forms.
   * @remarks
   * The emitted value is a boolean representing the checkbox state.
   */
  @Output() checkedChange = new EventEmitter<boolean>();
 
  /** @ignore */
  hasContent = computed(()=> !!this.labelComponent() || !!this.descriptionComponent());
  // hasContent = signal(false);
  
  /** @ignore */
  hasIcon = computed(()=> !!this.customIcon());
  
  /**
   * Used to include a label for the checkbox.
   */
  labelComponent = contentChild(CheckboxLabelComponent);
    
  /**
   * Used to include a description text to the checkbox.
   */
  descriptionComponent = contentChild(CheckboxDescriptionComponent);
    
  /**
   * Custom icon to be used instead of the default one.
   * It is highly recommended to use SVG icons when using a custom icon.
   */
  customIcon = contentChild(CheckboxIconComponent);

  constructor() {
    effect(onCleanup => {
      const label = this.labelComponent();
      if (!label) return;
      const sub = label.toggleCheckbox.subscribe((id: string) => this.toggle());
      onCleanup(() => sub.unsubscribe());
    });

    effect(()=>{
      const label = this.labelComponent();
      if (!label) return;
      label.id = this.id();
      label.size = this.size();
    })
    
    effect(()=>{
      const description = this.descriptionComponent();
      if (!description) return;
      description.size = this.size();
    })

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
  
  /** @ignore */
  toggle(event?: MouseEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    if (this.disabled()) return;

    // Toggle the checked state
    const newValue = !this.checkedSignal();
    
    // Update the signal
    this.indeterminateState.update(() => false);
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
      checkboxVariants({ size: this.size() }),
      this.class(),
      ((this.checkedSignal() && !this.indeterminateState()) || this.indeterminateState()) && 'bg-primary border-primary',
      ((this.checkedSignal() && !this.indeterminateState()) || this.indeterminateState()) && this.checkedClass()
    )
  );

}

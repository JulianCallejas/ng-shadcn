import { Component, Input, Output, EventEmitter, forwardRef, signal, input, computed, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

/**
 * Input component with label support and form integration
 * Supports both template-driven and reactive forms
 */

export type InputTypes = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
export type InputModes = 'none' | 'text' | 'email' | 'numeric' | 'decimal' | 'tel' | 'search' | 'url';


@Component({
  selector: 'ng-shadcn-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  styles: `
  .custom-input[type="number"]::-webkit-outer-spin-button,
  .custom-input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .custom-input::-ms-reveal {
    display: none;
  }

  @keyframes input-button-fade {
    0% { opacity: 100%; }
    100% { opacity: 0%; transform: scaleY(0) }
  }
  .input-button-out {
    animation: input-button-fade 100ms ease-out forwards;
  }
  .input-button-in {
    animation: input-button-fade 100ms ease-out reverse;
  }

  `,

  template: `
    <div class="relative grid w-full items-center gap-1.5 mb-1">
      @if (label()) {
        <label [for]="id()" [class]="computedLabelClasses()">
          {{ label() }}
        </label>
      }
      <div class="relative">
        <input
          [id]="id()"
          [type]="computedType()"
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [value]="value()"
          (input)="onInput($event)"
          (blur)="onBlur()"
          (focus)="onFocus()"
          [class]="computedClasses()"
          [inputMode]="computedInputMode()"
          
          [attr.name]="name() !== undefined && name()"
          [attr.autocomplete]="autocomplete() !== undefined && autocomplete()"
          [attr.max]="max() !== undefined && max()"
          [attr.maxLength]="maxLength() !== undefined && maxLength()"
          [attr.min]="min() !== undefined && min()"
          [attr.minLength]="minLength() !== undefined && minLength()"
          [attr.pattern]="pattern() !== undefined && pattern()"
          [attr.required]="required() !== undefined && required()"
          [attr.autofocus]="autofocus() !== undefined && autofocus()"
          [attr.title]="title() !== undefined && title()"
          [attr.aria-role]="role() !== undefined && role()"
        />
        @if (controlButton()) {
          @switch (type()) {
            @case ('number') {
              <button
                type="button"
                class="w-8 text-center flex justify-center border-r-[0.25px] border-r-muted-foreground/50 left-1 absolute top-1/2 -translate-y-1/2 font-bold text-muted-foreground hover:text-foreground py-1"
                (click)="changeNumber('decrease')"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus-icon lucide-minus"><path d="M5 12h14"/></svg>
              </button>
              <button
                type="button"
                class="w-8 text-center flex justify-center border-l-[0.25px] border-l-muted-foreground/50 right-1 absolute top-1/2 -translate-y-1/2 font-bold text-muted-foreground hover:text-foreground py-1"
                (click)="changeNumber('increase')"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              </button>
            }
            @case ('password') {
              @if(reveal()) {
                <button
                  type="button"
                  class="w-8 text-center flex justify-center right-1 absolute top-1/2 -translate-y-1/2 font-bold text-muted-foreground hover:text-foreground py-1"
                  (click)="toggleReveal()"
                  animate.enter="input-button-in" animate.leave="input-button-out"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off-icon lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
                </button>
              }@else {
                <button
                  type="button"
                  class="w-8 text-center flex justify-center right-1 absolute top-1/2 -translate-y-1/2 font-bold text-muted-foreground hover:text-foreground py-1"
                  (click)="toggleReveal()"
                  animate.enter="input-button-in" animate.leave="input-button-out"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
              }
            }
            @default {
              <button type="button" class="w-8 text-center flex justify-center right-1 absolute top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground py-1" (click)="clearInput()">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            }
          }
        }
        </div>

      @if (error()) {
        <p [class]="computedErrorClasses()">{{ error() }}</p>
      }
    </div>
  `,
})
export class InputComponent implements ControlValueAccessor {
  
  /**
   * The name of the input element.
   * @default undefined
   * @description Storybook description:
   * The name of the input element. Used for form submission and can be accessed in server-side scripts.
   */
  name = input<string | undefined>();
  /**
   * The autocomplete attribute value.
   * @default undefined
   * @description Storybook description:
   * The autocomplete attribute value. Specifies whether the browser should automatically complete the input field.
   */
  autocomplete = input<string | undefined>();
  /**
   * The maximum value for number/date inputs.
   * @default undefined
   * @description Storybook description:
   * The maximum value for number/date inputs. It is used to specify the maximum value for the input field.
   */
  max = input<string | undefined>();
  /**
   * The maximum length of the input value.
   * @default undefined
   * @description Storybook description:
   * The maximum length of the input value. It is used to limit the number of characters that can be entered in the input field.
   */
  maxLength = input<string | undefined>();
  /**
   * The minimum value for number/date inputs.
   * @default undefined
   * @description Storybook description:
   * The minimum value for number/date inputs. It is used to specify the minimum value for the input field.
   */
  min = input<string | undefined>();
  /**
   * The minimum length of the input value.
   * @default undefined
   * @description Storybook description:
   * The minimum length of the input value. It is used to specify the minimum number of characters that must be entered in the input field.
   */
  minLength = input<string | undefined>();
  /**
   * The pattern for input validation.
   * @default undefined
   * @description Storybook description:
   * The pattern for input validation. It is used to specify a regular expression that the input field must match.
   */
  pattern = input<string | undefined>();
  /**
   * Whether the input is required.
   * @default undefined
   * @description Storybook description:
   * Whether the input is required. It is used to specify that the input field must be filled out before the form can be submitted.
   */
  required = input<string | undefined>();
  /**
   * Whether the input should be focused when the page loads.
   * @default undefined
   * @description Storybook description:
   * Whether the input should be focused when the page loads.
   */
  autofocus = input<boolean | undefined>();
  /**
   * The title attribute value.
   * @default undefined
   * @description Storybook description:
   * The title attribute value. Specifies extra information about an element.
   */
  title = input<string | undefined>();
  /**
   * The role attribute value.
   * @default undefined
   * @description Storybook description:
   * The role attribute value. Specifies the role of an element.
   */
  role = input<string | undefined>();
  
  
  /**
   * The type of input field.
   * @default 'text'
   * @description Storybook description:
   * The type of input field.
   */
  type = input<InputTypes>('text');
  
  /**
   * Placeholder text for the input.
   * @default ''
   * @description Storybook description:
   * Placeholder text for the input.
   */
  placeholder = input('');
  
  /**
   * Label text displayed above the input.
   * @default ''
   * @description Storybook description:
   * Label text displayed above the input.
   */
  label = input('');
  
  /**
   * Error message displayed below the input.
   * @default ''
   * @description Storybook description:
   * Error message displayed below the input.
   */
  error = input('');
  
  /**
   * Whether the input is disabled.
   * @default false
   * @description Storybook description:
   * Whether the input is disabled.
   */
  disabled = input(false);
  
  /**
   * Whether to show a control button.
   * @default true
   * @description Storybook description:
   * Whether to show a control button.
   */
  controlButton = input(true);
  
  /**
   * The id of the input field.
   * @default inp-<random_number>
   * @description Storybook description:
   * The id of the input field.
   */
  id = input<string>(`inp-${crypto.getRandomValues(new Uint32Array(1))[0]}`);
  
  /**
   * Additional classes for the input field.
   * @default ''
   * @description Storybook description:
   * Additional classes for the input field.
   */
  class = input('');
  
  /**
   * Additional classes for the error message.
   * @default ''
   * @description Storybook description:
   * Additional classes for the error message.
   */
  errorClass = input('');
  
  /**
   * Additional classes for the label.
   * @default ''
   * @description Storybook description:
   * Additional classes for the label.
   */
  labelClass = input('');
  
  /**
   * Input mode for the input field.
   * @default undefined
   * @description Storybook description:
   * Input mode for the input field.
   */
  inputmode = input<InputModes>();
  
  /**
   * The value of the input field.
   * @default ''
   * @description Storybook description:
   * The value of the input field.
   */
  value = model('')

  /**
   * Event emitted when the input value changes.
   * @event valueChange
   * @type {EventEmitter<string>}
   */
  @Output() valueChange = new EventEmitter<string>();

  /**
   * Event emitted when the input receives focus.
   * @event focused
   * @type {EventEmitter<void>}
   */
  @Output() focused = new EventEmitter<void>();

  /**
   * Event emitted when the input loses focus.
   * @event blurred
   * @type {EventEmitter<void>}
   */
  @Output() blurred = new EventEmitter<void>();
    
  
  /** @ignore */
  private onChange = (value: string) => {};
  
  /** @ignore */
  private onTouched = () => {};
  
  /** @ignore */
  reveal = signal(false);

  /** @ignore */
  computedType = computed(() => {
    if (this.type() === 'password') {
      return this.reveal() ? 'text' : 'password';
    }
    return this.type();
  });

  /** @ignore */
  computedInputMode = computed(() => {
    if (this.inputmode()) {
      return this.inputmode();
    }
    switch (this.type()){
      case 'password':
        return 'text';
      case 'number':
        return 'numeric'
      case 'email':
      case 'url':
      case 'tel':
      case 'text':
        return this.type()
      default:
        return 'text'
    }
  })
  
  /** @ignore */
  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.setValue(value);
  }
  
  /** @ignore */
  onFocus() {
    this.focused.emit();
  }
  
  /** @ignore */
  onBlur() {
    this.onTouched();
    this.blurred.emit();
  }
  
  /** @ignore */
  setValue(value: string) {
    this.value.set(value);
    this.onChange(value);
    this.valueChange.emit(value);
  }
  
  /** @ignore */
  toggleReveal() {
    this.reveal.set(!this.reveal());
  }

  /** @ignore */
  changeNumber(type: 'increase' | 'decrease'){
    let value = Number(this.value());
    if (isNaN(value)) {
      value = 0;
    }
    if (type === 'increase') {
      this.setValue(`${value + 1}`);
    } else {
      this.setValue(`${value - 1}`);
    }
  }

  /** @ignore */
  clearInput() {
    this.setValue('');
  }

  /** @ignore */
  controlButtonClasses = computed(()=>{
    if (!this.controlButton()) return ''
    if (this.type() === 'number') return 'pl-11 pr-11'
    return 'pr-9'
  })

  /** @ignore */
  computedClasses = computed(() =>
    cn(
      'custom-input flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      this.controlButtonClasses(),
      this.class()
    )
  );

  /** @ignore */
  computedErrorClasses = computed(() =>
    cn(
      'text-xs text-destructive',
      this.errorClass()
    )
  );

  /** @ignore */
  computedLabelClasses = computed(() =>
    cn(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      this.labelClass()
    )
  );

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value.set(value || '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}

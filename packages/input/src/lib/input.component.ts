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
  type = input<InputTypes>('text');
  placeholder = input('');
  label = input('');
  error = input('');
  disabled = input(false);
  controlButton = input(true);
  id = input<string>(`ddm-${new Date().getTime()}-${Math.ceil(Math.random()*1000)}`);
  class = input('')
  errorClass = input('');
  labelClass = input('');
  inputmode = input<InputModes>();
  value = model('');

  @Output() valueChange = new EventEmitter<string>();
  @Output() focused = new EventEmitter<void>();
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
  setValue(value: string){
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
  clearInput(){
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

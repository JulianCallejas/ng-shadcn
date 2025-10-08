import { Component, Input, Output, EventEmitter, forwardRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Switch component for toggle interactions
 * Supports form integration and accessibility
 */
@Component({
  selector: 'ng-shadcn-switch',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true,
    },
  ],
  template: `
    <button
      type="button"
      role="switch"
      [id]="id"
      [class]="switchClasses"
      [attr.aria-checked]="checked()"
      [disabled]="disabled"
      (click)="toggle()"
      (keydown.space)="onSpaceKey($event)"
      (keydown.enter)="onEnterKey($event)"
    >
      <span 
        [class]="thumbClasses"
        [attr.data-state]="checked() ? 'checked' : 'unchecked'"
      ></span>
    </button>
  `,
})
export class SwitchComponent implements ControlValueAccessor {
  @Input() id = '';
  @Input() disabled = false;
  @Input() checked = signal(false);
  
  @Output() checkedChange = new EventEmitter<boolean>();

  private onChange = (value: boolean) => {};
  private onTouched = () => {};

  get switchClasses(): string {
    const baseClasses = 'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50';
    const stateClasses = this.checked() 
      ? 'bg-primary' 
      : 'bg-input';
    
    return `${baseClasses} ${stateClasses}`;
  }

  get thumbClasses(): string {
    const baseClasses = 'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform';
    const positionClasses = this.checked() 
      ? 'translate-x-5' 
      : 'translate-x-0';
    
    return `${baseClasses} ${positionClasses}`;
  }

  ngOnInit() {
    if (!this.id) {
      this.id = 'switch-' + Math.random().toString(36).substr(2, 9);
    }
  }

  toggle() {
    if (this.disabled) return;
    
    const newValue = !this.checked();
    this.checked.set(newValue);
    this.onChange(newValue);
    this.onTouched();
    this.checkedChange.emit(newValue);
  }

  onSpaceKey(event: Event) {
    event.preventDefault();
    this.toggle();
  }

  onEnterKey(event: Event) {
    event.preventDefault();
    this.toggle();
  }

  // ControlValueAccessor implementation
  writeValue(value: boolean): void {
    this.checked.set(value || false);
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
}
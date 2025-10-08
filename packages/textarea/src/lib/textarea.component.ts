import { Component, Input, Output, EventEmitter, computed, signal, forwardRef, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';

const textareaVariants = cva(
  'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        default: 'min-h-[80px] px-3 py-2 text-sm',
        sm: 'min-h-[60px] px-2 py-1 text-xs',
        lg: 'min-h-[120px] px-4 py-3 text-base',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface TextareaProps extends VariantProps<typeof textareaVariants> {
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  autoResize?: boolean;
  maxLength?: number;
  showCharacterCount?: boolean;
  rows?: number;
  maxRows?: number;
  minRows?: number;
}

/**
 * Textarea component with auto-resize functionality, form validation, and character count
 * Supports both template-driven and reactive forms
 */
@Component({
  selector: 'ng-shadcn-textarea',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
  template: `
    <div class="w-full">
      <textarea
        #textarea
        [class]="computedClasses()"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [readonly]="readonly"
        [rows]="computedRows()"
        [attr.maxlength]="maxLength"
        [value]="value()"
        [attr.aria-label]="ariaLabel"
        [attr.aria-describedby]="ariaDescribedby"
        [attr.aria-invalid]="ariaInvalid"
        (input)="onInput($event)"
        (blur)="onBlur()"
        (focus)="onFocus()"
        (keydown)="onKeydown($event)"
      ></textarea>

      <!-- Character count -->
      <div
        *ngIf="showCharacterCount"
        class="mt-1 flex justify-between text-xs text-muted-foreground"
      >
        <span></span>
        <span
          [class.text-destructive]="isOverLimit()"
          [class.text-warning]="isNearLimit()"
        >
          {{ characterCount() }}{{ maxLength ? '/' + maxLength : '' }}
        </span>
      </div>
    </div>
  `,
})
export class TextareaComponent implements TextareaProps, ControlValueAccessor, AfterViewInit {
  @Input() placeholder?: string;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() autoResize = false;
  @Input() maxLength?: number;
  @Input() showCharacterCount = false;
  @Input() rows = 3;
  @Input() maxRows?: number;
  @Input() minRows?: number;
  @Input() size: TextareaProps['size'] = 'default';
  @Input() className = '';
  @Input() ariaLabel?: string;
  @Input() ariaDescribedby?: string;
  @Input() ariaInvalid?: boolean;

  @Output() valueChange = new EventEmitter<string>();
  @Output() focused = new EventEmitter<void>();
  @Output() blurred = new EventEmitter<void>();

  @ViewChild('textarea') textareaRef!: ElementRef<HTMLTextAreaElement>;

  // Signals for reactive state
  protected value = signal('');
  private sizeSignal = signal(this.size);
  private classNameSignal = signal(this.className);
  private rowsSignal = signal(this.rows);

  // Computed properties
  computedClasses = computed(() => {
    return textareaVariants({
      size: this.sizeSignal(),
      className: this.classNameSignal(),
    });
  });

  computedRows = computed(() => {
    if (this.autoResize) {
      return this.minRows || 1;
    }
    return this.rowsSignal();
  });

  characterCount = computed(() => {
    return this.value().length;
  });

  isOverLimit = computed(() => {
    return this.maxLength ? this.characterCount() > this.maxLength : false;
  });

  isNearLimit = computed(() => {
    if (!this.maxLength) return false;
    const count = this.characterCount();
    const limit = this.maxLength;
    return count > limit * 0.8 && count <= limit;
  });

  // ControlValueAccessor implementation
  private onChange = (value: string) => {};
  private onTouched = () => {};

  writeValue(value: string): void {
    this.value.set(value || '');
    if (this.autoResize && this.textareaRef) {
      setTimeout(() => this.adjustHeight());
    }
  }

  registerOnChange(fn: (value: string) => void): void {
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
    this.rowsSignal.set(this.rows);
  }

  ngOnChanges() {
    this.sizeSignal.set(this.size);
    this.classNameSignal.set(this.className);
    this.rowsSignal.set(this.rows);
  }

  ngAfterViewInit() {
    if (this.autoResize) {
      this.adjustHeight();
    }
  }

  onInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    const newValue = target.value;

    // Check max length
    if (this.maxLength && newValue.length > this.maxLength) {
      target.value = newValue.substring(0, this.maxLength);
      return;
    }

    this.value.set(newValue);
    this.onChange(newValue);
    this.valueChange.emit(newValue);

    if (this.autoResize) {
      this.adjustHeight();
    }
  }

  onBlur() {
    this.onTouched();
    this.blurred.emit();
  }

  onFocus() {
    this.focused.emit();
  }

  onKeydown(event: KeyboardEvent) {
    // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+Z
    if (event.ctrlKey || event.metaKey) {
      return;
    }

    // Allow navigation keys
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'].includes(event.key)) {
      return;
    }

    // Allow delete/backspace
    if (['Delete', 'Backspace'].includes(event.key)) {
      return;
    }

    // Allow Tab and Enter
    if (['Tab', 'Enter'].includes(event.key)) {
      return;
    }

    // Check max length for character input
    if (this.maxLength && this.value().length >= this.maxLength && event.key.length === 1) {
      event.preventDefault();
    }
  }

  private adjustHeight() {
    if (!this.textareaRef || !this.autoResize) return;

    const textarea = this.textareaRef.nativeElement;
    
    // Reset height to calculate scroll height
    textarea.style.height = 'auto';
    
    const scrollHeight = textarea.scrollHeight;
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
    const paddingTop = parseInt(getComputedStyle(textarea).paddingTop);
    const paddingBottom = parseInt(getComputedStyle(textarea).paddingBottom);
    
    let newHeight = scrollHeight;

    // Apply min rows constraint
    if (this.minRows) {
      const minHeight = (this.minRows * lineHeight) + paddingTop + paddingBottom;
      newHeight = Math.max(newHeight, minHeight);
    }

    // Apply max rows constraint
    if (this.maxRows) {
      const maxHeight = (this.maxRows * lineHeight) + paddingTop + paddingBottom;
      newHeight = Math.min(newHeight, maxHeight);
    }

    textarea.style.height = `${newHeight}px`;
  }

  // Public methods
  focus() {
    this.textareaRef?.nativeElement.focus();
  }

  blur() {
    this.textareaRef?.nativeElement.blur();
  }

  select() {
    this.textareaRef?.nativeElement.select();
  }

  setSelectionRange(start: number, end: number) {
    this.textareaRef?.nativeElement.setSelectionRange(start, end);
  }
}

import { Component, Input, Output, EventEmitter, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',  
      size: 'default',
    },
  }
);

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  disabled?: boolean;
}

/**
 * Button component with multiple variants and sizes
 * Supports both signal and observable patterns
 */
@Component({
  selector: 'ng-shadcn-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      [class]="computedClasses()"
      [disabled]="disabled"
      (click)="handleClick($event)"
      type="button"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent implements ButtonProps {
  @Input() variant: ButtonProps['variant'] = 'default';
  @Input() size: ButtonProps['size'] = 'default';
  @Input() disabled = false;
  @Input() className = '';
  
  @Output() clicked = new EventEmitter<Event>();

  // Signal-based computed property for classes
  private variantSignal = signal(this.variant);
  private sizeSignal = signal(this.size);
  private classNameSignal = signal(this.className);

  computedClasses = computed(() => {
    return buttonVariants({
      variant: this.variantSignal(),
      size: this.sizeSignal(),
      className: this.classNameSignal(),
    });
  });

  ngOnInit() {
    // Update signals when inputs change
    this.variantSignal.set(this.variant);
    this.sizeSignal.set(this.size);
    this.classNameSignal.set(this.className);
  }

  ngOnChanges() {
    this.variantSignal.set(this.variant);
    this.sizeSignal.set(this.size);
    this.classNameSignal.set(this.className);
  }

  handleClick(event: Event) {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }
}
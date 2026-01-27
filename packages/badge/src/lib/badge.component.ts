import { Component, Input, computed, signal, ContentChild, ContentChildren, QueryList, ElementRef, AfterContentInit, booleanAttribute, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground border-border',
        success: 'border-transparent bg-green-500 text-white hover:bg-green-600',
        warning: 'border-transparent bg-yellow-500 text-white hover:bg-yellow-600',
        info: 'border-transparent bg-blue-500 text-white hover:bg-blue-600',
      },
      size: {
        default: 'px-2.5 py-0.5 text-xs',
        sm: 'px-[2.5px] py-[1px] text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  dismissible?: boolean;
}

/**
 * Badge component for status indicators and labels
 * Supports multiple variants, sizes, and optional icon integration
 */
@Component({
  selector: 'ng-shadcn-badge',
  standalone: true,
  imports: [CommonModule],
  styles: `
  @keyframes badge-fade-out {
    0% { opacity: 100%; }
    99% { 
      opacity: 0%; 
    }
    100% { 
      opacity: 0%;
      display: none;
    }
  }
  .badge-out {
    interpolate-size: allow-keywords;
    animation: badge-fade-out 0.2s ease-out forwards;
  }
  .badge-hide {
    display: none;
    height: 0;
    opacity: 0;
  }
  `,
  template: `
    <div 
      [class]="computedClasses" 
      [attr.role]="role"
      [class.badge-out]="isDismissed() && fade"
      [class.badge-hide]="isDismissed() && !fade"
    >
      <!-- Leading icon slot -->
      <span #leadingIcon class="mr-1 shrink-0">
        <ng-content select="[leadingIcon]"></ng-content>
      </span>

      <!-- Badge content -->
      <span class="truncate">
        <ng-content></ng-content>
      </span>

      <!-- Trailing icon slot -->
      <span #trailingIcon class="ml-1 shrink-0">
        <ng-content select="[trailingIcon]"></ng-content>
      </span>

      <!-- Dismiss button -->
      @if (dismissible) {
        <button
          *ngIf="dismissible"
          type="button"
          class="ml-1 shrink-0 rounded-full p-0.5 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
          (click)="dismiss()"
          [attr.aria-label]="'Remove ' + (ariaLabel || 'badge')"
        >
          <svg
            class="h-3 w-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      }
    </div>
  `,
})
export class BadgeComponent implements BadgeProps {
  
  @Input() variant: BadgeProps['variant'] = 'default';
  @Input() size: BadgeProps['size'] = 'default';
  @Input({ transform: booleanAttribute }) dismissible = false;
  @Input({ transform: booleanAttribute }) fade = false;
  @Input() class = '';
  @Input() role = 'status';
  @Input() ariaLabel?: string;
  @Output() dismissed = new EventEmitter<void>();

  /** @ignore */
  isDismissed = signal(false);

  // Content queries for projected icons
  @ContentChild('leadingIcon', { static: false }) leadingIcon?: ElementRef;
  @ContentChild('trailingIcon', { static: false }) trailingIcon?: ElementRef;

  constructor(private elementRef: ElementRef) {}

  // Computed properties
  /** @ignore */
  get computedClasses(): string {
    return cn(
      badgeVariants({
        variant: this.variant,
        size: this.size as 'default' | 'sm' | 'lg',
      }),
      this.class
    );
    
  };
  
  /** @ignore */
  dismiss() {
    this.isDismissed.set(true);
    this.dismissed.emit();
    setTimeout(() => {
      this.isDismissed.set(false);
      this.elementRef.nativeElement.remove();
    }, 200);
    
  }
  
}

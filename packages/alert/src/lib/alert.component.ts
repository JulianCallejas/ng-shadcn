import { Component, Input, Output, EventEmitter, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground border-border',
        destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
        warning: 'border-yellow-500/50 text-yellow-800 bg-yellow-50 dark:border-yellow-500 dark:text-yellow-300 dark:bg-yellow-950/30 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-300',
        success: 'border-green-500/50 text-green-800 bg-green-50 dark:border-green-500 dark:text-green-300 dark:bg-green-950/30 [&>svg]:text-green-600 dark:[&>svg]:text-green-300',
        info: 'border-blue-500/50 text-blue-800 bg-blue-50 dark:border-blue-500 dark:text-blue-300 dark:bg-blue-950/30 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface AlertProps extends VariantProps<typeof alertVariants> {
  dismissible?: boolean;
  title?: string;
}

/**
 * Alert component for notification messages
 * Supports multiple variants, dismissible option, and icon integration
 */
@Component({
  selector: 'ng-shadcn-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      [class]="computedClasses()"
      role="alert"
      [attr.aria-live]="ariaLive"
      [attr.aria-atomic]="ariaAtomic"
    >
      <!-- Default icons based on variant -->
      <svg
        *ngIf="!hasCustomIcon && showDefaultIcon"
        class="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          *ngIf="variant === 'destructive'"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
        />
        <path
          *ngIf="variant === 'warning'"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
        />
        <path
          *ngIf="variant === 'success'"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
        <path
          *ngIf="variant === 'info'"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
        <path
          *ngIf="variant === 'default'"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <!-- Custom icon slot -->
      <span *ngIf="hasCustomIcon">
        <ng-content select="[slot=icon]"></ng-content>
      </span>

      <div class="flex-1">
        <!-- Title -->
        <h5 
          *ngIf="title || hasTitleContent"
          class="mb-1 font-medium leading-none tracking-tight"
        >
          {{ title }}
          <ng-content select="[slot=title]"></ng-content>
        </h5>

        <!-- Description/Content -->
        <div class="text-sm [&_p]:leading-relaxed">
          <ng-content></ng-content>
        </div>
      </div>

      <!-- Dismiss button -->
      <button
        *ngIf="dismissible"
        type="button"
        class="absolute right-2 top-2 rounded-md p-1 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:hover:bg-white/5"
        (click)="onDismiss()"
        [attr.aria-label]="'Dismiss ' + (title || 'alert')"
      >
        <svg
          class="h-4 w-4"
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
    </div>
  `,
})
export class AlertComponent implements AlertProps {
  @Input() variant: AlertProps['variant'] = 'default';
  @Input() dismissible = false;
  @Input() title?: string;
  @Input() className = '';
  @Input() showDefaultIcon = true;
  @Input() ariaLive: 'polite' | 'assertive' | 'off' = 'polite';
  @Input() ariaAtomic = true;

  @Output() dismissed = new EventEmitter<void>();

  // Signals for reactive state
  private variantSignal = signal(this.variant);
  private classNameSignal = signal(this.className);

  // Check for projected content
  hasCustomIcon = false;
  hasTitleContent = false;

  // Computed properties
  computedClasses = computed(() => {
    return alertVariants({
      variant: this.variantSignal(),
      className: this.classNameSignal(),
    });
  });

  ngOnInit() {
    this.variantSignal.set(this.variant);
    this.classNameSignal.set(this.className);
  }

  ngOnChanges() {
    this.variantSignal.set(this.variant);
    this.classNameSignal.set(this.className);
  }

  ngAfterContentInit() {
    // In a real implementation, you would check for projected content
    // For now, we'll assume content might exist
    this.hasCustomIcon = false; // Set based on actual content projection
    this.hasTitleContent = false; // Set based on actual content projection
  }

  onDismiss() {
    this.dismissed.emit();
  }
}

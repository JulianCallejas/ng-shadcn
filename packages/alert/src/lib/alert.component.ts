import { Component, Input, Output, EventEmitter, booleanAttribute, ContentChild, AfterContentInit, signal, ElementRef, inject, DestroyRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertIconComponent } from './alert-icon.component';
import { AlertActionComponent } from './alert-action.component';
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4',
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

export type AlertVariant = VariantProps<typeof alertVariants>['variant'];

/**
 * Alert component for notification messages
 * Supports multiple variants, dismissible option, and icon integration
 * 
 * @example
 * ```html
 * <ng-shadcn-alert variant="success" dismissible="true">
 *   <ng-shadcn-alert-title>Success!</ng-shadcn-alert-title>
 *   <ng-shadcn-alert-content>Your action was completed successfully.</ng-shadcn-alert-content>
 *   <ng-shadcn-alert-action (onClick)="handleAction()">Undo</ng-shadcn-alert-action>
 * </ng-shadcn-alert>
 * ```
 */
@Component({
  selector: 'ng-shadcn-alert',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, 
    AlertIconComponent, 
  ],
  styles:`
  @keyframes alert-fade-out {
    0% { opacity: 100%; }
    99% { 
      opacity: 0%; 
      height: 0;
    }
    100% { 
      opacity: 0%;
      height: 0;
      display: none;
    }
  }
  .alert-out {
    interpolate-size: allow-keywords;
    animation: alert-fade-out 0.2s ease-out forwards;
  }
  .alert-hide {
    display: none;
    height: 0;
    opacity: 0;
  }
  `,
  template: `
    <div 
      [class]="computedClasses()"
      role="alert"
      [class.alert-out]="isDismissed() && fade"
      [class.alert-hide]="isDismissed() && !fade"
      [class.transition-opacity]="fade"
      [class.duration-300]="fade"
      [class.ease-in-out]="fade"
      [attr.aria-label]="ariaLabel"
      [attr.aria-describedby]="ariaDescribedBy"
      [attr.role]="role"
      [attr.aria-live]="ariaLive"
      [attr.aria-atomic]="ariaAtomic"
      [attr.aria-hidden]="isDismissed()"
    >
      <div class="flex gap-3">
        <!-- Icon -->
        @if (showIcon) {
          <div class="shrink-0">
            @if (hasCustomIcon) {
              <ng-content select="ng-shadcn-alert-icon"></ng-content>
            } @else {
              <ng-shadcn-alert-icon class="mt-0.5">
                <svg
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
                    *ngIf="variant === 'info' || variant === 'default'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </ng-shadcn-alert-icon>
            }
          </div>
        }

        <!-- Content -->
        <div class="flex-1">
          <ng-content select="ng-shadcn-alert-title"></ng-content>
          <ng-content select="ng-shadcn-alert-content"></ng-content>
        </div>

        <!-- Dismiss button -->
        @if (dismissible) {
          <button 
            type="button"
            class="-mx-1.5 -my-1.5 p-1.5 inline-flex h-8 w-8 items-center justify-center rounded-md text-foreground/50 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring"
            (click)="dismiss()"
            aria-label="Dismiss"
          >
            <span class="sr-only">Dismiss</span>
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        }
      </div>

      <!-- Action button -->
      <ng-content select="ng-shadcn-alert-action"></ng-content>
    </div>
  `,
})
export class AlertComponent implements AfterContentInit {
  /** The variant of the alert */
  @Input() variant: AlertVariant = 'default';
  
  /** Whether the alert can be dismissed */
  @Input({ transform: booleanAttribute }) dismissible = false;
  
  /** Whether to use fade animation when dismissing */
  @Input({ transform: booleanAttribute }) fade = false;
  
  /** Whether to show the icon */
  @Input({ transform: booleanAttribute }) showIcon = true;
  
  /** Additional CSS classes */
  @Input() class = '';
  
  /** ARIA live region setting */
  @Input() ariaLive: 'polite' | 'assertive' | 'off' = 'polite';
  
  /** Whether the entire region should be considered as a whole for ARIA */
  @Input() ariaAtomic = true;

  /** ARIA label for the alert */
  @Input() ariaLabel?: string;
  
  /** ARIA described by for the alert */
  @Input() ariaDescribedBy?: string;
  
  /** ARIA role for the alert */
  @Input() role = 'alert';

  /** Emits when the alert is dismissed */
  @Output() dismissed = new EventEmitter<void>();
  
  /** Emits when the action button is clicked */
  @Output() onAlertAction = new EventEmitter<MouseEvent>();

  /** @ignore */
  isDismissed = signal(false);

  /** @ignore */
  hasCustomIcon = false;

  /** @ignore */
  private destroyRef = inject(DestroyRef); // ¡IMPORTANTE!

  
  /**
   * Reference to the alert icon component if it exists.
   * Only used for generating the Storybook documentation.
   */
  @ContentChild(AlertIconComponent) private alertIcon?: AlertIconComponent;

  /**
   * Reference to the alert action component if it exists.
   * Only used for generating the Storybook documentation.
   */
  @ContentChild(AlertActionComponent) private alertAction?: AlertActionComponent;
  
  constructor(private elementRef: ElementRef) {}

  /** @ignore */
  ngAfterContentInit() {
    this.hasCustomIcon = !!this.alertIcon;
    
    // Forward action button clicks to the parent
    if (this.alertAction) {
      this.alertAction.onClick
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(event => {
        this.onAlertAction.emit(event);
        if (this.dismissible) {
          this.dismiss();
        }
      });
    }
  }

  /**
   * Computes the CSS classes for the alert based on inputs
   */
  /** @ignore */
  computedClasses(): string {
    return cn(
      alertVariants({ variant: this.variant }),
      this.class,
      {
        'pr-10': this.dismissible || this.alertAction
      }
    );
  }

  /** @ignore */
  dismiss() {
    this.isDismissed.set(true);
    this.dismissed.emit();
    
    setTimeout(() => {
      if (!this.destroyRef.destroyed) {
        this.isDismissed.set(false);
        this.elementRef.nativeElement.remove();
      }
    }, 200);
  }
    
}

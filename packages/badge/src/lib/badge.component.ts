import { Component, Input, computed, signal, ElementRef, booleanAttribute, Output, EventEmitter, inject, DestroyRef, input, ChangeDetectionStrategy, contentChild } from '@angular/core';
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
        sm: 'px-1.5 py-[1px] text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;

/**
 * Badge component for status indicators and labels
 * Supports multiple variants, sizes, and optional icon integration
 */
@Component({
  selector: 'ng-shadcn-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    animation: badge-fade-out 0.22s ease-out forwards;
  }
  .badge-hide {
    display: none;
    height: 0;
    opacity: 0;
    width: 0;
    overflow: hidden;
  }
  `,
  template: `
    <div 
      [class]="computedClasses()"
      [attr.role]="role"
      [class.badge-out]="isDismissed() && fade"
      [class.badge-hide]="isDismissed() && !fade"
    >
      <!-- Leading icon slot -->
      <span [class]="leadingIconClasses()">
        <ng-content select="[leadingIcon]"></ng-content>
      </span>

      <!-- Badge content -->
      <span class="truncate">
        <ng-content></ng-content>
      </span>

      <!-- Trailing icon slot -->
      <span [class]="trailingIconClasses()">
        <ng-content select="[trailingIcon]"></ng-content>
      </span>
    

      <!-- Dismiss button -->
      @if (dismissible()) {
        <button
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
export class BadgeComponent {

  variant = input<BadgeVariantProps['variant']>('default');
  size = input<BadgeVariantProps['size']>('default');
  dismissible = input(false, { transform: booleanAttribute });
  fade = input(false, { transform: booleanAttribute });
  class = input('');


  @Input() role = 'status';
  @Input() ariaLabel?: string;
  @Output() dismissed = new EventEmitter<void>();
  
  /** @ignore */
  isDismissed = signal(false);
  
  /** @ignore */
  private destroyRef = inject(DestroyRef); 
  
  /** @ignore */
  private dismissTimeout?: ReturnType<typeof setTimeout>;

  // Content queries for projected icons
  
  constructor(private elementRef: ElementRef) {
    this.destroyRef.onDestroy(() => {
      if (this.dismissTimeout) {
        window.clearTimeout(this.dismissTimeout);
      }
    });
  }

  // Computed properties
  /** @ignore */
  computedClasses = computed(() =>
    cn(
      badgeVariants({
        variant: this.variant(),
        size: this.size(),
      }),
      this.class()
    )
  );

  /** @ignore */
  leadingIconClasses = computed(() => 
    cn(
      'mr-1 shrink-0 overflow-hidden',
      this.size() === 'lg' ? 'max-h-3.5 max-w-3.5' : 'max-h-3 max-w-3',
    )
  )
  
  /** @ignore */
  trailingIconClasses = computed(() => 
    cn(
      'ml-1 shrink-0 overflow-hidden',
      this.size() === 'lg' ? 'max-h-3.5 max-w-3.5' : 'max-h-3 max-w-3',
    )
  )
    
      
  /** @ignore */
  async dismiss() {
    
    if (this.isDismissed()) return;

    this.isDismissed.set(true);

    if (this.fade()) {
      const pause = (ms) => new Promise(res => {
        this.dismissTimeout = setTimeout(res, ms)
        return this.dismissTimeout;
      });
      await pause(200); 
    }
    this.dismissed.emit();
    this.elementRef.nativeElement.remove();
  }

}

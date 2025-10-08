import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';

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
        sm: 'px-2 py-0.5 text-xs',
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
  template: `
    <div [class]="computedClasses()" [attr.role]="role">
      <!-- Leading icon slot -->
      <span *ngIf="hasLeadingIcon" class="mr-1 flex-shrink-0">
        <ng-content select="[slot=leading-icon]"></ng-content>
      </span>

      <!-- Badge content -->
      <span class="truncate">
        <ng-content></ng-content>
      </span>

      <!-- Trailing icon slot -->
      <span *ngIf="hasTrailingIcon" class="ml-1 flex-shrink-0">
        <ng-content select="[slot=trailing-icon]"></ng-content>
      </span>

      <!-- Dismiss button -->
      <button
        *ngIf="dismissible"
        type="button"
        class="ml-1 flex-shrink-0 rounded-full p-0.5 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
        (click)="onDismiss()"
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
    </div>
  `,
})
export class BadgeComponent implements BadgeProps {
  @Input() variant: BadgeProps['variant'] = 'default';
  @Input() size: BadgeProps['size'] = 'default';
  @Input() dismissible = false;
  @Input() className = '';
  @Input() role = 'status';
  @Input() ariaLabel?: string;

  // Signals for reactive state
  private variantSignal = signal(this.variant);
  private sizeSignal = signal(this.size);
  private classNameSignal = signal(this.className);

  // Check for projected content
  hasLeadingIcon = false;
  hasTrailingIcon = false;

  // Computed properties
  computedClasses = computed(() => {
    return badgeVariants({
      variant: this.variantSignal(),
      size: this.sizeSignal(),
      className: this.classNameSignal(),
    });
  });

  ngOnInit() {
    this.variantSignal.set(this.variant);
    this.sizeSignal.set(this.size);
    this.classNameSignal.set(this.className);
  }

  ngOnChanges() {
    this.variantSignal.set(this.variant);
    this.sizeSignal.set(this.size);
    this.classNameSignal.set(this.className);
  }

  ngAfterContentInit() {
    // In a real implementation, you would check for projected content
    // For now, we'll assume content exists
    this.hasLeadingIcon = true;
    this.hasTrailingIcon = true;
  }

  onDismiss() {
    // Emit dismiss event or handle removal
    const event = new CustomEvent('dismiss', {
      bubbles: true,
      cancelable: true,
    });
    
    // Dispatch the event on the host element
    const hostElement = document.querySelector('ng-shadcn-badge');
    hostElement?.dispatchEvent(event);
  }
}

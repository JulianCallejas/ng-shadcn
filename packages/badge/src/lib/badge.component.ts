import { Component, Input, computed, signal, ContentChild, ElementRef, booleanAttribute, Output, EventEmitter, inject, DestroyRef, AfterContentInit, AfterContentChecked, contentChild } from '@angular/core';
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
      @if (!!dismissible()) {
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

  @Input({ alias: 'variant' }) set _variant(v: BadgeProps['variant']) {
    this.variant.set(v ?? 'default');
  }

  @Input({ alias: 'size' }) set _size(v: BadgeProps['size']) {
    this.size.set(v ?? 'default');
  }

  @Input({ alias: 'dismissible'})
  set _dismissible(v: 'hide' | 'remove') {
    if (!v) {
      this.dismissible.set('');
      return;
    }
    this.dismissible.set(v);
  }

  @Input({ alias: 'fade', transform: booleanAttribute })
  set _fade(v: boolean) {
    this.fade.set(!!v);
  }

  @Input({ alias: 'class' }) set _class(v: string) {
    this.class.set(v ?? '');
  }
  
  variant = signal<BadgeProps['variant']>('default');
  size = signal<BadgeProps['size']>('default');
  dismissible = signal<'hide' | 'remove'| ''>('');
  fade = signal(false);
  class = signal('');


  @Input() role = 'status';
  @Input() ariaLabel?: string;
  @Output() dismissed = new EventEmitter<void>();
  
  /** @ignore */
  isDismissed = signal(false);
  
  /** @ignore */
  private destroyRef = inject(DestroyRef); 
  
  /** @ignore */
  private dismissTimeout?: number;

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
      const pause = (ms) => new Promise(res => setTimeout(res, ms));
      await pause(200); 
    }
    this.dismissed.emit();
    if (this.dismissible() === 'remove') {
      this.removeFromDOM();
    }
  }

  /** @ignore */
  private removeFromDOM(): void {
    const element = this.elementRef.nativeElement;
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }
  
}

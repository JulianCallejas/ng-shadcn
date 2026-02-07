import { Component, input, output, effect, signal, computed, ElementRef, contentChild, booleanAttribute, HostListener, inject, ChangeDetectionStrategy, linkedSignal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

const dialogVariants = cva(
  'fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-4 shadow-lg sm:rounded-lg'
  + 'backdrop:bg-black/80 backdrop:backdrop-blur-sm backdrop:animate-in backdrop:fade-in backdrop:duration-300',
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export type DialogVariantProps = VariantProps<typeof dialogVariants>;

@Component({
  selector: 'ng-shadcn-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
  ],
  styles: `
    @keyframes dialog-fade-in {
      0% { 
        opacity: 0%; 
        transform: scale(0);
      }
      100% { 
        opacity: 100%; 
        transform: scale(1);
      }
    }
    .dialog-in {
      animation: dialog-fade-in 50ms ease-out forwards;
    }
    
    .dialog-out {
      animation: dialog-fade-in 30ms ease-out reverse backwards;
    }
  `,
  template: `
    <!-- Trigger -->
    <ng-content select="ng-shadcn-dialog-trigger"></ng-content>
    @if (isOpenState) {
      <!-- Backdrop -->
      <div 
      class="fixed inset-0 z-50 bg-black/80 w-svw h-svh backdrop-blur-xs"
        animate.enter="dialog-in"
        animate.leave="dialog-out"
        (click)="onBackdropClick()"
      ></div>
      
      <!-- Dialog -->
        <div 
          [class]="computedClasses()"
          
          role="dialog"
          [attr.aria-labelledby]="titleId()"
          [attr.aria-describedby]="descriptionId()"
          aria-modal="true"
          >
          @if (showCloseButton()) {
            <button
              type="button"
              (click)="close()"
              [attr.aria-label]="'Close'"
              class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="h-4 w-4"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              <span class="sr-only">Close</span>
            </button>
          }
          <ng-content select="ng-shadcn-dialog-header"></ng-content>
          <ng-content select="ng-shadcn-dialog-content"></ng-content>
          <ng-content></ng-content>
          <ng-content select="ng-shadcn-dialog-footer"></ng-content>
        </div>
      }
  `,
})
export class DialogComponent implements OnDestroy {
  // Inputs
  id = input<string>('dialog-01');
  showCloseButton = input(true, { transform: booleanAttribute });
  backdropClick = input(true, { transform: booleanAttribute });
  size = input<DialogVariantProps['size']>('md');
  isOpen = input(false, { transform: booleanAttribute });
  class = input('');
  bodyOverflow = ''
  
  // Outputs
  opened = output<void>();
  closed = output<void>();
  
  // Internal state
  private _isOpen = linkedSignal(this.isOpen);
  
  // Public getter for template access
  get isOpenState() {
    return this._isOpen();
  }
  
  titleId = computed(()=>`dialog-title-${this.id()}`);
  descriptionId = computed(()=>`dialog-description-${this.id()}`);
    
  // Computed
  /** @ignore */
  computedClasses = computed(() => 
    cn(
      dialogVariants({ 
        size: this.size() 
      }),
      this.class()
    )
  );

  // Effects
  constructor() {
    // Handle body overflow and emit events
    effect(() => {
      if (this._isOpen()) {
        document.body.style.overflow = 'hidden';
        this.opened.emit();
      } else {
        document.body.style.overflow = '';
        this.closed.emit();
      }
    });
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  /** @ignore */
  open() {
    this._isOpen.set(true);
  }

  /** @ignore */
  close() {
    this._isOpen.set(false);
  }

  // Private methods
  /** @ignore */
  onBackdropClick() {
    if (this.backdropClick()) {
      this.close();
    }
  }

  // Handle escape key
  /** @ignore */
  @HostListener('document:keydown.escape')
  onKeyDown() {
    if (this.isOpen()) {
      this.close();
    }
  }
}
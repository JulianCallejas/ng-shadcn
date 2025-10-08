import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

/**
 * Dialog component for modal interactions
 * Supports animations, backdrop, and accessibility
 */
@Component({
  selector: 'ng-shadcn-dialog',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('overlay', [
      state('hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('hidden => visible', animate('150ms ease-out')),
      transition('visible => hidden', animate('150ms ease-in')),
    ]),
    trigger('content', [
      state('hidden', style({ 
        opacity: 0, 
        transform: 'scale(0.95) translate(-50%, -48%)' 
      })),
      state('visible', style({ 
        opacity: 1, 
        transform: 'scale(1) translate(-50%, -50%)' 
      })),
      transition('hidden => visible', animate('150ms ease-out')),
      transition('visible => hidden', animate('150ms ease-in')),
    ]),
  ],
  template: `
    @if (isOpen()) {
      <!-- Backdrop -->
      <div 
        class="fixed inset-0 z-50 bg-black/80"
        [@overlay]="isOpen() ? 'visible' : 'hidden'"
        (click)="onBackdropClick()"
      ></div>
      
      <!-- Dialog -->
      <div 
        class="fixed left-[50%] top-[50%] z-50 grid w-full gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg"
        [class]="dialogSizeClasses"
        [@content]="isOpen() ? 'visible' : 'hidden'"
        role="dialog"
        [attr.aria-labelledby]="title ? 'dialog-title' : null"
        [attr.aria-describedby]="description ? 'dialog-description' : null"
        aria-modal="true"
      >
        <!-- Header -->
        @if (title || showCloseButton) {
          <div class="flex flex-col space-y-1.5 text-center sm:text-left">
            @if (title) {
              <h2 id="dialog-title" class="text-lg font-semibold leading-none tracking-tight">
                {{ title }}
              </h2>
            }
            @if (description) {
              <p id="dialog-description" class="text-sm text-muted-foreground">
                {{ description }}
              </p>
            }
            @if (showCloseButton) {
              <button
                class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                (click)="close()"
                type="button"
              >
                <span class="sr-only">Close</span>
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
            }
          </div>
        }
        
        <!-- Content -->
        <div class="flex-1">
          <ng-content></ng-content>
        </div>
        
        <!-- Footer -->
        <ng-content select="[slot=footer]"></ng-content>
      </div>
    }
  `,
})
export class DialogComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() showCloseButton = true;
  @Input() backdrop = true;
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  isOpen = signal(false);

  get dialogSizeClasses(): string {
    const sizeMap = {
      sm: 'max-w-sm',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
      xl: 'max-w-4xl',
    };
    return sizeMap[this.size] || sizeMap.md;
  }

  open() {
    this.isOpen.set(true);
    this.opened.emit();
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.isOpen.set(false);
    this.closed.emit();
    
    // Restore body scroll
    document.body.style.overflow = '';
  }

  onBackdropClick() {
    if (this.backdrop) {
      this.close();
    }
  }

  // Handle escape key
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.close();
    }
  }
}
import { Component, input, output, effect, signal, computed, ElementRef, contentChild, booleanAttribute, HostListener, inject, ChangeDetectionStrategy, linkedSignal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';


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
  template: `
    <!-- Trigger -->
    <div [class]="class()">
      <ng-content select="ng-shadcn-dialog-trigger"></ng-content>
      <ng-content></ng-content>
    </div>
    
    @if (isOpenState) {
      <ng-content select="ng-shadcn-dialog-content"></ng-content>
    }
  `,
})
export class DialogComponent implements OnDestroy {
 
  /**
   * Unique id for the dialog. Useful for accessibility purposes.
   * @defaultValue 'dlg-<random-number>'
   */
  id = input<string>(`dlg-${crypto.getRandomValues(new Uint32Array(1))[0]}`);

  /**
   * Determines whether the close button should be shown.
   * @defaultValue true
   */
  showCloseButton = input(true, { transform: booleanAttribute });

  /**
   * Determines whether the dialog should close when the backdrop is clicked.
   * @defaultValue true
   */
  backdropClick = input(true, { transform: booleanAttribute });

  /**
   * The size of the dialog.
   * @defaultValue 'md'
   */
  size = input<DialogVariantProps['size']>('md');

  /**
   * Determines whether the dialog is open or closed.
   * @defaultValue false
   */
  isOpen = input(false, { transform: booleanAttribute });

  /**
   * Additional classes to be applied to the dialog.
   */
  class = input<string>('');

  /**
   * Emits when the dialog is opened.
   */
  opened = output<void>();

  /**
   * Emits when the dialog is closed.
   */
  closed = output<void>();
  
  /** @ignore */
  private _isOpen = linkedSignal(this.isOpen);

  /** @ignore */
  get isOpenState() {
    return this._isOpen();
  }
  
    /** @ignore */
  titleId = computed(()=>`dialog-title-${this.id()}`);
  
  /** @ignore */
  descriptionId = computed(()=>`dialog-description-${this.id()}`);
    
  // Computed
  /** @ignore */
  sizeClasses = computed(() => 
      dialogVariants({ 
        size: this.size() 
      }),
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

  
  /** @ignore */
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
    if (this.isOpenState) {
      this.close();
    }
  }
}
import { Component, Input, Output, EventEmitter, signal, computed, ElementRef, ViewChild, HostListener, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Popover placement options
 */
export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';

/**
 * Popover content component
 */
@Component({
  selector: 'ng-shadcn-popover-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="computedClasses"
      [attr.data-state]="isOpen ? 'open' : 'closed'"
      [attr.data-side]="placement"
      role="dialog"
      [attr.aria-modal]="modal"
      [style.display]="isOpen ? 'block' : 'none'"
      [style.position]="'absolute'"
      [style.z-index]="50"
      [style.top.px]="position.top"
      [style.left.px]="position.left"
      [style.transform]="transform">
      
      @if (showArrow) {
        <div 
          class="absolute h-2 w-2 rotate-45 border bg-popover"
          [style.top]="arrowPosition.top"
          [style.left]="arrowPosition.left"
          [style.bottom]="arrowPosition.bottom"
          [style.right]="arrowPosition.right">
        </div>
      }
      
      <div class="relative z-10">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class PopoverContentComponent {
  @Input() className = '';
  @Input() placement: PopoverPlacement = 'bottom';
  @Input() showArrow = true;
  @Input() modal = false;
  @Input() isOpen = false;
  @Input() position = { top: 0, left: 0 };

  get computedClasses(): string {
    const baseClasses = 'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none';
    const animationClasses = 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2';
    
    return `${baseClasses} ${animationClasses} ${this.className}`;
  }

  get transform(): string {
    switch (this.placement) {
      case 'top':
      case 'top-start':
      case 'top-end':
        return 'translateY(-100%)';
      case 'left':
      case 'left-start':
      case 'left-end':
        return 'translateX(-100%)';
      case 'right':
      case 'right-start':
      case 'right-end':
        return 'translateX(0)';
      default:
        return 'translateY(0)';
    }
  }

  get arrowPosition(): { top?: string; left?: string; bottom?: string; right?: string } {
    if (!this.showArrow) return {};

    switch (this.placement) {
      case 'top':
        return { bottom: '-4px', left: '50%', transform: 'translateX(-50%)' };
      case 'bottom':
        return { top: '-4px', left: '50%', transform: 'translateX(-50%)' };
      case 'left':
        return { right: '-4px', top: '50%', transform: 'translateY(-50%)' };
      case 'right':
        return { left: '-4px', top: '50%', transform: 'translateY(-50%)' };
      case 'top-start':
        return { bottom: '-4px', left: '12px' };
      case 'top-end':
        return { bottom: '-4px', right: '12px' };
      case 'bottom-start':
        return { top: '-4px', left: '12px' };
      case 'bottom-end':
        return { top: '-4px', right: '12px' };
      case 'left-start':
        return { right: '-4px', top: '12px' };
      case 'left-end':
        return { right: '-4px', bottom: '12px' };
      case 'right-start':
        return { left: '-4px', top: '12px' };
      case 'right-end':
        return { left: '-4px', bottom: '12px' };
      default:
        return {};
    }
  }
}

/**
 * Popover trigger component
 */
@Component({
  selector: 'ng-shadcn-popover-trigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      #triggerElement
      [attr.aria-haspopup]="'dialog'"
      [attr.aria-expanded]="isOpen"
      [attr.data-state]="isOpen ? 'open' : 'closed'"
      (click)="toggle()"
      (keydown)="handleKeyDown($event)">
      <ng-content></ng-content>
    </div>
  `,
})
export class PopoverTriggerComponent {
  @ViewChild('triggerElement', { static: true }) triggerElement!: ElementRef;
  
  @Input() isOpen = false;
  @Output() openChange = new EventEmitter<boolean>();

  toggle(): void {
    this.isOpen = !this.isOpen;
    this.openChange.emit(this.isOpen);
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle();
    }
  }

  getPosition(placement: PopoverPlacement): { top: number; left: number } {
    const rect = this.triggerElement.nativeElement.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    switch (placement) {
      case 'top':
        return {
          top: rect.top + scrollTop - 8,
          left: rect.left + scrollLeft + rect.width / 2
        };
      case 'bottom':
        return {
          top: rect.bottom + scrollTop + 8,
          left: rect.left + scrollLeft + rect.width / 2
        };
      case 'left':
        return {
          top: rect.top + scrollTop + rect.height / 2,
          left: rect.left + scrollLeft - 8
        };
      case 'right':
        return {
          top: rect.top + scrollTop + rect.height / 2,
          left: rect.right + scrollLeft + 8
        };
      case 'top-start':
        return {
          top: rect.top + scrollTop - 8,
          left: rect.left + scrollLeft
        };
      case 'top-end':
        return {
          top: rect.top + scrollTop - 8,
          left: rect.right + scrollLeft
        };
      case 'bottom-start':
        return {
          top: rect.bottom + scrollTop + 8,
          left: rect.left + scrollLeft
        };
      case 'bottom-end':
        return {
          top: rect.bottom + scrollTop + 8,
          left: rect.right + scrollLeft
        };
      case 'left-start':
        return {
          top: rect.top + scrollTop,
          left: rect.left + scrollLeft - 8
        };
      case 'left-end':
        return {
          top: rect.bottom + scrollTop,
          left: rect.left + scrollLeft - 8
        };
      case 'right-start':
        return {
          top: rect.top + scrollTop,
          left: rect.right + scrollLeft + 8
        };
      case 'right-end':
        return {
          top: rect.bottom + scrollTop,
          left: rect.right + scrollLeft + 8
        };
      default:
        return {
          top: rect.bottom + scrollTop + 8,
          left: rect.left + scrollLeft + rect.width / 2
        };
    }
  }
}

/**
 * Main popover component
 */
@Component({
  selector: 'ng-shadcn-popover',
  standalone: true,
  imports: [CommonModule, PopoverTriggerComponent, PopoverContentComponent],
  template: `
    <div class="relative inline-block" [class]="className">
      <ng-content select="ng-shadcn-popover-trigger"></ng-content>
      <ng-content select="ng-shadcn-popover-content"></ng-content>
    </div>
  `,
})
export class PopoverComponent implements AfterContentInit {
  @Input() className = '';
  @Input() open = false;
  @Input() placement: PopoverPlacement = 'bottom';
  @Input() modal = false;
  @Input() closeOnClickOutside = true;

  @Output() openChange = new EventEmitter<boolean>();

  @ContentChildren(PopoverTriggerComponent) triggers!: QueryList<PopoverTriggerComponent>;
  @ContentChildren(PopoverContentComponent) contents!: QueryList<PopoverContentComponent>;

  private isOpen = signal(false);

  // Computed property for open state
  openState = computed(() => this.isOpen());

  ngAfterContentInit(): void {
    // Set initial state
    this.isOpen.set(this.open);

    // Subscribe to trigger events
    this.triggers.forEach(trigger => {
      trigger.openChange.subscribe(open => {
        this.setOpen(open);
      });
    });

    this.updateComponentStates();
  }

  ngOnChanges(): void {
    this.isOpen.set(this.open);
    this.updateComponentStates();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.closeOnClickOutside || !this.isOpen()) return;

    const target = event.target as HTMLElement;
    const popoverElement = (event.currentTarget as HTMLElement)?.querySelector('ng-shadcn-popover');
    
    if (popoverElement && !popoverElement.contains(target)) {
      this.setOpen(false);
    }
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isOpen()) {
      this.setOpen(false);
    }
  }

  private setOpen(open: boolean): void {
    this.isOpen.set(open);
    this.openChange.emit(open);
    this.updateComponentStates();
  }

  private updateComponentStates(): void {
    const isOpen = this.isOpen();

    // Update trigger states
    this.triggers?.forEach(trigger => {
      trigger.isOpen = isOpen;
    });

    // Update content states
    this.contents?.forEach(content => {
      content.isOpen = isOpen;
      content.placement = this.placement;
      content.modal = this.modal;
      
      // Update position when opening
      if (isOpen && this.triggers.length > 0) {
        const position = this.triggers.first.getPosition(this.placement);
        content.position = position;
      }
    });
  }
}

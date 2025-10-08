import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

/**
 * Tooltip component for displaying contextual information
 */
@Component({
  selector: 'ng-shadcn-tooltip',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('tooltip', [
      state('hidden', style({ 
        opacity: 0, 
        transform: 'scale(0.8)' 
      })),
      state('visible', style({ 
        opacity: 1, 
        transform: 'scale(1)' 
      })),
      transition('hidden => visible', animate('150ms ease-out')),
      transition('visible => hidden', animate('150ms ease-in')),
    ]),
  ],
  template: `
    <div 
      class="z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
      [class]="positionClasses"
      [@tooltip]="isVisible() ? 'visible' : 'hidden'"
      role="tooltip"
    >
      {{ content }}
      
      <!-- Arrow -->
      <div 
        class="absolute h-2 w-2 bg-popover border-t border-l rotate-45"
        [class]="arrowClasses"
      ></div>
    </div>
  `,
})
export class TooltipComponent {
  @Input() content = '';
  @Input() position: 'top' | 'bottom' | 'left' | 'right' = 'top';
  
  isVisible = signal(false);

  get positionClasses(): string {
    const baseClasses = 'relative';
    return baseClasses;
  }

  get arrowClasses(): string {
    switch (this.position) {
      case 'top':
        return 'top-full left-1/2 -translate-x-1/2 -translate-y-1/2 border-r-0 border-b-0';
      case 'bottom':
        return 'bottom-full left-1/2 -translate-x-1/2 translate-y-1/2 border-l-0 border-t-0';
      case 'left':
        return 'left-full top-1/2 -translate-y-1/2 -translate-x-1/2 border-b-0 border-r-0';
      case 'right':
        return 'right-full top-1/2 -translate-y-1/2 translate-x-1/2 border-t-0 border-l-0';
      default:
        return '';
    }
  }

  show() {
    this.isVisible.set(true);
  }

  hide() {
    this.isVisible.set(false);
  }
}
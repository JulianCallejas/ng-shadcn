import { Directive, Input, ElementRef, OnDestroy, HostListener } from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { ComponentRef, ViewContainerRef } from '@angular/core';

/**
 * Tooltip directive for adding tooltips to any element
 */
@Directive({
  selector: '[ngShadcnTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnDestroy {
  @Input('ngShadcnTooltip') content = '';
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Input() tooltipDelay = 500;

  private tooltipRef: ComponentRef<TooltipComponent> | null = null;
  private showTimeout: any;
  private hideTimeout: any;

  constructor(
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef
  ) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.clearTimeouts();
    this.showTimeout = setTimeout(() => {
      this.showTooltip();
    }, this.tooltipDelay);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.clearTimeouts();
    this.hideTimeout = setTimeout(() => {
      this.hideTooltip();
    }, 100);
  }

  @HostListener('focus')
  onFocus() {
    this.showTooltip();
  }

  @HostListener('blur')
  onBlur() {
    this.hideTooltip();
  }

  private showTooltip() {
    if (!this.content || this.tooltipRef) return;

    this.tooltipRef = this.viewContainerRef.createComponent(TooltipComponent);
    this.tooltipRef.instance.content = this.content;
    this.tooltipRef.instance.position = this.tooltipPosition;
    
    // Position tooltip relative to trigger element
    this.positionTooltip();
    
    // Show tooltip
    this.tooltipRef.instance.show();
  }

  private hideTooltip() {
    if (this.tooltipRef) {
      this.tooltipRef.instance.hide();
      
      // Destroy after animation
      setTimeout(() => {
        if (this.tooltipRef) {
          this.tooltipRef.destroy();
          this.tooltipRef = null;
        }
      }, 150);
    }
  }

  private positionTooltip() {
    if (!this.tooltipRef) return;

    const triggerRect = this.elementRef.nativeElement.getBoundingClientRect();
    const tooltipElement = this.tooltipRef.location.nativeElement;
    
    // Position tooltip
    tooltipElement.style.position = 'fixed';
    tooltipElement.style.zIndex = '1000';
    
    const spacing = 8;
    
    switch (this.tooltipPosition) {
      case 'top':
        tooltipElement.style.left = `${triggerRect.left + triggerRect.width / 2}px`;
        tooltipElement.style.top = `${triggerRect.top - spacing}px`;
        tooltipElement.style.transform = 'translateX(-50%) translateY(-100%)';
        break;
      case 'bottom':
        tooltipElement.style.left = `${triggerRect.left + triggerRect.width / 2}px`;
        tooltipElement.style.top = `${triggerRect.bottom + spacing}px`;
        tooltipElement.style.transform = 'translateX(-50%)';
        break;
      case 'left':
        tooltipElement.style.left = `${triggerRect.left - spacing}px`;
        tooltipElement.style.top = `${triggerRect.top + triggerRect.height / 2}px`;
        tooltipElement.style.transform = 'translateX(-100%) translateY(-50%)';
        break;
      case 'right':
        tooltipElement.style.left = `${triggerRect.right + spacing}px`;
        tooltipElement.style.top = `${triggerRect.top + triggerRect.height / 2}px`;
        tooltipElement.style.transform = 'translateY(-50%)';
        break;
    }
  }

  private clearTimeouts() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
  }

  ngOnDestroy() {
    this.clearTimeouts();
    this.hideTooltip();
  }
}
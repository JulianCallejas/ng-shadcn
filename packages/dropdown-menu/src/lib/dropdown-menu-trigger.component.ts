import { CommonModule } from "@angular/common";
import { Component, ElementRef, output, Signal, signal } from "@angular/core";

@Component({
  selector: 'ng-shadcn-dropdown-menu-trigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [style.anchor-name]="'--' + id()"
      #triggerElement
      [attr.aria-haspopup]="'menu'"
      [attr.aria-expanded]="isOpen()"
      [attr.data-state]="isOpen() ? 'open' : 'closed'"
      (click)="toggle()"
      (keydown)="handleKeyDown($event)">
      <ng-content></ng-content>
    </div>
  `,
})
export class DropdownMenuTriggerComponent {
  
  
  isOpen: Signal<boolean> = signal(false);
  id: Signal<string> = signal('');
  openChange = output<boolean>();

  constructor(private elementRef: ElementRef) {}

  toggle(): void {
    this.openChange.emit(!this.isOpen());
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle();
    } else if (event.key === 'ArrowDown' && !this.isOpen()) {
      event.preventDefault();
      this.toggle();
    }
  }

  getPosition(): { top: number; left: number; height: number, bottom: number } {
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    return {
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      height: rect.height,
      bottom: rect.bottom
    };
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

@Component({
  selector: 'ng-shadcn-alert-action',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      [class]="computedClasses"
      (click)="onClick.emit($event)"
    >
      <ng-content></ng-content>
    </button>
  `
})
export class AlertActionComponent {
  @Input() class = '';
  @Output() onClick = new EventEmitter<MouseEvent>();

  /** @ignore */
  private readonly defaultClasses = 'absolute top-4 right-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground px-3';

  /** @ignore */
  computedClasses(): string {
    return cn(
      this.defaultClasses,
      this.class
    )
  }
}

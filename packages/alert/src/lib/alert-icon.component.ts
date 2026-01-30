import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

@Component({
  selector: 'ng-shadcn-alert-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="computedClasses">
      <ng-content></ng-content>
    </div>
  `
})
export class AlertIconComponent {
  @Input() class = '';

  /** @ignore */
  computedClasses(): string {
    return cn(
      'h-4 w-4',
      this.class
    )
  }
}

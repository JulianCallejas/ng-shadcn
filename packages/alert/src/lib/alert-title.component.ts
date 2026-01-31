import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

@Component({
  selector: 'ng-shadcn-alert-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h5 [class]="computedClasses()">
      <ng-content></ng-content>
    </h5>
  `
})
export class AlertTitleComponent {
  @Input() class = '';

  /** @ignore */
  computedClasses(): string {
    return cn(
      'mb-1 font-medium leading-none tracking-tight',
      this.class
    )
  }
}

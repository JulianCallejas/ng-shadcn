import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

@Component({
  selector: 'ng-shadcn-alert-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="computedClasses()">
      <ng-content></ng-content>
    </div>
  `
})
export class AlertContentComponent {
  @Input() class = '';

  /** @ignore */
  computedClasses(): string {
    return cn(
      '[&_p]:leading-relaxed ',
      this.class
    )
  }
}

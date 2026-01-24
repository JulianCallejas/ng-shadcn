import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ng-shadcn-alert-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="'[&_p]:leading-relaxed ' + (class || '')">
      <ng-content></ng-content>
    </div>
  `
})
export class AlertContentComponent {
  @Input() class = '';
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ng-shadcn-alert-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h5 [class]="'mb-1 font-medium leading-none tracking-tight ' + (class || '')">
      <ng-content></ng-content>
    </h5>
  `
})
export class AlertTitleComponent {
  @Input() class = '';
}

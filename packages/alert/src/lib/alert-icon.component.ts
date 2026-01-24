import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ng-shadcn-alert-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="'h-4 w-4 ' + (class || '')">
      <ng-content></ng-content>
    </div>
  `
})
export class AlertIconComponent {
  @Input() class = '';
}

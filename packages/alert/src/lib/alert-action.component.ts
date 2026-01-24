import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ng-shadcn-alert-action',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      [class]="'absolute top-4 right-4 ' + (class || '')"
      (click)="onClick.emit($event)"
    >
      <ng-content></ng-content>
    </button>
  `
})
export class AlertActionComponent {
  @Input() class = '';
  @Output() onClick = new EventEmitter<MouseEvent>();
}

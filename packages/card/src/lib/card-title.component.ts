import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

/**
 * Card title component
 */
@Component({
  selector: 'ng-shadcn-card-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3 [class]="computedClasses">
      <ng-content></ng-content>
    </h3>
  `,
})
export class CardTitleComponent {
  @Input() class = '';

  get computedClasses(): string {
    return cn(
      'text-2xl font-semibold leading-none tracking-tight',
      this.class
    );
  }
}
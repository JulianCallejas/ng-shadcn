import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

/**
 * Card footer component
 */
@Component({
  selector: 'ng-shadcn-card-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="computedClasses">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardFooterComponent {
  @Input() class = '';

  get computedClasses(): string {
    return cn(
      'flex items-center p-6',
      this.class
    );
  }
}
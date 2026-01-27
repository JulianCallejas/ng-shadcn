import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

/**
 * Card content component
 */
@Component({
  selector: 'ng-shadcn-card-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="computedClasses">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardContentComponent {
  @Input() class = '';
  
  get computedClasses(): string {
    return cn(
      'px-6',
      this.class
    );
  }

}
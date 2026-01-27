import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

/**
 * Card header component
 */
@Component({
  selector: 'ng-shadcn-card-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="computedClasses">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardHeaderComponent {
  @Input() class = '';

  get computedClasses(): string {
    return cn(
      'flex flex-col space-y-1.5 p-6',
      this.class
    );
  }
}
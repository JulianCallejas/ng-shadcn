import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

/**
 * Card description component
 */
@Component({
  selector: 'ng-shadcn-card-description',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p [class]="computedClasses">
      <ng-content></ng-content>
    </p>
  `,
})
export class CardDescriptionComponent {
  @Input() class = '';

  get computedClasses(): string {
    return cn(
      'text-sm text-muted-foreground',
      this.class
    );
  }
}
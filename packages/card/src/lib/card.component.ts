import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Card component for content containers
 * Provides consistent styling and spacing
 */
@Component({
  selector: 'ng-shadcn-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="computedClasses">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {
  @Input() className = '';

  get computedClasses(): string {
    return `rounded-lg border bg-card text-card-foreground shadow-sm ${this.className}`;
  }
}

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
  @Input() className = '';

  get computedClasses(): string {
    return `flex flex-col space-y-1.5 p-6 ${this.className}`;
  }
}

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
  @Input() className = '';

  get computedClasses(): string {
    return `text-2xl font-semibold leading-none tracking-tight ${this.className}`;
  }
}

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
  @Input() className = '';

  get computedClasses(): string {
    return `text-sm text-muted-foreground ${this.className}`;
  }
}

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
  @Input() className = '';

  get computedClasses(): string {
    return `p-6 pt-0 ${this.className}`;
  }
}

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
  @Input() className = '';

  get computedClasses(): string {
    return `flex items-center p-6 pt-0 ${this.className}`;
  }
}
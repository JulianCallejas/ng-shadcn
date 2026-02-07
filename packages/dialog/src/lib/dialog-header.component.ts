import { Component, computed, input, booleanAttribute, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

@Component({
  selector: 'ng-shadcn-dialog-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div [class]="computedClasses()">
      <ng-content select="ng-shadcn-dialog-title"></ng-content>
      <ng-content select="ng-shadcn-dialog-description"></ng-content>
      <ng-content></ng-content>
    </div>
  `,
})
export class DialogHeaderComponent {
  class = input('');
  computedClasses = computed(() => 
    cn('flex flex-col gap-2', this.class())
  );
}

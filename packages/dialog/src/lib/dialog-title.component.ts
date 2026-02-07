import { ChangeDetectionStrategy, Component, Input, computed, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';
import { DialogComponent } from './dialog.component';

@Component({
  selector: 'ng-shadcn-dialog-title',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <h2 
      [class]="computedClasses()"
      [id]="titleId()"
      role="heading"
      aria-level="2"
    >
      <ng-content></ng-content>
    </h2>
  `
})
export class DialogTitleComponent {
  private dialog = inject(DialogComponent);
  titleId = computed(() => this.dialog.titleId());
  class = input('');
  
  computedClasses = computed(() => 
    cn('text-base leading-none font-medium', this.class())
  );
}

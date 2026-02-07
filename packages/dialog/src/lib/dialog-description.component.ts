import { ChangeDetectionStrategy, Component, input, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';
import { DialogComponent } from './dialog.component';


@Component({
  selector: 'ng-shadcn-dialog-description',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <p 
      [class]="computedClasses()"
      [id]="descriptionId()"
      role="region"
      aria-live="polite"
    >
      <ng-content></ng-content>
    </p>
  `
})
export class DialogDescriptionComponent {
  private dialog = inject(DialogComponent);
  class = input('');
  descriptionId = computed(() => this.dialog.descriptionId());

  computedClasses = computed(() => 
    cn(
      'text-muted-foreground *:[a]:hover:text-foreground text-sm *:[a]:underline *:[a]:underline-offset-3',
      this.class
    )
  );
}

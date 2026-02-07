import { ChangeDetectionStrategy, Component, Input, booleanAttribute, computed, inject, input } from '@angular/core';
import { DialogComponent } from './dialog.component';
import { CommonModule } from '@angular/common';
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

@Component({
  selector: 'ng-shadcn-dialog-close',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  host: {
    '(click)': 'close()'
  },
  template: `
    <ng-template #content>
      <ng-content></ng-content>
    </ng-template>

    @if (!asChild()) {
      <button
        type="button"
        [attr.aria-label]="ariaLabel"
        [class]="computedClasses()"
      >
        <ng-container *ngTemplateOutlet="content"></ng-container>
      </button>
    } @else {
      <ng-container *ngTemplateOutlet="content"></ng-container>
    }
  `
})
export class DialogCloseComponent {
  private dialog = inject(DialogComponent);
  asChild = input(false, { transform: booleanAttribute });
  @Input() ariaLabel = 'Close';
  class = input('');

  computedClasses = computed(() => 
    cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2',
      this.class()
    )
  );

  close() {
    this.dialog.close();
  }
  
}

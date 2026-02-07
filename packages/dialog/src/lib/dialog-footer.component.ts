import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

@Component({
  selector: 'ng-shadcn-dialog-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="computedClasses()">
      <ng-content></ng-content>
    </div>
  `,
})
export class DialogFooterComponent {
  class = input('');

  computedClasses = computed(() => 
    cn(
      // 'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      'bg-muted/50 -mx-4 -mb-4 flex flex-col gap-2 rounded-b-xl border-t p-4 sm:flex-row sm:justify-end',
      this.class()
    )
  );
}

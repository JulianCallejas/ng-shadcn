import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

@Component({
  selector: 'ng-shadcn-dialog-content',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="computedClasses()">
      <ng-content></ng-content>
    </div>
  `,
})
export class DialogContentComponent {
  class = input('');

  computedClasses = computed(() => 
    cn('flex-1', this.class())
  );
}

import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
// import { cn } from '@ng-shadcn/utils';
import { cn, PortalHostDirective } from '@packages/utils/src/public-api';
import { DialogComponent } from './dialog.component';


@Component({
  selector: 'ng-shadcn-dialog-content',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PortalHostDirective],
  styles: `
    @keyframes dialog-fade-in {
      0% { 
        opacity: 0%; 
        transform: scale(0);
      }
      100% { 
        opacity: 100%; 
        transform: scale(1);
      }
    }
    .dialog-in {
      animation: dialog-fade-in 50ms ease-out forwards;
    }
    
    .dialog-out {
      animation: dialog-fade-in 30ms ease-out reverse backwards;
    }
  `,
  template: `
    @if (dialog.isOpenState) {
    <!-- Backdrop -->
      <div 
        class="fixed inset-0 z-50 bg-black/80 w-svw h-svh backdrop-blur-xs"
        animate.enter="dialog-in"
        animate.leave="dialog-out"
        (click)="dialog.onBackdropClick()"
        portalHost
      ></div>
      
      <!-- Dialog -->
      <div 
        [class]="computedClasses()"
        [attr.aria-labelledby]="dialog.titleId()"
        [attr.aria-describedby]="dialog.descriptionId()"
        role="dialog"
        aria-modal="true"
        portalHost
        >
        @if (dialog.showCloseButton()) {
          <button
            type="button"
            (click)="dialog.close()"
            [attr.aria-label]="'Close'"
            class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-4 w-4"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            <span class="sr-only">Close</span>
          </button>
        }
        <ng-content select="ng-shadcn-dialog-header"></ng-content>
        <ng-content></ng-content>
        <ng-content select="ng-shadcn-dialog-footer"></ng-content>
      </div>
    }
  `,
})
export class DialogContentComponent {
  
  /**
   * Additional classes to apply to the dialog content.
   * Useful for custom styling.
   */
  class = input<string>('');
  
  /** @ignore */
  protected dialog = inject(DialogComponent);

  /** @ignore */
  computedClasses = computed(() => 
    cn(
      this.dialog.sizeClasses(),
      this.class()
    )
  )
  
  
}

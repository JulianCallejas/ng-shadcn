import { CommonModule } from "@angular/common";
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, ElementRef, input, output, Signal, signal } from "@angular/core";

// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

@Component({
  selector: 'ng-shadcn-dropdown-menu-trigger',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  host: {
    '(click)': 'toggle(!isOpen())',
    '[class]': 'computedHostClasses()',
    '(keydown)': 'handleKeyDown($event)'
  },
  template: `
    <ng-template #content>
      <ng-content></ng-content>
    </ng-template>

    @if (!asChild()) {
      <button
        type="button"
        [attr.aria-haspopup]="'menu'"
        [attr.aria-expanded]="isOpen()"
        [attr.data-state]="isOpen() ? 'open' : 'closed'"
        [class]="computedClasses()"
      >
        <ng-container *ngTemplateOutlet="content"></ng-container>
      </button>
    } @else {
      <ng-container *ngTemplateOutlet="content" [class]="computedHostClasses()"></ng-container>
    }
    
  `,
  
})
export class DropdownMenuTriggerComponent {
    
  /**
   * Whether to render the trigger as a child component
   */
  asChild = input(false, { transform: booleanAttribute });

  /**
   * Additional CSS classes for the trigger component
   */
  class = input<string>('');

  /**
   * Event emitted when the open state of the dropdown menu changes
   */
  openChange = output<boolean>();
  
  /** @ignore */
  id: Signal<string> = signal('');
  
  /** @ignore */
  isOpen: Signal<boolean> = signal(false);

  constructor(private elementRef: ElementRef) {}

  /** @ignore */
  toggle(open: boolean): void {
    this.openChange.emit(open);
  }

  /** @ignore */
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle(!this.isOpen());
    } else if (event.key === 'ArrowDown' && !this.isOpen()) {
      event.preventDefault();
      this.toggle(!this.isOpen());
    }
  }

  /** @ignore */
  getPosition(): { top: number; left: number; height: number, bottom: number } {
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    return {
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      height: rect.height,
      bottom: rect.bottom
    };
  }

  /** @ignore */
  computedClasses = computed(() => 
    cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2',
      this.class()
    )
  );
  
  /** @ignore */
  computedHostClasses = computed(() => 
    cn(
      'inline-flex fit-content',
      this.class()
    )
  );
}

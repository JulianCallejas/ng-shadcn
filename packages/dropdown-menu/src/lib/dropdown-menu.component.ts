import {
  Component,
  Output,
  EventEmitter,
  computed,
  input,
  booleanAttribute,
  linkedSignal,
  contentChild,
  effect, 
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownMenuTriggerComponent } from './dropdown-menu-trigger.component';
import { DropdownMenuContentComponent } from './dropdown-menu-content.component';

// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';


@Component({
  selector: 'ng-shadcn-dropdown-menu',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div [class]="computedClasses()">
      <ng-content select="ng-shadcn-dropdown-menu-trigger"></ng-content>
      <ng-content select="ng-shadcn-dropdown-menu-content"></ng-content>
    </div>
  `,
})
export class DropdownMenuComponent {
  /**
   * Additional CSS classes to apply to the dropdown menu container
   */
  class = input<string>('');

  /**
   * Whether the dropdown is open (controlled)
   * @default false
   */
  open = input(false, { transform: booleanAttribute });

  /**
   * A unique identifier for the dropdown menu. Used for accessibility and associating the trigger with the content.
   * @default `ddm-<timestamp>-<random-number>`
   */
  id = input<string>(`ddm-${new Date().getTime()}-${Math.ceil(Math.random()*1000)}`);

  /**
   * Event emitted when the dropdown open state changes
   */
  @Output() openChange = new EventEmitter<boolean>();
  
  /** @ignore */
  trigger = contentChild(DropdownMenuTriggerComponent);
  
  /** @ignore */
  content =  contentChild(DropdownMenuContentComponent);
  

  /** @ignore */
  private isOpen = linkedSignal(this.open);

  constructor() {
    
    effect(onCleanup => {
      const child = this.trigger();
      if (!child) return;

      const sub = child.openChange.subscribe((open) => {
        this.setOpen(open);
      });

      onCleanup(() => sub.unsubscribe());
    });

    effect(()=>{
      this.trigger().isOpen = computed(()=> this.isOpen());
      this.trigger().id = computed(()=> this.id());
    })

    effect(()=>{
      this.content().isOpen = computed(()=> this.isOpen() );
      this.content().id = computed(()=> this.id());
    })
    
    effect(onCleanup => {
      if (!this.isOpen()) {
        return;
      }
      const children = this.content().menuItems();

      if (children.length === 0) {
        return;
      }

      const subs = children.map(child => {
        return child.itemSelected
          .subscribe(() => {
            this.setOpen(false);
          });
      });
      
      onCleanup(() => {
        subs.forEach(sub => sub.unsubscribe());
      });
    });
  }

  /** @ignore */
  setOpen(open: boolean): void {
    this.isOpen.set(open);
    this.openChange.emit(open);
    this.updateComponentPosition();
  }

  /** @ignore */
  private updateComponentPosition(): void {
    if (this.isOpen() && this.trigger()) {
      
      const position = this.trigger().getPosition();
      this.content().position.set({ 
        top: this.content().positionY() || position.top,
        left: this.content().positionX() || position.left,
        height: position.height,
        bottom: position.bottom
      });
    }
  }

  /** @ignore */
  computedClasses = computed(() => 
    cn(
      'relative inline-block text-left',
      this.class()
    )
  );

}

import {
  Component,
  Output,
  EventEmitter,
  computed,
  HostListener,
  input,
  booleanAttribute,
  linkedSignal,
  contentChildren,
  contentChild,
  effect 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownMenuTriggerComponent } from './dropdown-menu-trigger.component';
import { DropdownMenuContentComponent } from './dropdown-menu-content.component';
import { DropdownMenuItemComponent } from './dropdown-menu-item.component';

// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';


/**
 * Main dropdown menu component
 */
@Component({
  selector: 'ng-shadcn-dropdown-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="computedClasses()">
      <ng-content select="ng-shadcn-dropdown-menu-trigger"></ng-content>
      <ng-content select="ng-shadcn-dropdown-menu-content"></ng-content>
    </div>
  `,
})
export class DropdownMenuComponent {
  class = input<string>('');
  open = input(false, { transform: booleanAttribute });
  id = input<string>(`ddm-${new Date().getDate()}-${Math.ceil(Math.random()*1000)}`);

  @Output() openChange = new EventEmitter<boolean>();
  
  trigger = contentChild(DropdownMenuTriggerComponent);
  content =  contentChild(DropdownMenuContentComponent);
  menuItems = contentChildren(DropdownMenuItemComponent);

  /** @ignore */
  private isOpen = linkedSignal(this.open);

  constructor() {
    
    effect(onCleanup => {
      const child = this.trigger();
      if (!child) return;

      const sub = child.openChange.subscribe(open => {
        this.setOpen(open);
      });

      onCleanup(() => sub.unsubscribe());
    });

    effect(()=>{
      this.trigger().isOpen = computed(()=> this.isOpen());
      this.trigger().id = computed(()=> this.id());
    })

    effect(()=>{
      this.content().isOpen = computed(()=> this.isOpen());
      this.content().id = computed(()=> this.id());
    })
    
    effect(onCleanup => {
      const children = this.menuItems();

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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const dropdownElement = (event.currentTarget as HTMLElement)?.querySelector('ng-shadcn-dropdown-menu');
    
    if (this.isOpen() && dropdownElement && !dropdownElement.contains(target)) {
      this.setOpen(false);
    }
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isOpen()) {
      this.setOpen(false);
    }
  }

  private setOpen(open: boolean): void {
    this.isOpen.set(open);
    this.openChange.emit(open);
    this.updateComponentPosition();
  }

  private updateComponentPosition(): void {
    if (this.isOpen() && this.trigger()) {
      const position = this.trigger().getPosition();
      this.content().position.set({ 
        top: position.top,
        left: position.left,
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

import { CommonModule } from "@angular/common";
import { Component, computed, input, output } from "@angular/core";

// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

export interface DropdownMenuItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  separator?: boolean;
  shortcut?: string;
  action?: () => void;
}

/**
 * Individual dropdown menu item component
 */
@Component({
  selector: 'ng-shadcn-dropdown-menu-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="computedClasses()"
      [attr.data-disabled]="disabled()"
      role="menuitem"
      [attr.aria-disabled]="disabled()"
      [attr.tabindex]="disabled ? -1 : 0"
      (click)="handleClick()"
      (keydown)="handleKeyDown($event)">
      
      @if (icon()) {
        <span class="mr-2 h-4 w-4" [innerHTML]="icon()"></span>
      }
      
      <span class="flex-1">{{ label() }}</span>
      
      @if (shortcut()) {
        <span class="ml-auto text-xs tracking-widest opacity-60">{{ shortcut() }}</span>
      }
    </div>
  `,
})
export class DropdownMenuItemComponent {
  label = input('');
  icon = input('');
  disabled = input(false);
  shortcut = input('');
  class = input<string>('');
    
  itemSelected = output<void>();

     

  /** @ignore */
  handleClick(): void {
    if (!this.disabled) {
      this.itemSelected.emit();
    }
  }

  /** @ignore */
  computedClasses = computed(() => cn(
    'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
    this.disabled 
      ? 'pointer-events-none opacity-50' 
      : 'focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground',
    this.class()
  ));

  /** @ignore */
  handleKeyDown(event: KeyboardEvent): void {
    if ((event.key === 'Enter' || event.key === ' ') && !this.disabled) {
      event.preventDefault();
      this.handleClick();
    }
  }
}

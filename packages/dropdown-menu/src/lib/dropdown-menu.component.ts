import { Component, Input, Output, EventEmitter, signal, computed, ElementRef, ViewChild, HostListener, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Dropdown menu item interface
 */
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
      [class]="computedClasses"
      [attr.data-disabled]="disabled"
      role="menuitem"
      [attr.aria-disabled]="disabled"
      [attr.tabindex]="disabled ? -1 : 0"
      (click)="handleClick()"
      (keydown)="handleKeyDown($event)">
      
      @if (icon) {
        <span class="mr-2 h-4 w-4" [innerHTML]="icon"></span>
      }
      
      <span class="flex-1">{{ label }}</span>
      
      @if (shortcut) {
        <span class="ml-auto text-xs tracking-widest opacity-60">{{ shortcut }}</span>
      }
    </div>
  `,
})
export class DropdownMenuItemComponent {
  @Input() label = '';
  @Input() icon = '';
  @Input() disabled = false;
  @Input() shortcut = '';
  @Input() className = '';

  @Output() itemSelected = new EventEmitter<void>();

  get computedClasses(): string {
    const baseClasses = 'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors';
    const stateClasses = this.disabled 
      ? 'pointer-events-none opacity-50' 
      : 'focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground';
    
    return `${baseClasses} ${stateClasses} ${this.className}`;
  }

  handleClick(): void {
    if (!this.disabled) {
      this.itemSelected.emit();
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    if ((event.key === 'Enter' || event.key === ' ') && !this.disabled) {
      event.preventDefault();
      this.handleClick();
    }
  }
}

/**
 * Dropdown menu separator component
 */
@Component({
  selector: 'ng-shadcn-dropdown-menu-separator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="-mx-1 my-1 h-px bg-muted" role="separator"></div>
  `,
})
export class DropdownMenuSeparatorComponent {}

/**
 * Dropdown menu label component
 */
@Component({
  selector: 'ng-shadcn-dropdown-menu-label',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="px-2 py-1.5 text-sm font-semibold">
      <ng-content></ng-content>
    </div>
  `,
})
export class DropdownMenuLabelComponent {
  @Input() className = '';
}

/**
 * Dropdown menu content container
 */
@Component({
  selector: 'ng-shadcn-dropdown-menu-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="computedClasses"
      [attr.data-state]="isOpen ? 'open' : 'closed'"
      role="menu"
      [attr.aria-orientation]="'vertical'"
      [style.display]="isOpen ? 'block' : 'none'"
      [style.position]="'absolute'"
      [style.z-index]="50"
      [style.min-width.px]="minWidth"
      [style.top.px]="position.top"
      [style.left.px]="position.left">
      <ng-content></ng-content>
    </div>
  `,
})
export class DropdownMenuContentComponent {
  @Input() className = '';
  @Input() minWidth = 220;
  @Input() isOpen = false;
  @Input() position = { top: 0, left: 0 };

  get computedClasses(): string {
    const baseClasses = 'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md';
    const animationClasses = 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2';
    
    return `${baseClasses} ${animationClasses} ${this.className}`;
  }
}

/**
 * Dropdown menu trigger component
 */
@Component({
  selector: 'ng-shadcn-dropdown-menu-trigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      #triggerElement
      [attr.aria-haspopup]="'menu'"
      [attr.aria-expanded]="isOpen"
      [attr.data-state]="isOpen ? 'open' : 'closed'"
      (click)="toggle()"
      (keydown)="handleKeyDown($event)">
      <ng-content></ng-content>
    </div>
  `,
})
export class DropdownMenuTriggerComponent {
  @ViewChild('triggerElement', { static: true }) triggerElement!: ElementRef;
  
  @Input() isOpen = false;
  @Output() openChange = new EventEmitter<boolean>();

  toggle(): void {
    this.isOpen = !this.isOpen;
    this.openChange.emit(this.isOpen);
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle();
    } else if (event.key === 'ArrowDown' && !this.isOpen) {
      event.preventDefault();
      this.toggle();
    }
  }

  getPosition(): { top: number; left: number } {
    const rect = this.triggerElement.nativeElement.getBoundingClientRect();
    return {
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX
    };
  }
}

/**
 * Main dropdown menu component
 */
@Component({
  selector: 'ng-shadcn-dropdown-menu',
  standalone: true,
  imports: [CommonModule, DropdownMenuTriggerComponent, DropdownMenuContentComponent],
  template: `
    <div class="relative inline-block text-left" [class]="className">
      <ng-content select="ng-shadcn-dropdown-menu-trigger"></ng-content>
      <ng-content select="ng-shadcn-dropdown-menu-content"></ng-content>
    </div>
  `,
})
export class DropdownMenuComponent implements AfterContentInit {
  @Input() className = '';
  @Input() open = false;

  @Output() openChange = new EventEmitter<boolean>();

  @ContentChildren(DropdownMenuTriggerComponent) triggers!: QueryList<DropdownMenuTriggerComponent>;
  @ContentChildren(DropdownMenuContentComponent) contents!: QueryList<DropdownMenuContentComponent>;
  @ContentChildren(DropdownMenuItemComponent) menuItems!: QueryList<DropdownMenuItemComponent>;

  private isOpen = signal(false);

  // Computed property for open state
  openState = computed(() => this.isOpen());

  ngAfterContentInit(): void {
    // Set initial state
    this.isOpen.set(this.open);

    // Subscribe to trigger events
    this.triggers.forEach(trigger => {
      trigger.openChange.subscribe(open => {
        this.setOpen(open);
      });
    });

    // Subscribe to menu item selections
    this.menuItems.forEach(item => {
      item.itemSelected.subscribe(() => {
        this.setOpen(false);
      });
    });

    this.updateComponentStates();
  }

  ngOnChanges(): void {
    this.isOpen.set(this.open);
    this.updateComponentStates();
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
    this.updateComponentStates();
  }

  private updateComponentStates(): void {
    const isOpen = this.isOpen();

    // Update trigger states
    this.triggers?.forEach(trigger => {
      trigger.isOpen = isOpen;
    });

    // Update content states
    this.contents?.forEach(content => {
      content.isOpen = isOpen;
      
      // Update position when opening
      if (isOpen && this.triggers.length > 0) {
        const position = this.triggers.first.getPosition();
        content.position = position;
      }
    });
  }
}

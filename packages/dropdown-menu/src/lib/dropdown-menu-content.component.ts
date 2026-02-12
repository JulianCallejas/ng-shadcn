import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, contentChildren, effect, ElementRef, HostListener, inject, input, signal, Signal, viewChild } from "@angular/core";
import { DropdownMenuComponent } from "./dropdown-menu.component";
import { DropdownMenuItemComponent } from "./dropdown-menu-item.component";

// import { cn } from '@ng-shadcn/utils';
import { cn, PortalHostDirective } from '@packages/utils/src/public-api';

@Component({
  selector: 'ng-shadcn-dropdown-menu-content',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, PortalHostDirective],
  styles: `
  :root{
    --menu-top: 0;
    --menu-left: 0;
    --menu-trasntaleY: 0;
    --menu-min-width: 8rem;
  }
  .dropdown-position{
    position: absolute;
    top: var(--menu-top);
    left: var(--menu-left);
    min-width: var(--menu-min-width);
    transform: var(--menu-trasntaleY);
    z-index: 50;
  }
  `,
  template: `
    @if(isOpen()){
    <div
      #menuContent
      [class]="computedClasses()"
      [attr.data-state]="isOpen() ? 'open' : 'closed'"
      role="menu"
      [attr.aria-orientation]="'vertical'"
      [style.--menu-top.px]="position().top"
      [style.--menu-left.px]="position().left"
      [style.--menu-trasntaleY]="translateY()"
      [style.--menu-min-width.px]="minWidth()"
      (document:click)="onDocumentClick($event)"
      (document:keydown)="onDocumentKeyDown($event)"
      (mouseover)="onMouseOver()"
      portalHost
    >
      <ng-content></ng-content>
    </div>
    }
  `,
})
export class DropdownMenuContentComponent {
  /**
   * Class name for the dropdown menu content element.
   */
  class = input<string>('');

  /**
   * The x-coordinate of the dropdown menu content element.
   */
  positionX = input<number>(0);

  /**
   * The y-coordinate of the dropdown menu content element.
   */
  positionY = input<number>(0);

  /**
   * The minimum width of the dropdown menu content element.
   */
  minWidth = input<number>(220);
  
  /** @ignore */
  isOpen: Signal<boolean> = signal(false);
  
  /** @ignore */
  id: Signal<string> = signal('');
  
  /** @ignore */
  position = signal({ top: 0, left: 0, height: 0, bottom: 0 });

  /** @ignore */
  menuContent = viewChild<ElementRef<HTMLDivElement>>('menuContent');
  
  /** @ignore */
  menuItems = contentChildren(DropdownMenuItemComponent);
  
  /** @ignore */
  selectedItem = signal<number | null>(null);

  /** @ignore */
  dropdownComponent = inject(DropdownMenuComponent);

  constructor(private cdr: ChangeDetectorRef) {
    effect(()=>{
      const x = this.positionX() 
      const y = this.positionY() 
      Promise.resolve().then(() => {
      this.position.set({
        top: y || this.position().top,
        left: x || this.position().left,
        height: this.position().height, 
        bottom: this.position().bottom
      });
      this.cdr.markForCheck();
    });
      this.cdr.detectChanges();
    });
    
    effect(()=>{
      this.menuItems().forEach((item, index)=>{
        if (index === this.selectedItem()) {
          item.active.set(true);            
        } else {
          item.active.set(false);
        }
      });
    });
  }

  /** @ignore */
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const dropdownElement = this.menuContent()?.nativeElement;
    
    if (this.isOpen() && dropdownElement && !dropdownElement.contains(target)) {
      this.dropdownComponent.setOpen(false);
    }
  }

  /** @ignore */
  onDocumentKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isOpen()) {
      this.dropdownComponent.setOpen(false);
      this.selectedItem.set(null);
    }
    else if (event.key === 'ArrowDown' && this.isOpen()) {
      event.preventDefault();
      if (this.selectedItem() !== null && this.selectedItem() < this.menuItems().length - 1) {
        this.selectedItem.update((prevState)=> prevState + 1);
        return;
      }
      this.selectedItem.set(0);
    }
    else if (event.key === 'ArrowUp' && this.isOpen()) {
      event.preventDefault();
      if (this.selectedItem() !== null && this.selectedItem() > 0) {
        this.selectedItem.update((prevState)=> prevState - 1);
        return;
      }
      this.selectedItem.set(this.menuItems().length - 1);
    }
    if ((event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      if (this.selectedItem() !== null) {
        this.menuItems()[this.selectedItem()].handleClick();
      }
    }
  }

  onMouseOver(){
    if (this.selectedItem() === null) return;
    this.selectedItem.set(null);
  }

  /** @ignore */
  translateY = computed(()=>{
    const rect = this.menuContent()?.nativeElement.getBoundingClientRect()
    if (window.innerHeight - this.position().bottom > rect.height) return ''
    return `translateY(calc(-100% - ${ this.positionY() ? 0 : this.position().height}px))`
  })

  /** @ignore */
  computedClasses = computed(() => cn(
    'min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
    'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    'dropdown-position',
    this.class(),
  ));
  
}

import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, computed, contentChildren, effect, ElementRef, inject, input, signal, Signal, viewChild } from "@angular/core";

// import { cn } from '@ng-shadcn/utils';
import { cn, PortalHostDirective } from '@packages/utils/src/public-api';
import { DropdownMenuItemComponent } from "./dropdown-menu-item.component";
import { DropdownMenuSeparatorComponent } from "./dropdown-menu-separator.component";
import { DropdownMenuLabelComponent } from "./dropdown-menu-label.component";

@Component({
  selector: 'ng-shadcn-dropdown-menu-content',
  standalone: true,
  imports: [CommonModule, PortalHostDirective],
  template: `
    <div
      #menuContent  
      [class]="computedClasses()"
      [attr.data-state]="isOpen ? 'open' : 'closed'"
      role="menu"
      [attr.aria-orientation]="'vertical'"
      [style.display]="isOpen() ? 'block' : 'none'"
      [style.position]="'absolute'"
      [style.z-index]="50"
      [style.min-width.px]="minWidth()"
      [style.top.px]="position().top ? position().top : undefined"
      [style.transform]="translateY()"
      [style.left.px]="position().left"
      portalHost
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class DropdownMenuContentComponent {
  class = input<string>('');
  
  minWidth = input<number>(220);
  isOpen: Signal<boolean> = signal(false);
  id: Signal<string> = signal('');
  position = signal({ top: 0, left: 0, height: 0, bottom: 0 });

  menuContent = viewChild<ElementRef<HTMLDivElement>>('menuContent');

  
  translateY = computed(()=>{
    const rect = this.menuContent()?.nativeElement.getBoundingClientRect()
    
    console.log(window.innerHeight - this.position().bottom)
    console.log(rect.height)
    if (window.innerHeight - this.position().bottom > rect.height) return ''
    return `translateY(calc(-100% - ${this.position().height}px))`
  })
  

  /** @ignore */
  computedClasses = computed(() => cn(
    'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
    'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    this.class(),
  ));

  
}

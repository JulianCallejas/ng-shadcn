import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  DropdownMenuComponent, 
  DropdownMenuTriggerComponent, 
  DropdownMenuContentComponent,
  DropdownMenuItemComponent,
  DropdownMenuLabelComponent,
  DropdownMenuSeparatorComponent
} from '@packages/dropdown-menu/src/public-api';
import { ButtonComponent } from '@packages/button/src/public-api';

@Component({
  selector: 'app-dropdown-menu-example',
  standalone: true,
  imports: [
    CommonModule,
    DropdownMenuComponent,
    DropdownMenuTriggerComponent,
    DropdownMenuContentComponent,
    DropdownMenuItemComponent,
    DropdownMenuLabelComponent,
    DropdownMenuSeparatorComponent,
    ButtonComponent
  ],
  template: `
    <div class="space-y-4">
      <h2 class="text-2xl font-bold text-foreground mb-4">Dropdown Menu</h2>
      
      <div class="p-6 border rounded-lg bg-card">
        <div class="space-y-4">
          <p class="text-muted-foreground">
            Dropdown menus display a list of actions or options to the user.
          </p>
          
          <div class="flex flex-wrap gap-4">
            <!-- Basic Dropdown -->
            <ng-shadcn-dropdown-menu [open]="isOpen()">
              <ng-shadcn-dropdown-menu-trigger (openChange)="isOpen.set($event)">
                <button class="px-4 py-2 border rounded-md hover:bg-accent transition-colors">
                  Options
                </button>
              </ng-shadcn-dropdown-menu-trigger>
              
              <ng-shadcn-dropdown-menu-content>
                <ng-shadcn-dropdown-menu-item 
                  *ngFor="let item of menuItems" 
                  [label]="item.label" 
                  [icon]="item.icon" 
                  [disabled]="item.disabled"
                  [shortcut]="item.shortcut"
                  (click)="onItemClick(item)">
                </ng-shadcn-dropdown-menu-item>
              </ng-shadcn-dropdown-menu-content>
            </ng-shadcn-dropdown-menu>
            
            <!-- With Labels and Separators -->
            <ng-shadcn-dropdown-menu [open]="isOpen2()">
              <ng-shadcn-dropdown-menu-trigger  (openChange)="isOpen2.set($event)">
                <button class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                  Actions
                </button>
              </ng-shadcn-dropdown-menu-trigger>
              
              <ng-shadcn-dropdown-menu-content>
                <ng-shadcn-dropdown-menu-label>File</ng-shadcn-dropdown-menu-label>
                <ng-shadcn-dropdown-menu-item 
                  *ngFor="let item of fileItems" 
                  [label]="item.label" 
                  [icon]="item.icon"
                  [shortcut]="item.shortcut"
                  (click)="onItemClick(item)">
                </ng-shadcn-dropdown-menu-item>
                
                <ng-shadcn-dropdown-menu-separator></ng-shadcn-dropdown-menu-separator>
                
                <ng-shadcn-dropdown-menu-label>Edit</ng-shadcn-dropdown-menu-label>
                <ng-shadcn-dropdown-menu-item 
                  *ngFor="let item of editItems" 
                  [label]="item.label" 
                  [icon]="item.icon"
                  [shortcut]="item.shortcut"
                  [disabled]="item.disabled"
                  (click)="onItemClick(item)">
                </ng-shadcn-dropdown-menu-item>
              </ng-shadcn-dropdown-menu-content>
            </ng-shadcn-dropdown-menu>
          </div>
          
          <div class="mt-4 p-4 bg-muted/20 rounded-md">
            <p class="text-sm text-muted-foreground">
              <strong>Note:</strong> Click the buttons above to open dropdown menus. You can close them by clicking outside or pressing the escape key.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class DropdownMenuExampleComponent {
  isOpen = signal(false);
  isOpen2 = signal(false);
  
  menuItems = [
    { id: 'new', label: 'New File', icon: '📄', shortcut: '⌘N' },
    { id: 'open', label: 'Open File', icon: '📂', shortcut: '⌘O' },
    { id: 'save', label: 'Save', icon: '💾', shortcut: '⌘S' },
    { id: 'print', label: 'Print', icon: '🖨️', shortcut: '⌘P', disabled: true },
    { id: 'export', label: 'Export', icon: '📤' }
  ];
  
  fileItems = [
    { id: 'new', label: 'New File', icon: '📄', shortcut: '⌘N' },
    { id: 'open', label: 'Open File', icon: '📂', shortcut: '⌘O' },
    { id: 'save', label: 'Save', icon: '💾', shortcut: '⌘S' }
  ];
  
  editItems = [
    { id: 'undo', label: 'Undo', icon: '↩️', shortcut: '⌘Z' },
    { id: 'redo', label: 'Redo', icon: '↪️', shortcut: '⇧⌘Z', disabled: true },
    { id: 'cut', label: 'Cut', icon: '✂️', shortcut: '⌘X' },
    { id: 'copy', label: 'Copy', icon: '📋', shortcut: '⌘C' },
    { id: 'paste', label: 'Paste', icon: '📋', shortcut: '⌘V' }
  ];

  onItemClick(item: any) {
    if (item.disabled) return;
    
    console.log(`Menu item clicked: ${item.label}`);
    
    // Handle specific actions
    switch (item.id) {
      case 'new':
        // Handle new file
        break;
      case 'open':
        // Handle open file
        break;
      case 'save':
        // Handle save
        break;
      // Add more cases as needed
    }
    
    // Close the dropdown
    this.isOpen.set(false);
    this.isOpen2.set(false);
  }
}

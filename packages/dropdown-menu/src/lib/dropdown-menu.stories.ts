import { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Component, signal } from '@angular/core';
import { 
  DropdownMenuComponent, 
  DropdownMenuTriggerComponent, 
  DropdownMenuContentComponent,
  DropdownMenuItemComponent,
  DropdownMenuSeparatorComponent,
  DropdownMenuLabelComponent
} from './index';
import { ButtonComponent } from '@packages/button/src/public-api';
import { CommonModule } from '@angular/common';


interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
}

interface NotificationItem {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

@Component({
  selector: "with-disabled-items-example",
  standalone: true,
  imports: [
    CommonModule,
    DropdownMenuComponent,
    DropdownMenuTriggerComponent,
    DropdownMenuContentComponent,
    DropdownMenuItemComponent,
    DropdownMenuSeparatorComponent,
    ButtonComponent
  ],
  template: `
    <div class="flex flex-col gap-4 p-4">
          <div class="flex gap-4 mb-4">
            <ng-shadcn-button 
              (click)="toggleUnsavedChanges()" 
            >
              {{ hasUnsavedChanges() ? 'Has Changes' : 'No Changes' }}
            </ng-shadcn-button>
            <ng-shadcn-button 
              (click)="toggleCanPrint()" 
              >
              {{ canPrint() ? 'Can Print' : 'Cannot Print' }}
            </ng-shadcn-button>
          </div>
          <ng-shadcn-dropdown-menu class="mx-auto">
            <ng-shadcn-dropdown-menu-trigger asChild>
              <ng-shadcn-button variant="outline" class="w-full">
                File Menu
              </ng-shadcn-button>
            </ng-shadcn-dropdown-menu-trigger>
            
            <ng-shadcn-dropdown-menu-content class="w-56">
              <ng-shadcn-dropdown-menu-item 
                label="New File" 
                shortcut="⌘N" 
                (itemSelected)="newFile()">
              </ng-shadcn-dropdown-menu-item>
              
              <ng-shadcn-dropdown-menu-item 
                label="Open File" 
                shortcut="⌘O" 
                (itemSelected)="openFile()">
              </ng-shadcn-dropdown-menu-item>
              
              <ng-shadcn-dropdown-menu-separator></ng-shadcn-dropdown-menu-separator>
              
              <ng-shadcn-dropdown-menu-item 
                label="Save" 
                shortcut="⌘S" 
                [disabled]="!hasUnsavedChanges()" 
                (itemSelected)="save()">
              </ng-shadcn-dropdown-menu-item>
              
              <ng-shadcn-dropdown-menu-item 
                label="Save As..." 
                shortcut="⌘⇧S" 
                (itemSelected)="saveAs()">
              </ng-shadcn-dropdown-menu-item>
              
              <ng-shadcn-dropdown-menu-separator></ng-shadcn-dropdown-menu-separator>
              
              <ng-shadcn-dropdown-menu-item 
                label="Print" 
                shortcut="⌘P" 
                [disabled]="!canPrint()" 
                (itemSelected)="print()">
              </ng-shadcn-dropdown-menu-item>
            </ng-shadcn-dropdown-menu-content>
          </ng-shadcn-dropdown-menu>
        </div>
  `
})
export class WithDisabledItemsExampleComponent {
  hasUnsavedChanges = signal(false);
  canPrint = signal(false);
  
  handleOpenChange(open: boolean) {
    console.log('Dropdown menu open state changed:', open);
  }

  newFile = () => console.log('Creating new file...');
  openFile = () => console.log('Opening file...');
  save = () => console.log('Saving file...');
  saveAs = () => console.log('Save as...');
  print = () => console.log('Printing...');
  toggleUnsavedChanges = () => this.hasUnsavedChanges.update(v => !v);
  toggleCanPrint = () => this.canPrint.update(v => !v);
}

@Component({
  selector: "with-icons-shortcuts-example",
  standalone: true,
  imports: [
    CommonModule,
    DropdownMenuComponent,
    DropdownMenuTriggerComponent,
    DropdownMenuContentComponent,
    DropdownMenuItemComponent,
    DropdownMenuSeparatorComponent,
  ],
  template: `
      <ng-shadcn-dropdown-menu [open]="state().isOpen" (click)="calculatePosition($event)" (openChange)="handleOpenChange($event)" (contextmenu)="handleContextMenu($event); $event.stopPropagation()">
        <ng-shadcn-dropdown-menu-trigger asChild>
        <div class="p-8 border-2 border-dashed border-muted-foreground/25 rounded-lg text-center" >
          <p class="text-muted-foreground mb-4">Right-click anywhere in this area to show the context menu</p>
              <div class="inline-flex flex-col items-center justify-center w-full h-48 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors">
                <svg class="h-12 w-12 text-muted-foreground mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <p class="text-sm text-muted-foreground">Right-click here or anywhere in the container</p>
              </div>
              </div>
            </ng-shadcn-dropdown-menu-trigger>
            <ng-shadcn-dropdown-menu-content 
              [positionY]="state().position.y"
              [positionX]="state().position.x"
              style="position: absolute; top: 0; left: 0;"
            >
              <ng-shadcn-dropdown-menu-item 
                label="Cut" 
                shortcut="⌘X"
                icon="<svg class='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v3a3 3 0 003 3z'/></svg>"
                (itemSelected)="actions.cut()">
              </ng-shadcn-dropdown-menu-item>
              <ng-shadcn-dropdown-menu-item 
                label="Copy" 
                shortcut="⌘C"
                icon="<svg class='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'/></svg>"
                (itemSelected)="actions.copy()">
              </ng-shadcn-dropdown-menu-item>
              <ng-shadcn-dropdown-menu-item 
                label="Paste" 
                shortcut="⌘V"
                icon="<svg class='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'/></svg>"
                (itemSelected)="actions.paste()">
              </ng-shadcn-dropdown-menu-item>
              <ng-shadcn-dropdown-menu-separator></ng-shadcn-dropdown-menu-separator>
              <ng-shadcn-dropdown-menu-item 
                label="Rename" 
                shortcut="F2"
                icon="<svg class='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'/></svg>"
                (itemSelected)="actions.rename()">
              </ng-shadcn-dropdown-menu-item>
              <ng-shadcn-dropdown-menu-item 
                label="Delete" 
                shortcut="Del"
                icon="<svg class='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'/></svg>"
                (itemSelected)="actions.delete()">
              </ng-shadcn-dropdown-menu-item>
              <ng-shadcn-dropdown-menu-separator></ng-shadcn-dropdown-menu-separator>
              <ng-shadcn-dropdown-menu-item 
                label="Properties" 
                shortcut="⌘I"
                icon="<svg class='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'/></svg>"
                (itemSelected)="actions.properties()">
              </ng-shadcn-dropdown-menu-item>
            </ng-shadcn-dropdown-menu-content>
          </ng-shadcn-dropdown-menu>
  `
})
export class WithIconsShortcutsExampleComponent {

  state = signal({
            isOpen: false,
            position: { x: 0, y: 0 }
          });

      
  calculatePosition = (event: MouseEvent) => {
    const scrollX = window.scrollX || document.documentElement.scrollLeft;
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    const x = event.clientX;
    const y = event.clientY;
    
    this.state.update((prevState) => ({
      ...prevState,
      position: { 
        x: x + scrollX,
        y: y + scrollY
      }
    }));
  }
    
  handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    this.calculatePosition(event);
    this.state.update((state) => ({ ...state, isOpen: true }));
  };

  handleOpenChange = (open: boolean) => {
    this.state.update((prevState) => ({ ...prevState, isOpen: open }));
  };

  actions = {
    cut: () => console.log('Cut'),
    copy: () => console.log('Copy'),
    paste: () => console.log('Paste'),
    rename: () => console.log('Rename'),
    delete: () => console.log('Delete'),
    properties: () => console.log('Properties')
  };
}

const meta: Meta<DropdownMenuComponent> = {
  title: 'Components/Dropdown Menu',
  component: DropdownMenuComponent,
  decorators: [
    moduleMetadata({
      imports: [
        DropdownMenuComponent,
        DropdownMenuTriggerComponent,
        DropdownMenuContentComponent,
        DropdownMenuItemComponent,
        DropdownMenuSeparatorComponent,
        DropdownMenuLabelComponent,
        ButtonComponent,
        WithDisabledItemsExampleComponent,
        WithIconsShortcutsExampleComponent,
        CommonModule,
        
      ],
    }),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A dropdown menu that displays a list of actions or options when triggered by a button or other control. Built with Angular signals for modern, reactive UI development.

## Installation

\`\`\`bash
# Using npm
npm install @ng-shadcn/dropdown-menu
# Using yarn
yarn add @ng-shadcn/dropdown-menu
# Using pnpm
pnpm add @ng-shadcn/dropdown-menu
\`\`\`

## Usage
### Standalone Components (Recommended)
Import and use the component directly in your standalone components:

\`\`\`typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  DropdownMenuComponent, 
  DropdownMenuTriggerComponent,
  DropdownMenuContentComponent,
  DropdownMenuItemComponent,
  DropdownMenuLabelComponent,
  DropdownMenuSeparatorComponent
} from '@ng-shadcn/dropdown-menu';
import { ButtonComponent } from '@ng-shadcn/button';

@Component({
  selector: 'app-example',
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
  template: \`
    <div class="space-y-4">
      <h3 class="font-medium mb-2">Basic Dropdown Menu</h3>
      
      <ng-shadcn-dropdown-menu [(open)]="isOpen">
        <ng-shadcn-dropdown-menu-trigger>
          <ng-shadcn-button>Open Menu</ng-shadcn-button>
        </ng-shadcn-dropdown-menu-trigger>
        
        <ng-shadcn-dropdown-menu-content>
          <ng-shadcn-dropdown-menu-item (itemSelected)="onSelect('Profile')">
            Profile
          </ng-shadcn-dropdown-menu-item>
          <ng-shadcn-dropdown-menu-item (itemSelected)="onSelect('Settings')">
            Settings
          </ng-shadcn-dropdown-menu-item>
          <ng-shadcn-dropdown-menu-separator></ng-shadcn-dropdown-menu-separator>
          <ng-shadcn-dropdown-menu-item (itemSelected)="onSelect('Logout')" class="text-red-600">
            Logout
          </ng-shadcn-dropdown-menu-item>
        </ng-shadcn-dropdown-menu-content>
      </ng-shadcn-dropdown-menu>
    </div>
  \`
})
export class ExampleComponent {
  isOpen = false;
  
  onSelect(item: string) {
    console.log('Selected:', item);
    this.isOpen = false;
  }
}
\`\`\`

### Using NgModule (Legacy)
If you're using NgModules, import the \`DropdownMenuModule\`:

\`\`\`typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownMenuModule } from '@ng-shadcn/dropdown-menu';
import { ButtonComponent } from '@ng-shadcn/button';

@NgModule({
  declarations: [YourComponent],
  imports: [
    CommonModule,
    DropdownMenuModule,
  ]
})
export class YourModule { }
\`\`\`

## Features
- **Accessible**: Follows WAI-ARIA menu pattern
- **Keyboard Navigation**: Full keyboard navigation support
- **Animated**: Smooth enter/exit animations
- **Customizable**: Supports custom content and styling
- **Responsive**: Adapts to different screen sizes
- **Controlled/Uncontrolled**: Can be controlled or uncontrolled
- **Icons & Shortcuts**: Built-in support for icons and keyboard shortcuts
- **Disabled Items**: Support for disabled menu items
- **TypeScript Support**: Fully typed API
- **Reactive**: Built with Angular signals for optimal performance
- **Submenus**: Support for nested dropdown menus (comming soon)
`
      }
    }
  },
  tags: ['autodocs', 'menu', 'dropdown', 'ui'],
  argTypes: {
    class: {
      control: 'text',
      description: 'Additional CSS classes to apply to the dropdown menu container',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    open: {
      control: 'boolean',
      description: 'Whether the dropdown is open (controlled)',
      table: {
        type: { summary: 'boolean' },
      },
    },
    id: {
      control: 'text',
      description: 'A unique identifier for the dropdown menu. Used for accessibility and associating the trigger with the content.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'randomly generated' },
      },
    },
    openChange: {
      action: 'openChange',
      description: 'Event emitted when the dropdown open state changes',
      table: {
        type: { summary: 'EventEmitter<boolean>' },
      },
    },
  },
  args: {
    class: '',
    open: false,
  },
  subcomponents: {
    DropdownMenuTriggerComponent,
    DropdownMenuContentComponent,
    DropdownMenuItemComponent,
    DropdownMenuLabelComponent,
    DropdownMenuSeparatorComponent
  },
};

export default meta;
type Story = StoryObj<DropdownMenuComponent>;

export const Default: Story = {
  render: (args) => {
    const isOpen = signal(false);
    
    return {
      props: {
        ...args,
        isOpen,
        menuItems: [
          { id: 'new', label: 'New File', icon: '📄', shortcut: '⌘N' },
          { id: 'open', label: 'Open File', icon: '📂', shortcut: '⌘O' },
          { id: 'save', label: 'Save', icon: '💾', shortcut: '⌘S' },
          { id: 'print', label: 'Print', icon: '🖨️', shortcut: '⌘P', disabled: true },
          { id: 'export', label: 'Export', icon: '📤' }
        ],
        onItemClick: (item: any) => {
          if (item.disabled) return;
          console.log(`Menu item clicked: ${item.label}`);
          isOpen.set(false);
        }
      },
      template: `
        <ng-shadcn-dropdown-menu [open]="isOpen()" [class]="class">
          <ng-shadcn-dropdown-menu-trigger (openChange)="isOpen.set($event)">
              <span>Options</span>
          </ng-shadcn-dropdown-menu-trigger>
          <ng-shadcn-dropdown-menu-content>
            <ng-container *ngFor="let item of menuItems">
              <ng-shadcn-dropdown-menu-item 
                [label]="item.label" 
                [icon]="item.icon"
                [disabled]="item.disabled"
                [shortcut]="item.shortcut"
                (itemSelected)="onItemClick(item)">
              </ng-shadcn-dropdown-menu-item>
            </ng-container>
          </ng-shadcn-dropdown-menu-content>
        </ng-shadcn-dropdown-menu>
      `,
    };
  },
  parameters: {
    docs: {
      description: {
        story: 'A basic dropdown menu with various options and disabled states.',
      },
    },
  },
};

export const WithLabelsAndSections: Story = {
  render: (args) => {
    const isOpen = signal(false);
    const fileItems: MenuItem[] = [
      { id: 'new', label: 'New File', icon: '📄', shortcut: '⌘N' },
      { id: 'open', label: 'Open File', icon: '📂', shortcut: '⌘O' },
      { id: 'save', label: 'Save', icon: '💾', shortcut: '⌘S' }
    ];
    
    const editItems: MenuItem[] = [
      { id: 'undo', label: 'Undo', icon: '↩️', shortcut: '⌘Z' },
      { id: 'redo', label: 'Redo', icon: '↪️', shortcut: '⇧⌘Z', disabled: true },
      { id: 'cut', label: 'Cut', icon: '✂️', shortcut: '⌘X' },
      { id: 'copy', label: 'Copy', icon: '📋', shortcut: '⌘C' },
      { id: 'paste', label: 'Paste', icon: '📋', shortcut: '⌘V' }
    ];

    const onItemClick = (item: MenuItem) => {
      if (item.disabled) return;
      console.log(`Menu item clicked: ${item.label}`);
      isOpen.set(false);
    };
    
    return {
      props: {
        ...args,
        isOpen,
        fileItems,
        editItems,
        onItemClick
      },
      template: `
        <ng-shadcn-dropdown-menu [open]="isOpen()">
          <ng-shadcn-dropdown-menu-trigger (openChange)="isOpen.set($event)" asChild>
            <ng-shadcn-button variant="outline">
              <span>Actions</span>
              <svg [class]="'ml-2 h-4 w-4 transition-all transform ' + (isOpen() ? 'rotate-180' : '')" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </ng-shadcn-button>
          </ng-shadcn-dropdown-menu-trigger>
          
          <ng-shadcn-dropdown-menu-content>
            <ng-shadcn-dropdown-menu-label>File</ng-shadcn-dropdown-menu-label>
            <ng-container *ngFor="let item of fileItems">
              <ng-shadcn-dropdown-menu-item 
                [label]="item.label" 
                [icon]="item.icon"
                [shortcut]="item.shortcut"
                [disabled]="item.disabled"
                (click)="onItemClick(item)">
              </ng-shadcn-dropdown-menu-item>
            </ng-container>
            
            <ng-shadcn-dropdown-menu-separator></ng-shadcn-dropdown-menu-separator>
            
            <ng-shadcn-dropdown-menu-label>Edit</ng-shadcn-dropdown-menu-label>
            <ng-container *ngFor="let item of editItems">
              <ng-shadcn-dropdown-menu-item 
                [label]="item.label" 
                [icon]="item.icon"
                [shortcut]="item.shortcut"
                [disabled]="item.disabled"
                (click)="onItemClick(item)">
              </ng-shadcn-dropdown-menu-item>
            </ng-container>
          </ng-shadcn-dropdown-menu-content>
        </ng-shadcn-dropdown-menu>
      `,
    };
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown menu with labeled sections and separators for better organization.',
      },
    },
  },
};

export const CustomContent: Story = {
  render: (args) => {
    const isOpen = signal(false);
    const notifications = signal<NotificationItem[]>([
      { id: 1, title: 'New message', description: 'You have a new message from John', time: '2m ago', read: false },
      { id: 2, title: 'Update available', description: 'A new version is available', time: '1h ago', read: true },
      { id: 3, title: 'Reminder', description: 'Meeting with the team at 3 PM', time: 'Yesterday', read: true },
    ]);

    const unreadCount = () => notifications().filter(n => !n.read).length;
    
    const markAsRead = (id: number) => {
      console.log(`Marking notification ${id} as read`);
      notifications.update(current => 
        current.map(n => n.id === id ? { ...n, read: true } : n)
      );
      isOpen.set(false);
    };
    
    const markAllAsRead = () => {
      console.log('Marking all notifications as read');
      notifications.update(current => 
        current.map(n => ({ ...n, read: true }))
      );
      isOpen.set(false);
    };
    
    return {
      props: {
        ...args,
        isOpen,
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead
      },
      template: `
<ng-shadcn-dropdown-menu [open]="isOpen()">
  <ng-shadcn-dropdown-menu-trigger (openChange)="isOpen.set($event)">
    <div class="relative">
      <ng-shadcn-button variant="ghost" size="icon">
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
        </svg>
        <span 
          *ngIf="unreadCount() > 0"
          class="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center"
        >
          {{ unreadCount() }}
        </span>
      </ng-shadcn-button>
    </div>
  </ng-shadcn-dropdown-menu-trigger>
  
  <ng-shadcn-dropdown-menu-content class="w-80 p-0">
    <div class="p-4 border-b">
      <div class="flex items-center justify-between">
        <h3 class="font-medium">Notifications</h3>
        <button 
          (click)="markAllAsRead()"
          class="text-xs text-primary hover:underline"
        >
          Mark all as read
        </button>
      </div>
    </div>
    
    <div class="max-h-80 overflow-y-auto">
      <div *ngFor="let item of notifications()" 
            class="p-4 border-b hover:bg-accent hover:bg-opacity-50 transition-colors cursor-pointer"
            [class.bg-accent]="!item.read" [class.bg-opacity-20]="!item.read"
            (click)="markAsRead(item.id)" >
        <div class="flex items-start">
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <h4 class="text-sm font-medium">{{ item.title }}</h4>
              <span class="text-xs text-muted-foreground">{{ item.time }}</span>
            </div>
            <p class="text-sm text-muted-foreground mt-1">{{ item.description }}</p>
          </div>
          <div *ngIf="!item.read" class="ml-2 h-2 w-2 rounded-full bg-primary">
          </div>
        </div>
      </div>
      
      <div *ngIf="notifications().length === 0" class="p-4 text-center text-sm text-muted-foreground">
        No new notifications
      </div>
    </div>
    
    <div class="p-2 border-t text-center">
      <button class="text-xs text-primary hover:underline">
        View all notifications
      </button>
    </div>
  </ng-shadcn-dropdown-menu-content>
</ng-shadcn-dropdown-menu>
      `,
    };
  },
  parameters: {
    docs: {
      description: {
        story: 'A custom dropdown menu with a notification panel, showcasing how to build custom dropdown content.',
      },
    },
  },
};



export const WithDisabledItems: Story = {
  render: () => ({
    template: `<with-disabled-items-example></with-disabled-items-example>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'A dropdown menu with disabled items that can be toggled to demonstrate dynamic states.'
      },
      source:{
        type: "code",
        language: "typescript",
        code: `
@Component({
  selector: "with-disabled-items-example",
  standalone: true,
  imports: [
    CommonModule,
    DropdownMenuComponent,
    DropdownMenuTriggerComponent,
    DropdownMenuContentComponent,
    DropdownMenuItemComponent,
    DropdownMenuSeparatorComponent,
    ButtonComponent
  ],
  template: \`
    <div class="flex flex-col gap-4 p-4">
          <div class="flex gap-4 mb-4">
            <ng-shadcn-button 
              (click)="toggleUnsavedChanges()" 
            >
              {{ hasUnsavedChanges() ? 'Has Changes' : 'No Changes' }}
            </ng-shadcn-button>
            <ng-shadcn-button 
              (click)="toggleCanPrint()" 
              >
              {{ canPrint() ? 'Can Print' : 'Cannot Print' }}
            </ng-shadcn-button>
          </div>
          <ng-shadcn-dropdown-menu >
            <ng-shadcn-dropdown-menu-trigger asChild>
              <ng-shadcn-button variant="outline">
                File Menu
                <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </ng-shadcn-button>
            </ng-shadcn-dropdown-menu-trigger>
            
            <ng-shadcn-dropdown-menu-content class="w-56">
              <ng-shadcn-dropdown-menu-item 
                label="New File" 
                shortcut="⌘N" 
                (itemSelected)="newFile()">
              </ng-shadcn-dropdown-menu-item>
              
              <ng-shadcn-dropdown-menu-item 
                label="Open File" 
                shortcut="⌘O" 
                (itemSelected)="openFile()">
              </ng-shadcn-dropdown-menu-item>
              
              <ng-shadcn-dropdown-menu-separator></ng-shadcn-dropdown-menu-separator>
              
              <ng-shadcn-dropdown-menu-item 
                label="Save" 
                shortcut="⌘S" 
                [disabled]="!hasUnsavedChanges()" 
                (itemSelected)="save()">
              </ng-shadcn-dropdown-menu-item>
              
              <ng-shadcn-dropdown-menu-item 
                label="Save As..." 
                shortcut="⌘⇧S" 
                (itemSelected)="saveAs()">
              </ng-shadcn-dropdown-menu-item>
              
              <ng-shadcn-dropdown-menu-separator></ng-shadcn-dropdown-menu-separator>
              
              <ng-shadcn-dropdown-menu-item 
                label="Print" 
                shortcut="⌘P" 
                [disabled]="!canPrint()" 
                (itemSelected)="print()">
              </ng-shadcn-dropdown-menu-item>
            </ng-shadcn-dropdown-menu-content>
          </ng-shadcn-dropdown-menu>
        </div>
  \`
})
export class WithDisabledItemsExampleComponent {
  
  hasUnsavedChanges = signal(false);
  canPrint = signal(false);

  handleOpenChange(open: boolean) {
    console.log('Dropdown menu open state changed:', open);
  }

  newFile = () => console.log('Creating new file...');
  openFile = () => console.log('Opening file...');
  save = () => console.log('Saving file...');
  saveAs = () => console.log('Save as...');
  print = () => console.log('Printing...');
  toggleUnsavedChanges = () => this.hasUnsavedChanges.update(v => !v);
  toggleCanPrint = () => this.canPrint.update(v => !v);

}
            `,
  
      }
    }
  }
};

interface ContextMenuState {
  isOpen: boolean;
  position: { x: number; y: number };
}

// ... (previous code remains the same)

export const WithIconsAndShortcuts: Story = {
  render: () => {
    return {
      props: {},
      template: `
      <with-icons-shortcuts-example></with-icons-shortcuts-example>
      `
    };
  },
  parameters: {
    docs: {
      description: {
        story: 'Context menu example with file operations and keyboard shortcuts.',
      },
      source:{
        type: "code",
        language: "typescript",
        code: `
@Component({
  selector: "with-icons-shortcuts-example",
  standalone: true,
  imports: [
    CommonModule,
    DropdownMenuComponent,
    DropdownMenuTriggerComponent,
    DropdownMenuContentComponent,
    DropdownMenuItemComponent,
    DropdownMenuSeparatorComponent,
  ],
  template: \`
      <ng-shadcn-dropdown-menu [open]="state().isOpen" (click)="calculatePosition($event)" (openChange)="handleOpenChange($event)" (contextmenu)="handleContextMenu($event); $event.stopPropagation()">
        <ng-shadcn-dropdown-menu-trigger asChild>
        <div class="p-8 border-2 border-dashed border-muted-foreground/25 rounded-lg text-center" >
          <p class="text-muted-foreground mb-4">Right-click anywhere in this area to show the context menu</p>
              <div class="inline-flex flex-col items-center justify-center w-full h-48 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors">
                <svg class="h-12 w-12 text-muted-foreground mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <p class="text-sm text-muted-foreground">Right-click here or anywhere in the container</p>
              </div>
              </div>
            </ng-shadcn-dropdown-menu-trigger>
            <ng-shadcn-dropdown-menu-content 
              [positionY]="state().position.y"
              [positionX]="state().position.x"
              style="position: absolute; top: 0; left: 0;"
            >
              <ng-shadcn-dropdown-menu-item 
                label="Cut" 
                shortcut="⌘X"
                icon="<svg class='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v3a3 3 0 003 3z'/></svg>"
                (itemSelected)="actions.cut()">
              </ng-shadcn-dropdown-menu-item>
              <ng-shadcn-dropdown-menu-item 
                label="Copy" 
                shortcut="⌘C"
                icon="<svg class='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'/></svg>"
                (itemSelected)="actions.copy()">
              </ng-shadcn-dropdown-menu-item>
              <ng-shadcn-dropdown-menu-item 
                label="Paste" 
                shortcut="⌘V"
                icon="<svg class='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'/></svg>"
                (itemSelected)="actions.paste()">
              </ng-shadcn-dropdown-menu-item>
              <ng-shadcn-dropdown-menu-separator></ng-shadcn-dropdown-menu-separator>
              <ng-shadcn-dropdown-menu-item 
                label="Rename" 
                shortcut="F2"
                icon="<svg class='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'/></svg>"
                (itemSelected)="actions.rename()">
              </ng-shadcn-dropdown-menu-item>
              <ng-shadcn-dropdown-menu-item 
                label="Delete" 
                shortcut="Del"
                icon="<svg class='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'/></svg>"
                (itemSelected)="actions.delete()">
              </ng-shadcn-dropdown-menu-item>
              <ng-shadcn-dropdown-menu-separator></ng-shadcn-dropdown-menu-separator>
              <ng-shadcn-dropdown-menu-item 
                label="Properties" 
                shortcut="⌘I"
                icon="<svg class='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'/></svg>"
                (itemSelected)="actions.properties()">
              </ng-shadcn-dropdown-menu-item>
            </ng-shadcn-dropdown-menu-content>
          </ng-shadcn-dropdown-menu>
  \`
})
export class WithIconsShortcutsExampleComponent {

  state = signal({
            isOpen: false,
            position: { x: 0, y: 0 }
          });

      
  calculatePosition = (event: MouseEvent) => {
    const scrollX = window.scrollX || document.documentElement.scrollLeft;
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    const x = event.clientX;
    const y = event.clientY;
    
    this.state.update((prevState) => ({
      ...prevState,
      position: { 
        x: x + scrollX,
        y: y + scrollY
      }
    }));
  }
    
  handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    this.calculatePosition(event);
    this.state.update((state) => ({ ...state, isOpen: true }));
  };

  handleOpenChange = (open: boolean) => {
    this.state.update((prevState) => ({ ...prevState, isOpen: open }));
  };

  actions = {
    cut: () => console.log('Cut'),
    copy: () => console.log('Copy'),
    paste: () => console.log('Paste'),
    rename: () => console.log('Rename'),
    delete: () => console.log('Delete'),
    properties: () => console.log('Properties')
  };
}
            `,
  
      }
    },
  },
};
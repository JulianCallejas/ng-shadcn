import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { 
  DropdownMenuComponent, 
  DropdownMenuTriggerComponent, 
  DropdownMenuContentComponent,
  DropdownMenuItemComponent,
  DropdownMenuSeparatorComponent,
  DropdownMenuLabelComponent
} from './index';

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
        DropdownMenuLabelComponent
      ],
    }),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Displays a menu to the user—such as a set of actions or functions—triggered by a button. Built with Angular signals for modern, reactive UI development.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    class: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    open: {
      control: 'boolean',
      description: 'Whether the dropdown is open (controlled)',
    },
    openChange: {
      action: 'openChange',
      description: 'Event emitted when the dropdown open state changes',
    },
  },
  args: {
    class: '',
    open: false,
  },
};

export default meta;
type Story = StoryObj<DropdownMenuComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      openProfile: () => console.log('Opening profile...'),
      openSettings: () => console.log('Opening settings...'),
      logout: () => console.log('Logging out...'),
    },
    template: `
      <ng-shadcn-dropdown-menu [className]="className" [open]="open" (openChange)="openChange($event)">
        <ng-shadcn-dropdown-menu-trigger>
          <button class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Open Menu
            <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
        </ng-shadcn-dropdown-menu-trigger>
        <ng-shadcn-dropdown-menu-content>
          <ng-shadcn-dropdown-menu-item label="Profile" (itemSelected)="openProfile()"></ng-shadcn-dropdown-menu-item>
          <ng-shadcn-dropdown-menu-item label="Settings" (itemSelected)="openSettings()"></ng-shadcn-dropdown-menu-item>
          <ng-shadcn-dropdown-menu-separator></ng-shadcn-dropdown-menu-separator>
          <ng-shadcn-dropdown-menu-item label="Logout" (itemSelected)="logout()"></ng-shadcn-dropdown-menu-item>
        </ng-shadcn-dropdown-menu-content>
      </ng-shadcn-dropdown-menu>
    `,
  }),
};

export const WithIconsAndShortcuts: Story = {
  render: () => ({
    props: {
      openProfile: () => console.log('Opening profile...'),
      openSettings: () => console.log('Opening settings...'),
      openBilling: () => console.log('Opening billing...'),
      logout: () => console.log('Logging out...'),
    },
    template: `
      <ng-shadcn-dropdown-menu>
        <ng-shadcn-dropdown-menu-trigger>
          <button class="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
            <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            My Account
          </button>
        </ng-shadcn-dropdown-menu-trigger>
        <ng-shadcn-dropdown-menu-content class="w-56">
          <ng-shadcn-dropdown-menu-label>My Account</ng-shadcn-dropdown-menu-label>
          <ng-shadcn-dropdown-menu-separator></ng-shadcn-dropdown-menu-separator>
          <ng-shadcn-dropdown-menu-item 
            label="Profile" 
            icon="<svg class='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'/></svg>" 
            shortcut="⌘P"
            (itemSelected)="openProfile()">
          </ng-shadcn-dropdown-menu-item>
          <ng-shadcn-dropdown-menu-item 
            label="Billing" 
            icon="<svg class='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'/></svg>" 
            shortcut="⌘B"
            (itemSelected)="openBilling()">
          </ng-shadcn-dropdown-menu-item>
          <ng-shadcn-dropdown-menu-item 
            label="Settings" 
            icon="<svg class='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'/><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'/></svg>" 
            shortcut="⌘S"
            (itemSelected)="openSettings()">
          </ng-shadcn-dropdown-menu-item>
          <ng-shadcn-dropdown-menu-separator></ng-shadcn-dropdown-menu-separator>
          <ng-shadcn-dropdown-menu-item 
            label="Log out" 
            shortcut="⌘Q"
            (itemSelected)="logout()">
          </ng-shadcn-dropdown-menu-item>
        </ng-shadcn-dropdown-menu-content>
      </ng-shadcn-dropdown-menu>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Dropdown menu with icons and keyboard shortcuts for enhanced UX.',
      },
    },
  },
};

export const WithDisabledItems: Story = {
  render: () => ({
    props: {
      newFile: () => console.log('Creating new file...'),
      openFile: () => console.log('Opening file...'),
      save: () => console.log('Saving file...'),
      saveAs: () => console.log('Save as...'),
      print: () => console.log('Printing...'),
      hasUnsavedChanges: false,
      canPrint: false,
    },
    template: `
      <ng-shadcn-dropdown-menu>
        <ng-shadcn-dropdown-menu-trigger>
          <button class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            File Menu
          </button>
        </ng-shadcn-dropdown-menu-trigger>
        <ng-shadcn-dropdown-menu-content class="w-48">
          <ng-shadcn-dropdown-menu-item label="New File" shortcut="⌘N" (itemSelected)="newFile()"></ng-shadcn-dropdown-menu-item>
          <ng-shadcn-dropdown-menu-item label="Open File" shortcut="⌘O" (itemSelected)="openFile()"></ng-shadcn-dropdown-menu-item>
          <ng-shadcn-dropdown-menu-separator></ng-shadcn-dropdown-menu-separator>
          <ng-shadcn-dropdown-menu-item 
            label="Save" 
            shortcut="⌘S" 
            [disabled]="!hasUnsavedChanges" 
            (itemSelected)="save()">
          </ng-shadcn-dropdown-menu-item>
          <ng-shadcn-dropdown-menu-item label="Save As..." shortcut="⌘⇧S" (itemSelected)="saveAs()"></ng-shadcn-dropdown-menu-item>
          <ng-shadcn-dropdown-menu-separator></ng-shadcn-dropdown-menu-separator>
          <ng-shadcn-dropdown-menu-item 
            label="Print" 
            shortcut="⌘P" 
            [disabled]="!canPrint" 
            (itemSelected)="print()">
          </ng-shadcn-dropdown-menu-item>
        </ng-shadcn-dropdown-menu-content>
      </ng-shadcn-dropdown-menu>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Example showing disabled menu items based on application state.',
      },
    },
  },
};

export const ContextMenu: Story = {
  render: () => ({
    props: {
      cut: () => console.log('Cut'),
      copy: () => console.log('Copy'),
      paste: () => console.log('Paste'),
      delete: () => console.log('Delete'),
      rename: () => console.log('Rename'),
      properties: () => console.log('Properties'),
    },
    template: `
      <div class="p-8 border-2 border-dashed border-muted-foreground/25 rounded-lg text-center">
        <p class="text-muted-foreground mb-4">Right-click simulation with dropdown menu</p>
        <ng-shadcn-dropdown-menu>
          <ng-shadcn-dropdown-menu-trigger>
            <div class="inline-flex items-center justify-center w-32 h-32 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors">
              <svg class="h-8 w-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
          </ng-shadcn-dropdown-menu-trigger>
          <ng-shadcn-dropdown-menu-content>
            <ng-shadcn-dropdown-menu-item 
              label="Cut" 
              shortcut="⌘X"
              icon="<svg class='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v3a3 3 0 003 3z'/></svg>"
              (itemSelected)="cut()">
            </ng-shadcn-dropdown-menu-item>
            <ng-shadcn-dropdown-menu-item 
              label="Copy" 
              shortcut="⌘C"
              icon="<svg class='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'/></svg>"
              (itemSelected)="copy()">
            </ng-shadcn-dropdown-menu-item>
            <ng-shadcn-dropdown-menu-item 
              label="Paste" 
              shortcut="⌘V"
              icon="<svg class='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'/></svg>"
              (itemSelected)="paste()">
            </ng-shadcn-dropdown-menu-item>
            <ng-shadcn-dropdown-menu-separator></ng-shadcn-dropdown-menu-separator>
            <ng-shadcn-dropdown-menu-item 
              label="Rename" 
              shortcut="F2"
              icon="<svg class='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'/></svg>"
              (itemSelected)="rename()">
            </ng-shadcn-dropdown-menu-item>
            <ng-shadcn-dropdown-menu-item 
              label="Delete" 
              shortcut="Del"
              icon="<svg class='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'/></svg>"
              (itemSelected)="delete()">
            </ng-shadcn-dropdown-menu-item>
            <ng-shadcn-dropdown-menu-separator></ng-shadcn-dropdown-menu-separator>
            <ng-shadcn-dropdown-menu-item 
              label="Properties" 
              shortcut="⌘I"
              icon="<svg class='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'/></svg>"
              (itemSelected)="properties()">
            </ng-shadcn-dropdown-menu-item>
          </ng-shadcn-dropdown-menu-content>
        </ng-shadcn-dropdown-menu>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Context menu example with file operations and keyboard shortcuts.',
      },
    },
  },
};

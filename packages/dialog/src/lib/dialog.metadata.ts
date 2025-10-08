import { DialogComponent } from './dialog.component';

export const DialogMeta = {
  name: 'dialog',
  description: 'A modal dialog component with animations and accessibility support',
  component: DialogComponent,
  usage: `
    <!-- Basic dialog -->
    <ng-shadcn-dialog 
      title="Dialog Title"
      description="Dialog description"
      [isOpen]="showDialog"
      (closed)="showDialog = false"
    >
      <p>Dialog content goes here.</p>
      
      <div slot="footer" class="flex justify-end space-x-2">
        <button (click)="showDialog = false">Cancel</button>
        <button (click)="confirm()">Confirm</button>
      </div>
    </ng-shadcn-dialog>
    
    <!-- Trigger button -->
    <button (click)="showDialog = true">Open Dialog</button>
  `,
  sizes: [
    { name: 'sm', description: 'Small dialog' },
    { name: 'md', description: 'Medium dialog (default)' },
    { name: 'lg', description: 'Large dialog' },
    { name: 'xl', description: 'Extra large dialog' },
  ],
};
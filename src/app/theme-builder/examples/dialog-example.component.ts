import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '@packages/dialog/src/public-api';
import { ButtonComponent } from '@packages/button/src/public-api';

@Component({
  selector: 'app-dialog-example',
  standalone: true,
  imports: [
    CommonModule,
    DialogComponent,
    ButtonComponent
  ],
  template: `
    <div class="space-y-4">
      <h2 class="text-2xl font-bold text-foreground mb-4">Dialog</h2>
      
      <div class="p-6 border rounded-lg bg-card">
        <div class="space-y-4">
          <p class="text-muted-foreground">
            Dialogs are modal windows that appear in front of the main content. They require user interaction before continuing.
          </p>
          
          <ng-shadcn-dialog>
            <button 
              (click)="isOpen.set(true)"
              class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Open Dialog
            </button>
            
            <ng-template #dialogContent>
              <div class="space-y-4">
                <div class="space-y-2">
                  <h3 class="text-lg font-semibold">Are you sure absolutely sure?</h3>
                  <p class="text-sm text-muted-foreground">
                    This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                  </p>
                </div>
                
                <div class="py-4">
                  <p class="text-muted-foreground">
                    This is some additional content in the dialog. You can add any content here, including forms, lists, or other components.
                  </p>
                </div>
                
                <div class="flex justify-end space-x-2">
                  <button 
                    (click)="isOpen.set(false)"
                    class="px-4 py-2 border rounded-md hover:bg-accent transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    class="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors"
                    (click)="onDelete()"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </ng-template>
          </ng-shadcn-dialog>
          
          <div class="mt-4 p-4 bg-muted/20 rounded-md">
            <p class="text-sm text-muted-foreground">
              <strong>Note:</strong> Click the button above to open a dialog. You can close it by clicking outside, pressing the escape key, or using the close button.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class DialogExampleComponent {
  isOpen = signal(false);

  onDelete() {
    console.log('Account deleted');
    this.isOpen.set(false);
  }
}
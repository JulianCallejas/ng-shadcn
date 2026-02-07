import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DialogComponent,
  DialogCloseComponent,
  DialogHeaderComponent,
  DialogTitleComponent,
  DialogDescriptionComponent,
  DialogFooterComponent,
  DialogTriggerComponent,
  DialogContentComponent
} from '@packages/dialog/src/public-api';
import { ButtonComponent } from '@packages/button/src/public-api';

@Component({
  selector: 'app-dialog-example',
  standalone: true,
  imports: [
    CommonModule,
    DialogComponent,
    DialogCloseComponent,
    DialogHeaderComponent,
    DialogTitleComponent,
    DialogDescriptionComponent,
    DialogContentComponent,
    DialogFooterComponent,
    DialogTriggerComponent,
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
          <ng-shadcn-dialog [isOpen]="isOpen()" (closed)="isOpen.set(false)" size="md">
            <ng-shadcn-dialog-trigger>
              Open Dialog
            </ng-shadcn-dialog-trigger>
            <ng-shadcn-dialog-trigger asChild>
              <ng-shadcn-button (click)="isOpen.set(true)">Open Dialog</ng-shadcn-button>
            </ng-shadcn-dialog-trigger>
              <ng-shadcn-dialog-header>
                <ng-shadcn-dialog-title class="text-lg font-semibold">
                  Are you sure absolutely sure?
                </ng-shadcn-dialog-title>
                <ng-shadcn-dialog-description>
                  This will permanently delete your account and remove your data from our servers.
                </ng-shadcn-dialog-description>
                <span>More header text</span>
              </ng-shadcn-dialog-header>

              <ng-shadcn-dialog-content>
                <p>Are you sure you want to delete your account?</p>
                <p>This action cannot be undone.</p>
              </ng-shadcn-dialog-content>
              <span>More content text</span>
              <ng-shadcn-dialog-footer>
                <ng-shadcn-dialog-close (click)="handleClose()">
                  Cancel
                </ng-shadcn-dialog-close>
                <ng-shadcn-dialog-close asChild>
                  <ng-shadcn-button variant="destructive">
                    Otro Cancel
                  </ng-shadcn-button>
                </ng-shadcn-dialog-close>
                <ng-shadcn-button (click)="onDelete()">
                  Delete
                </ng-shadcn-button>
              </ng-shadcn-dialog-footer>
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

  handleClose() {
    console.log('Dialog closed');
    // this.isOpen.set(false);
  }

  onDelete() {
    console.log('Account deleted');
    this.isOpen.set(false);
  }
}
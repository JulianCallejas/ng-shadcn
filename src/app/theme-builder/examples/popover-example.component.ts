import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from '@packages/popover/src/public-api';
import { ButtonComponent } from '@packages/button/src/public-api';

@Component({
  selector: 'app-popover-example',
  standalone: true,
  imports: [
    CommonModule,
    PopoverComponent,
    ButtonComponent
  ],
  template: `
    <div class="space-y-4">
      <h2 class="text-2xl font-bold text-foreground mb-4">Popover</h2>
      
      <div class="p-6 border rounded-lg bg-card">
        <div class="space-y-4">
          <p class="text-muted-foreground">
            A popover is a floating panel that appears when a user interacts with a trigger element.
          </p>
          
          <div class="flex flex-wrap gap-4">
            <!-- Basic Popover -->
            <ng-shadcn-popover>
              <button 
                class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                (click)="isOpen.set(!isOpen())"
              >
                Open Popover
              </button>
              
              <div 
                *ngIf="isOpen()"
                class="mt-2 p-4 bg-popover text-popover-foreground rounded-md border shadow-md"
              >
                <h3 class="font-semibold mb-2">Popover Title</h3>
                <p class="text-sm">This is a basic popover. You can put any content here.</p>
                <div class="mt-3 flex justify-end">
                  <button 
                    (click)="isOpen.set(false)"
                    class="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90"
                  >
                    Close
                  </button>
                </div>
              </div>
            </ng-shadcn-popover>
            
            <!-- Popover with Custom Content -->
            <ng-shadcn-popover>
              <button 
                class="px-4 py-2 border rounded-md hover:bg-accent transition-colors"
                (click)="isOpen2.set(!isOpen2())"
              >
                Custom Content
              </button>
              
              <div 
                *ngIf="isOpen2()"
                class="mt-2 w-64 p-4 bg-popover text-popover-foreground rounded-md border shadow-lg"
              >
                <div class="space-y-3">
                  <div class="flex items-center space-x-3">
                    <div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span class="text-primary">👋</span>
                    </div>
                    <div>
                      <h4 class="font-semibold">Hello there!</h4>
                      <p class="text-xs text-muted-foreground">Welcome to our app</p>
                    </div>
                  </div>
                  
                  <p class="text-sm">
                    This is a more complex popover with custom content. You can include forms, lists, or any other components here.
                  </p>
                  
                  <div class="pt-2 flex justify-between items-center">
                    <button 
                      (click)="isOpen2.set(false)"
                      class="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Dismiss
                    </button>
                    <button 
                      class="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90"
                      (click)="onActionClick()"
                    >
                      Take Action
                    </button>
                  </div>
                </div>
              </div>
            </ng-shadcn-popover>
          </div>
          
          <div class="mt-4 p-4 bg-muted/20 rounded-md">
            <p class="text-sm text-muted-foreground">
              <strong>Tip:</strong> Click outside the popover or press Escape to close it.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class PopoverExampleComponent {
  isOpen = signal(false);
  isOpen2 = signal(false);

  onActionClick() {
    console.log('Action button clicked');
    this.isOpen2.set(false);
  }
}

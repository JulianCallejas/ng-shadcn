import { Injectable, ComponentRef, ViewContainerRef, signal } from '@angular/core';
import { DialogComponent } from './dialog.component';

export interface DialogConfig {
  title?: string;
  description?: string;
  showCloseButton?: boolean;
  backdrop?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogs = signal<ComponentRef<DialogComponent>[]>([]);

  open(config: DialogConfig = {}, viewContainerRef?: ViewContainerRef): ComponentRef<DialogComponent> {
    const dialogRef = viewContainerRef?.createComponent(DialogComponent) || 
                      this.createDialog(config);
    
    if (dialogRef) {
      // Configure dialog
      dialogRef.instance.title = config.title || '';
      dialogRef.instance.description = config.description || '';
      dialogRef.instance.showCloseButton = config.showCloseButton ?? true;
      dialogRef.instance.backdrop = config.backdrop ?? true;
      dialogRef.instance.size = config.size || 'md';
      
      // Handle close event
      dialogRef.instance.closed.subscribe(() => {
        this.close(dialogRef);
      });
      
      // Show dialog
      dialogRef.instance.open();
      
      // Track dialog
      this.dialogs.update(dialogs => [...dialogs, dialogRef]);
    }
    
    return dialogRef;
  }

  close(dialogRef: ComponentRef<DialogComponent>) {
    dialogRef.instance.close();
    
    // Remove from tracking
    this.dialogs.update(dialogs => 
      dialogs.filter(dialog => dialog !== dialogRef)
    );
    
    // Destroy component after animation
    setTimeout(() => {
      dialogRef.destroy();
    }, 300);
  }

  closeAll() {
    this.dialogs().forEach(dialog => {
      this.close(dialog);
    });
  }

  private createDialog(config: DialogConfig): ComponentRef<DialogComponent> | null {
    // This would need application root ViewContainerRef
    // For now, return null - dialogs should be created via template
    return null;
  }
}
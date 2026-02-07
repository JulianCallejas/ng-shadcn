import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { DialogTriggerComponent } from './dialog-trigger.component';
import { DialogHeaderComponent } from './dialog-header.component';
import { DialogTitleComponent } from './dialog-title.component';
import { DialogDescriptionComponent } from './dialog-description.component';
import { DialogContentComponent } from './dialog-content.component';
import { DialogFooterComponent } from './dialog-footer.component';
import { DialogCloseComponent } from './dialog-close.component';
import { DialogPortalHostDirective } from './dialog-portal-host.directive';

const DIALOG_COMPONENTS = [
  DialogComponent,
  DialogTriggerComponent,
  DialogHeaderComponent,
  DialogTitleComponent,
  DialogDescriptionComponent,
  DialogContentComponent,
  DialogFooterComponent,
  DialogCloseComponent,
  DialogPortalHostDirective
] as const;

@NgModule({
  imports: [
    CommonModule,
    ...DIALOG_COMPONENTS
  ],
  exports: [
    ...DIALOG_COMPONENTS
  ]
})
export class DialogModule { }

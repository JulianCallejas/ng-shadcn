import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { AlertIconComponent } from './alert-icon.component';
import { AlertTitleComponent } from './alert-title.component';
import { AlertContentComponent } from './alert-content.component';
import { AlertActionComponent } from './alert-action.component';

@NgModule({
  imports: [
    CommonModule,
    AlertComponent,
    AlertIconComponent,
    AlertTitleComponent,
    AlertContentComponent,
    AlertActionComponent
  ],
  exports: [
    AlertComponent,
    AlertIconComponent,
    AlertTitleComponent,
    AlertContentComponent,
    AlertActionComponent
  ]
})
export class AlertModule { }

import { Component, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { ButtonComponent } from '../packages/button/src/lib/button.component';
import { InputComponent } from '../packages/input/src/lib/input.component';
import { CardComponent } from '../packages/card/src/lib/card.component';
import { SwitchComponent } from '../packages/switch/src/lib/switch.component';
import { SelectComponent, SelectOption } from '../packages/select/src/lib/select.component';
import { CheckboxComponent } from '../packages/checkbox/src/lib/checkbox.component';
import { RadioGroupComponent, RadioOption } from '../packages/radio-group/src/lib/radio-group.component';
import { TextareaComponent } from '../packages/textarea/src/lib/textarea.component';
import { BadgeComponent } from '../packages/badge/src/lib/badge.component';
import { AlertComponent } from '../packages/alert/src/lib/alert.component';
import { ThemeBuilderComponent } from "./app/theme-builder/theme-builder.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ThemeBuilderComponent
],
  template: `<app-theme-builder></app-theme-builder>`,
})
export class App {
  
}

bootstrapApplication(App);
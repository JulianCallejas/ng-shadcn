import { Component, signal } from '@angular/core';
import { 
  AccordionExampleComponent, 
  AlertExampleComponent, 
  BadgeExampleComponent, 
  ButtonExampleComponent, 
  CardExampleComponent, 
  CheckboxExampleComponent, 
  DialogExampleComponent, 
  DropdownMenuExampleComponent, 
  InputExampleComponent, 
  RadioGroupExampleComponent, 
  SelectExampleComponent, 
  SwitchExampleComponent, 
  TextareaExampleComponent,
  PopoverExampleComponent,
  TabsExampleComponent,
  TooltipExampleComponent } from './examples';


@Component({
  selector: 'app-theme-builder',
  standalone: true,
  imports: [
    ButtonExampleComponent,
    InputExampleComponent,
    SwitchExampleComponent,
    SelectExampleComponent,
    CheckboxExampleComponent,
    RadioGroupExampleComponent,
    TextareaExampleComponent,
    BadgeExampleComponent,
    AlertExampleComponent,
    AccordionExampleComponent,
    CardExampleComponent,
    DialogExampleComponent,
    DropdownMenuExampleComponent,
    PopoverExampleComponent,
    TabsExampleComponent,
    TooltipExampleComponent
  ],
  templateUrl: './theme-builder.html',
})
export class ThemeBuilderComponent {
  isDark = signal(false);
  
  toggleTheme() {
    this.isDark.update(value => !value);
    if (this.isDark()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
  
}

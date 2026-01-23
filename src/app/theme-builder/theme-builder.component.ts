import { Component, signal, computed, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from '@packages/alert/src/public-api';
import { BadgeComponent } from '@packages/badge/src/public-api';
import { ButtonComponent } from '@packages/button/src/public-api';
import { CardComponent } from '@packages/card/src/public-api';
import { CheckboxComponent } from '@packages/checkbox/src/public-api';
import { InputComponent } from '@packages/input/src/public-api';
import { RadioGroupComponent, RadioOption } from '@packages/radio-group/src/public-api';
import { SelectComponent, SelectOption } from '@packages/select/src/public-api';
import { SwitchComponent } from '@packages/switch/src/public-api';
import { TextareaComponent } from '@packages/textarea/src/public-api';


@Component({
  selector: 'app-theme-builder',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent, 
    InputComponent, 
    CardComponent, 
    SwitchComponent,
    SelectComponent,
    CheckboxComponent,
    RadioGroupComponent,
    TextareaComponent,
    BadgeComponent,
    AlertComponent
  ],
  templateUrl: './theme-builder.html',
})
export class ThemeBuilderComponent {
  isDark = signal(false);
    switchValue = signal(false);
  
    selectOptions = signal<SelectOption[]>([
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue.js' },
      { value: 'angular', label: 'Angular' },
      { value: 'svelte', label: 'Svelte' },
      { value: 'nextjs', label: 'Next.js' }
    ]);
  
    radioOptions = signal<RadioOption[]>([
      { value: 'basic', label: 'Basic Plan', description: 'Perfect for individuals' },
      { value: 'pro', label: 'Pro Plan', description: 'Best for growing teams' },
      { value: 'enterprise', label: 'Enterprise Plan', description: 'Advanced features for large organizations' }
    ]);
  
    sizeOptions = signal<RadioOption[]>([
      { value: 'sm', label: 'Small' },
      { value: 'md', label: 'Medium' },
      { value: 'lg', label: 'Large' }
    ]);
  
    toggleTheme() {
      this.isDark.update(value => !value);
      if (this.isDark()) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  
    onSelectChange(option: SelectOption | null) {
      console.log('Selected:', option);
    }
  
    onCheckboxChange(checked: boolean) {
      console.log('Checkbox checked:', checked);
    }
  
    onRadioChange(option: RadioOption) {
      console.log('Radio selected:', option);
    }
  
    onTextareaChange(value: string) {
      console.log('Textarea value:', value);
    }
  
}

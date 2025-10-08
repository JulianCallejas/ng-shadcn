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

@Component({
  selector: 'app-root',
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
  template: `
    <div class="min-h-screen bg-background">
      <div class="container mx-auto p-8">
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-4xl font-bold text-foreground">ng-shadcn UI Library</h1>
          <button 
            (click)="toggleTheme()" 
            class="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
          >
            {{ isDark() ? '☀️' : '🌙' }} Toggle Theme
          </button>
        </div>
        
        <div class="grid gap-8">
          <!-- Button Examples -->
          <ng-shadcn-card>
            <div class="p-6">
              <h2 class="text-2xl font-semibold mb-4">Buttons</h2>
              <div class="flex gap-4 flex-wrap">
                <ng-shadcn-button>Default</ng-shadcn-button>
                <ng-shadcn-button variant="secondary">Secondary</ng-shadcn-button>
                <ng-shadcn-button variant="destructive">Destructive</ng-shadcn-button>
                <ng-shadcn-button variant="outline">Outline</ng-shadcn-button>
                <ng-shadcn-button variant="ghost">Ghost</ng-shadcn-button>
                <ng-shadcn-button [disabled]="true">Disabled</ng-shadcn-button>
                <ng-shadcn-button size="sm">Small</ng-shadcn-button>
                <ng-shadcn-button size="lg">Large</ng-shadcn-button>
              </div>
            </div>
          </ng-shadcn-card>

          <!-- Input Examples -->
          <ng-shadcn-card>
            <div class="p-6">
              <h2 class="text-2xl font-semibold mb-4">Inputs</h2>
              <div class="grid gap-4 max-w-md">
                <ng-shadcn-input placeholder="Enter your name" label="Name"></ng-shadcn-input>
                <ng-shadcn-input type="email" placeholder="Enter email" label="Email"></ng-shadcn-input>
                <ng-shadcn-input type="password" placeholder="Password" label="Password"></ng-shadcn-input>
                <ng-shadcn-input [disabled]="true" placeholder="Disabled input" label="Disabled"></ng-shadcn-input>
              </div>
            </div>
          </ng-shadcn-card>

          <!-- Switch Examples -->
          <ng-shadcn-card>
            <div class="p-6">
              <h2 class="text-2xl font-semibold mb-4">Switches</h2>
              <div class="flex flex-col gap-4">
                <div class="flex items-center space-x-2">
                  <ng-shadcn-switch id="switch1" [checked]="switchValue"></ng-shadcn-switch>
                  <label for="switch1" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Enable notifications
                  </label>
                </div>
                <div class="flex items-center space-x-2">
                  <ng-shadcn-switch id="switch2" [disabled]="true"></ng-shadcn-switch>
                  <label for="switch2" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Disabled switch
                  </label>
                </div>
              </div>
            </div>
          </ng-shadcn-card>

          <!-- Select Examples -->
          <ng-shadcn-card>
            <div class="p-6">
              <h2 class="text-2xl font-semibold mb-4">Select</h2>
              <div class="grid gap-4 max-w-md">
                <ng-shadcn-select
                  [options]="selectOptions()"
                  placeholder="Choose a framework"
                  (selectionChange)="onSelectChange($event)">
                </ng-shadcn-select>
                <ng-shadcn-select
                  [options]="selectOptions()"
                  [searchable]="true"
                  placeholder="Searchable select">
                </ng-shadcn-select>
                <ng-shadcn-select
                  [options]="selectOptions()"
                  [disabled]="true"
                  placeholder="Disabled select">
                </ng-shadcn-select>
              </div>
            </div>
          </ng-shadcn-card>

          <!-- Checkbox Examples -->
          <ng-shadcn-card>
            <div class="p-6">
              <h2 class="text-2xl font-semibold mb-4">Checkboxes</h2>
              <div class="flex flex-col gap-4">
                <ng-shadcn-checkbox (checkedChange)="onCheckboxChange($event)">
                  <span slot="label">Accept terms and conditions</span>
                  <span slot="description">You agree to our Terms of Service and Privacy Policy.</span>
                </ng-shadcn-checkbox>
                <ng-shadcn-checkbox [indeterminate]="true">
                  <span slot="label">Select all items</span>
                </ng-shadcn-checkbox>
                <ng-shadcn-checkbox [disabled]="true">
                  <span slot="label">Disabled checkbox</span>
                </ng-shadcn-checkbox>
              </div>
            </div>
          </ng-shadcn-card>

          <!-- Radio Group Examples -->
          <ng-shadcn-card>
            <div class="p-6">
              <h2 class="text-2xl font-semibold mb-4">Radio Groups</h2>
              <div class="grid gap-6">
                <div>
                  <h3 class="text-lg font-medium mb-2">Vertical Layout</h3>
                  <ng-shadcn-radio-group
                    [options]="radioOptions()"
                    (selectionChange)="onRadioChange($event)">
                  </ng-shadcn-radio-group>
                </div>
                <div>
                  <h3 class="text-lg font-medium mb-2">Horizontal Layout</h3>
                  <ng-shadcn-radio-group
                    [options]="sizeOptions()"
                    orientation="horizontal">
                  </ng-shadcn-radio-group>
                </div>
              </div>
            </div>
          </ng-shadcn-card>

          <!-- Textarea Examples -->
          <ng-shadcn-card>
            <div class="p-6">
              <h2 class="text-2xl font-semibold mb-4">Textarea</h2>
              <div class="grid gap-4 max-w-md">
                <ng-shadcn-textarea
                  placeholder="Enter your message..."
                  (valueChange)="onTextareaChange($event)">
                </ng-shadcn-textarea>
                <ng-shadcn-textarea
                  [autoResize]="true"
                  [minRows]="3"
                  [maxRows]="8"
                  placeholder="Auto-resizing textarea...">
                </ng-shadcn-textarea>
                <ng-shadcn-textarea
                  [maxLength]="100"
                  [showCharacterCount]="true"
                  placeholder="Limited to 100 characters...">
                </ng-shadcn-textarea>
              </div>
            </div>
          </ng-shadcn-card>

          <!-- Badge Examples -->
          <ng-shadcn-card>
            <div class="p-6">
              <h2 class="text-2xl font-semibold mb-4">Badges</h2>
              <div class="flex flex-wrap gap-4">
                <ng-shadcn-badge>Default</ng-shadcn-badge>
                <ng-shadcn-badge variant="secondary">Secondary</ng-shadcn-badge>
                <ng-shadcn-badge variant="destructive">Error</ng-shadcn-badge>
                <ng-shadcn-badge variant="outline">Outline</ng-shadcn-badge>
                <ng-shadcn-badge variant="success">Success</ng-shadcn-badge>
                <ng-shadcn-badge variant="warning">Warning</ng-shadcn-badge>
                <ng-shadcn-badge variant="info">Info</ng-shadcn-badge>
                <ng-shadcn-badge [dismissible]="true">Dismissible</ng-shadcn-badge>
              </div>
            </div>
          </ng-shadcn-card>

          <!-- Alert Examples -->
          <ng-shadcn-card>
            <div class="p-6">
              <h2 class="text-2xl font-semibold mb-4">Alerts</h2>
              <div class="grid gap-4">
                <ng-shadcn-alert title="Default Alert">
                  This is a default alert with some information.
                </ng-shadcn-alert>
                <ng-shadcn-alert variant="success" title="Success!">
                  Your operation completed successfully.
                </ng-shadcn-alert>
                <ng-shadcn-alert variant="warning" title="Warning" [dismissible]="true">
                  Please review your settings before proceeding.
                </ng-shadcn-alert>
                <ng-shadcn-alert variant="destructive" title="Error">
                  Something went wrong. Please try again.
                </ng-shadcn-alert>
                <ng-shadcn-alert variant="info" title="Information">
                  Here's some helpful information for you.
                </ng-shadcn-alert>
              </div>
            </div>
          </ng-shadcn-card>
        </div>
      </div>
    </div>
  `,
})
export class App {
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

bootstrapApplication(App);
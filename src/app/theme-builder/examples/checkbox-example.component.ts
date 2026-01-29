import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  CheckboxComponent, 
  CheckboxIconComponent, 
  CheckboxLabelComponent,
  CheckboxDescriptionComponent,
} from '@packages/checkbox/src/public-api';
import { CardComponent } from '@packages/card/src/public-api';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkbox-example',
  standalone: true,
  imports: [
    CommonModule, 
    CheckboxComponent,
    CheckboxIconComponent,
    CheckboxLabelComponent,
    CheckboxDescriptionComponent,
    CardComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  styles: [`
    :host {
      display: block;
    }
  `],
  template: `
    <ng-shadcn-card>
      <div class="p-6">
        <h2 class="text-2xl font-semibold mb-6">Checkbox Variants</h2>
        
        <!-- Default Size -->
        <div class="mb-8">
          <h3 class="text-lg font-medium mb-4">Default Size</h3>
          <div class="flex flex-col gap-4 pl-4">
            <ng-shadcn-checkbox 
              (checkedChange)="onCheckboxChange($event)" 
              size="default" 
              className="flex-col">
              <ng-shadcn-checkbox-label>Default checkbox</ng-shadcn-checkbox-label>
              <ng-shadcn-checkbox-description>Standard size with default styling</ng-shadcn-checkbox-description>
            </ng-shadcn-checkbox>
            
            <ng-shadcn-checkbox 
              [(checked)]="checkedState" 
              (checkedChange)="onCheckboxChange($event)" 
              size="default">
              <ng-shadcn-checkbox-label>Checked state</ng-shadcn-checkbox-label>
              <ng-shadcn-checkbox-description>This checkbox is checked by default</ng-shadcn-checkbox-description>
            </ng-shadcn-checkbox>
            
            <ng-shadcn-checkbox 
              [(checked)]="indeterminateState" 
              [indeterminate]="true" 
              (checkedChange)="onCheckboxChange($event)" 
              size="default">
              <ng-shadcn-checkbox-label>Indeterminate state</ng-shadcn-checkbox-label>
              <ng-shadcn-checkbox-description>Useful for 'Select All' functionality</ng-shadcn-checkbox-description>
            </ng-shadcn-checkbox>
            
            <ng-shadcn-checkbox 
              [(checked)]="disabledState" 
              [disabled]="true" 
              size="default">
              <ng-shadcn-checkbox-label>Disabled state</ng-shadcn-checkbox-label>
              <ng-shadcn-checkbox-description>This checkbox is disabled</ng-shadcn-checkbox-description>
            </ng-shadcn-checkbox>

            <ng-shadcn-checkbox 
              [(checked)]="defaultChecked" 
              (checkedChange)="onCheckboxChange($event)" 
              size="default" 
              className="flex-col"
            >
            </ng-shadcn-checkbox>
          </div>
        </div>
        
        <!-- Controlled Example -->
        <div class="mb-8">
          <h3 class="text-lg font-medium mb-4">Controlled Example</h3>
          <div class="flex flex-col gap-4 pl-4">
            <ng-shadcn-checkbox 
              [checked]="controlledChecked"
              (checkedChange)="controlledChecked = $event"
              size="default">
              <ng-shadcn-checkbox-label>{{ controlledLabel }}</ng-shadcn-checkbox-label>
              <ng-shadcn-checkbox-description>This checkbox is controlled by the parent component's state</ng-shadcn-checkbox-description>
            </ng-shadcn-checkbox>
            
            <button 
              (click)="toggleControlledCheckbox()" 
              class="w-fit px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
              {{ controlledChecked ? 'Uncheck' : 'Check' }} the checkbox
            </button>
            
            <div class="mt-2 p-3 bg-muted/50 rounded-md">
              <p class="text-sm">Current state: <code>{{ controlledChecked ? 'checked' : 'unchecked' }}</code></p>
            </div>
          </div>
        </div>
        
        <!-- Form Example -->
        <div class="mb-8">
          <h3 class="text-lg font-medium mb-4">Angular Reactive Form</h3>
          <form [formGroup]="form" (ngSubmit)="onSubmit()" class="flex flex-col gap-4 pl-4">
            <ng-shadcn-checkbox 
              id="terms1"
              formControlName="terms"
              size="default">
              <ng-shadcn-checkbox-label>I accept the terms and conditions</ng-shadcn-checkbox-label>
              <ng-shadcn-checkbox-description>Required to continue</ng-shadcn-checkbox-description>
            </ng-shadcn-checkbox>
            
            <ng-shadcn-checkbox 
              formControlName="newsletter"
              size="default">
              <ng-shadcn-checkbox-label>Subscribe to newsletter</ng-shadcn-checkbox-label>
              <ng-shadcn-checkbox-description>Get the latest updates</ng-shadcn-checkbox-description>
            </ng-shadcn-checkbox>
            
            <ng-shadcn-checkbox 
              formControlName="notifications"
              size="default">
              <ng-shadcn-checkbox-label>Enable notifications</ng-shadcn-checkbox-label>
              <ng-shadcn-checkbox-description>Get important alerts</ng-shadcn-checkbox-description>
            </ng-shadcn-checkbox>
            
            <div class="pt-2">
              <button 
                type="submit" 
                class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                Submit Form
              </button>
              
              <button 
                type="button" 
                (click)="form.reset()" 
                class="ml-2 px-4 py-2 bg-muted text-foreground rounded-md hover:bg-muted/80 transition-colors">
                Reset
              </button>
            </div>
            
            <div *ngIf="formSubmitted" class="mt-4 p-3 rounded-md" [ngClass]="form.valid ? 'bg-green-100 dark:bg-green-900/30' : 'bg-destructive/10'">
              <p *ngIf="form.valid" class="text-green-800 dark:text-green-200">
                Form submitted successfully!
              </p>
              <p *ngIf="!form.valid && form.touched" class="text-destructive">
                Please accept the terms and conditions to continue.
              </p>
            </div>
          </form>
        </div>
        
        <!-- Small Size -->
        <div class="mb-8">
          <h3 class="text-lg font-medium mb-4">Small Size</h3>
          <div class="flex flex-col gap-4 pl-4">
            <ng-shadcn-checkbox size="sm">
              <ng-shadcn-checkbox-label>Small checkbox</ng-shadcn-checkbox-label>
              <ng-shadcn-checkbox-description>Compact size for dense UIs</ng-shadcn-checkbox-description>
            </ng-shadcn-checkbox>
            
            <ng-shadcn-checkbox size="sm" (checkedChange)="onCheckboxChange($event)">
              <ng-shadcn-checkbox-label>Small checked</ng-shadcn-checkbox-label>
            </ng-shadcn-checkbox>
            
            <ng-shadcn-checkbox [disabled]="true" size="sm">
              <ng-shadcn-checkbox-label>Small disabled</ng-shadcn-checkbox-label>
            </ng-shadcn-checkbox>
          </div>
        </div>
        
        <!-- Large Size -->
        <div class="mb-4">
          <h3 class="text-lg font-medium mb-4">Large Size</h3>
          <div class="flex flex-col gap-4 pl-4">
            <ng-shadcn-checkbox size="lg">
              <ng-shadcn-checkbox-label>Large checkbox</ng-shadcn-checkbox-label>
              <ng-shadcn-checkbox-description>Enhanced touch target size</ng-shadcn-checkbox-description>
            </ng-shadcn-checkbox>
            
            <ng-shadcn-checkbox size="lg" (checkedChange)="onCheckboxChange($event)">
              <ng-shadcn-checkbox-label>Large checked</ng-shadcn-checkbox-label>
            </ng-shadcn-checkbox>
            
            <ng-shadcn-checkbox [indeterminate]="true" size="lg" [checked]="true">
              <ng-shadcn-checkbox-label>Large indeterminate</ng-shadcn-checkbox-label>
            </ng-shadcn-checkbox>
            
            <ng-shadcn-checkbox [disabled]="true" size="lg">
              <ng-shadcn-checkbox-label>Large disabled</ng-shadcn-checkbox-label>
            </ng-shadcn-checkbox>
          </div>
        </div>

        <!-- Custom Icons -->
        <div class="mb-8">
          <h3 class="text-lg font-medium mb-4">Custom Icons</h3>
          <div class="flex flex-col gap-4 pl-4">
            <!-- Heart Icon -->
            <ng-shadcn-checkbox 
              checked
              (checkedChange)="onCheckboxChange($event)"
              size="lg">
              <ng-shadcn-checkbox-icon>
               <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                class="w-full h-full"
               >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              </ng-shadcn-checkbox-icon>
              <ng-shadcn-checkbox-label>Add to favorites</ng-shadcn-checkbox-label>
              <ng-shadcn-checkbox-description>Save this item to your favorites</ng-shadcn-checkbox-description>
            </ng-shadcn-checkbox>

            <!-- Star Icon with Animation -->
            <ng-shadcn-checkbox 
              checked
              (checkedChange)="onCheckboxChange($event)"
              size="lg"
              checkedClass="bg-linear-to-l from-[#e966a0] via-[#2b2730] to-[#6554af] border-blue-500"
            >
              <!-- <span class="text-sm text-center w-full h-full leading-[1.75cqh] p-0 align-text-top" icon >
                X
              </span> -->
              <ng-shadcn-checkbox-icon class="text-sm text-center w-full h-full leading-[1.75cqh] p-0 align-text-top">
                🍻
              </ng-shadcn-checkbox-icon>
              <ng-shadcn-checkbox-label>Rate this item</ng-shadcn-checkbox-label>
              <ng-shadcn-checkbox-description>Mark as favorite</ng-shadcn-checkbox-description>
            </ng-shadcn-checkbox>
          </div>
        </div>
      </div>
    </ng-shadcn-card>
  `
})
export class CheckboxExampleComponent {
  // Basic examples state
  defaultChecked = false;
  checkedState = true;
  indeterminateState = false;
  disabledState = false;
  
  // Controlled example state
  controlledChecked = false;
  controlledLabel = 'I am controlled by a parent component';
  
  // Form example state
  form: FormGroup;
  formSubmitted = false;
  
  // Custom icon states
  heartChecked = false;
  starChecked = false;
  circleChecked = false;
  alertChecked = false;
  alertIndeterminate = true;
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      terms: [false, Validators.requiredTrue],
      newsletter: [true],
      notifications: [false]
    });
  }

  onCheckboxChange(event: boolean) {
    console.log('Checkbox changed:', event);
  }
  
  toggleControlledCheckbox() {
    this.controlledChecked = !this.controlledChecked;
  }
  
  onSubmit() {
    this.formSubmitted = true;
    if (this.form.valid) {
      console.log('Form submitted with values:', this.form.value);
      // Here you would typically send the form data to a service
    } else {
      console.log('Form is invalid');
    }
  }

  onAlertCheckboxChange(checked: boolean) {
    if (this.alertIndeterminate) {
      this.alertIndeterminate = false;
      this.alertChecked = true;
    } else if (checked) {
      this.alertIndeterminate = true;
      this.alertChecked = false;
    }
  }
}

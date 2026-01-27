import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from '@packages/checkbox/src/public-api';
import { CardComponent } from '@packages/card/src/public-api';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkbox-example',
  standalone: true,
  imports: [
    CommonModule, 
    CheckboxComponent, 
    CardComponent,
    FormsModule,
    ReactiveFormsModule
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
              [(checked)]="defaultChecked" 
              (checkedChange)="onCheckboxChange($event)" 
              size="default" 
              className="flex-col">
              <span labelContent>Default checkbox</span>
              <span descriptionContent>Standard size with default styling</span>
            </ng-shadcn-checkbox>
            
            <ng-shadcn-checkbox 
              [(checked)]="checkedState" 
              (checkedChange)="onCheckboxChange($event)" 
              size="default">
              <span labelContent>Checked state</span>
              <span descriptionContent>This checkbox is checked by default</span>
            </ng-shadcn-checkbox>
            
            <ng-shadcn-checkbox 
              [(checked)]="indeterminateState" 
              [indeterminate]="true" 
              (checkedChange)="onCheckboxChange($event)" 
              size="default">
              <span labelContent>Indeterminate state</span>
              <span descriptionContent>Useful for 'Select All' functionality</span>
            </ng-shadcn-checkbox>
            
            <ng-shadcn-checkbox 
              [(checked)]="disabledState" 
              [disabled]="true" 
              size="default">
              <span labelContent>Disabled state</span>
              <span descriptionContent>This checkbox is disabled</span>
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
              <span labelContent>{{ controlledLabel }}</span>
              <span descriptionContent>This checkbox is controlled by the parent component's state</span>
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
              formControlName="terms"
              size="default">
              <span labelContent>I accept the terms and conditions</span>
              <span descriptionContent>Required to continue</span>
            </ng-shadcn-checkbox>
            
            <ng-shadcn-checkbox 
              formControlName="newsletter"
              size="default">
              <span labelContent>Subscribe to newsletter</span>
              <span descriptionContent>Get the latest updates</span>
            </ng-shadcn-checkbox>
            
            <ng-shadcn-checkbox 
              formControlName="notifications"
              size="default">
              <span labelContent>Enable notifications</span>
              <span descriptionContent>Get important alerts</span>
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
              <span labelContent>Small checkbox</span>
              <span descriptionContent>Compact size for dense UIs</span>
            </ng-shadcn-checkbox>
            
            <ng-shadcn-checkbox size="sm" (checkedChange)="onCheckboxChange($event)">
              <span labelContent>Small checked</span>
            </ng-shadcn-checkbox>
            
            <ng-shadcn-checkbox [disabled]="true" size="sm">
              <span labelContent>Small disabled</span>
            </ng-shadcn-checkbox>
          </div>
        </div>
        
        <!-- Large Size -->
        <div class="mb-4">
          <h3 class="text-lg font-medium mb-4">Large Size</h3>
          <div class="flex flex-col gap-4 pl-4">
            <ng-shadcn-checkbox size="lg">
              <span labelContent>Large checkbox</span>
              <span descriptionContent>Enhanced touch target size</span>
            </ng-shadcn-checkbox>
            
            <ng-shadcn-checkbox size="lg" (checkedChange)="onCheckboxChange($event)">
              <span labelContent>Large checked</span>
            </ng-shadcn-checkbox>
            
            <ng-shadcn-checkbox [indeterminate]="true" size="lg" [checked]="true">
              <span labelContent>Large indeterminate</span>
            </ng-shadcn-checkbox>
            
            <ng-shadcn-checkbox [disabled]="true" size="lg">
              <span labelContent>Large disabled</span>
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
}

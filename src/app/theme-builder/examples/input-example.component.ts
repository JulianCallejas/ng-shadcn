import { Component } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { InputComponent } from '@packages/input/src/public-api';
import { CardComponent } from '@packages/card/src/public-api';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-example',
  standalone: true,
  imports: [CommonModule, InputComponent, CardComponent, ReactiveFormsModule, JsonPipe],
  template: `
    <ng-shadcn-card>
      <div class="p-6">
        <h2 class="text-2xl font-semibold mb-4">Inputs</h2>
        <div class="grid gap-4 max-w-md">
          <ng-shadcn-input type="number" placeholder="Number" label="Number"></ng-shadcn-input>
          <ng-shadcn-input type="number" placeholder="Number" label="No controls Number" [controlButton]="false"></ng-shadcn-input>
          <ng-shadcn-input placeholder="Enter your name" label="Name"></ng-shadcn-input>
          <ng-shadcn-input type="email" placeholder="Enter email" label="Email"></ng-shadcn-input>
          <ng-shadcn-input type="password" placeholder="Password" label="Password"></ng-shadcn-input>
          <ng-shadcn-input [disabled]="true" placeholder="Disabled input" label="Disabled"></ng-shadcn-input>
          
          <!-- Reactive Form Example -->
          <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="mt-6 space-y-4">
            <h3 class="text-lg font-medium">Profile Form (Reactive)</h3>
            
            <ng-shadcn-input 
              formControlName="username"
              label="Username"
              placeholder="Enter username"
              [error]="getErrorMessage('username')">
            </ng-shadcn-input>
            
            <ng-shadcn-input 
              type="email"
              formControlName="email"
              label="Email"
              placeholder="Enter email"
              [error]="getErrorMessage('email')">
            </ng-shadcn-input>
            
            <ng-shadcn-input 
              type="password"
              formControlName="password"
              label="Password"
              placeholder="Enter password"
              [error]="getErrorMessage('password')">
            </ng-shadcn-input>
            
            <div class="flex justify-end">
              <button 
                type="submit" 
                class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                [disabled]="!profileForm.valid">
                Submit
              </button>
            </div>
            
            <!-- Form Status -->
            <div class="text-sm text-muted-foreground">
              <div>Form Valid: {{ profileForm.valid | json }}</div>
              <div>Form Values: {{ profileForm.value | json }}</div>
            </div>
          </form>
        </div>
        <div class="p-6">
        <h3 class="text-lg font-medium mb-4">Controlled Input Example</h3>
        <div class="grid gap-4 max-w-md">
          <!-- Two-way binding example -->
          <ng-shadcn-input
            [value]="controlledValue"
            (valueChange)="onControlledValueChange($event)"
            label="Controlled Input"
            placeholder="Type something...">
          </ng-shadcn-input>
          
          <!-- Display the current value -->
          <div class="mt-2 p-3 bg-muted/50 rounded-md">
            <p class="text-sm text-muted-foreground">Current value:</p>
            <p class="font-mono text-sm">{{ controlledValue || '(empty)' }}</p>
          </div>
        </div>
      </div>
      </div>
    </ng-shadcn-card>
  `
})
export class InputExampleComponent { 
  profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log('Form submitted:', this.profileForm.value);
      // You can handle the form submission here
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.profileForm.get(controlName);
    
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (control.hasError('required')) {
      return 'This field is required';
    }
    
    if (control.hasError('email')) {
      return 'Please enter a valid email';
    }
    
    if (control.hasError('minlength')) {
      return `Minimum length is ${control.errors['minlength'].requiredLength} characters`;
    }
    
    if (control.hasError('maxlength')) {
      return `Maximum length is ${control.errors['maxlength'].requiredLength} characters`;
    }
    
    return '';
  }

  controlledValue: string = 'Initial value';
 
  onControlledValueChange(value: string) {
    console.log('Controlled value changed:', value);
    this.controlledValue = value;
    // You can perform additional actions here when the value changes

  }
}

import { Component } from '@angular/core';
import { InputComponent } from '@packages/input/src/public-api';
import { CardComponent } from '@packages/card/src/public-api';

@Component({
  selector: 'app-input-example',
  standalone: true,
  imports: [InputComponent, CardComponent],
  template: `
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
  `
})
export class InputExampleComponent { }

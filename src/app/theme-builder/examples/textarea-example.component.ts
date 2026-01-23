import { Component } from '@angular/core';
import { TextareaComponent } from '@packages/textarea/src/public-api';
import { CardComponent } from '@packages/card/src/public-api';

@Component({
  selector: 'app-textarea-example',
  standalone: true,
  imports: [TextareaComponent, CardComponent],
  template: `
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
  `
})
export class TextareaExampleComponent {
  onTextareaChange(value: string) {
    console.log('Textarea value:', value);
  }
}

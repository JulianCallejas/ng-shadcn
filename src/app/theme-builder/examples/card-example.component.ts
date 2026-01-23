import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardDescriptionComponent, CardContentComponent, CardFooterComponent } from '@packages/card/src/public-api';

@Component({
  selector: 'app-card-example',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardDescriptionComponent,
    CardContentComponent,
    CardFooterComponent
  ],
  template: `
    <div class="space-y-4">
      <h2 class="text-2xl font-bold text-foreground mb-4">Card</h2>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ng-shadcn-card>
          <ng-shadcn-card-header>
            <ng-shadcn-card-title>Card Title</ng-shadcn-card-title>
            <ng-shadcn-card-description>This is a basic card example with a title and description.</ng-shadcn-card-description>
          </ng-shadcn-card-header>
          <ng-shadcn-card-content>
            <p class="text-muted-foreground">
              This is the main content of the card. You can put any content here, including other components.
            </p>
          </ng-shadcn-card-content>
          <ng-shadcn-card-footer>
            <button class="text-sm text-primary hover:underline">View details</button>
          </ng-shadcn-card-footer>
        </ng-shadcn-card>

        <ng-shadcn-card>
          <ng-shadcn-card-header>
            <ng-shadcn-card-title>With Image</ng-shadcn-card-title>
          </ng-shadcn-card-header>
          <div class="relative">
            <img 
              src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&auto=format" 
              alt="Sample"
              class="w-full h-48 object-cover"
            >
          </div>
          <ng-shadcn-card-content class="pt-4">
            <p class="text-muted-foreground">
              Cards can include images and other media content. This example shows an image with text content below it.
            </p>
          </ng-shadcn-card-content>
        </ng-shadcn-card>

        <ng-shadcn-card class="bg-gradient-to-br from-primary/10 to-primary/5">
          <ng-shadcn-card-header>
            <ng-shadcn-card-title class="text-primary">Featured Card</ng-shadcn-card-title>
            <ng-shadcn-card-description>Special styling for featured content</ng-shadcn-card-description>
          </ng-shadcn-card-header>
          <ng-shadcn-card-content>
            <p class="text-muted-foreground">
              This card has a gradient background to make it stand out. You can customize the styling to fit your design system.
            </p>
          </ng-shadcn-card-content>
          <ng-shadcn-card-footer class="justify-between">
            <span class="text-sm text-muted-foreground">Updated 2 days ago</span>
            <button class="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors">
              Action
            </button>
          </ng-shadcn-card-footer>
        </ng-shadcn-card>
      </div>
    </div>
  `,
  styles: []
})
export class CardExampleComponent {}

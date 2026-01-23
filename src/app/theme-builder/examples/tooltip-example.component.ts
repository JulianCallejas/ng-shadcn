import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from '@packages/tooltip/src/public-api';

@Component({
  selector: 'app-tooltip-example',
  standalone: true,
  imports: [
    CommonModule,
    TooltipDirective
  ],
  template: `
    <div class="space-y-4">
      <h2 class="text-2xl font-bold text-foreground mb-4">Tooltip</h2>
      
      <div class="p-6 border rounded-lg bg-card">
        <div class="space-y-6">
          <p class="text-muted-foreground">
            Tooltips provide additional information when users hover over, focus on, or tap an element.
          </p>
          
          <!-- Basic Tooltip -->
          <div class="space-y-4">
            <h3 class="font-semibold">Basic Tooltip</h3>
            <div class="flex flex-wrap items-center gap-4">
              <button 
                class="px-4 py-2 border rounded-md hover:bg-accent transition-colors"
                ngShadcnTooltip="This is a basic tooltip"
              >
                Hover me
              </button>
              
              <button 
                class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                ngShadcnTooltip="This is a primary button with a tooltip"
              >
                Primary Button
              </button>
            </div>
          </div>
          
          <!-- Tooltip Positions -->
          <div class="space-y-4">
            <h3 class="font-semibold">Tooltip Positions</h3>
            <div class="grid grid-cols-3 gap-4 items-center justify-items-center">
              <div class="row-start-1 col-start-2">
                <button 
                  class="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  ngShadcnTooltip="Top tooltip"
                  tooltipPosition="top"
                >
                  Top
                </button>
              </div>
              
              <div class="row-start-2 col-start-1">
                <button 
                  class="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  ngShadcnTooltip="Left tooltip"
                  tooltipPosition="left"
                >
                  Left
                </button>
              </div>
              
              <div class="row-start-2 col-start-3">
                <button 
                  class="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  ngShadcnTooltip="Right tooltip"
                  tooltipPosition="right"
                >
                  Right
                </button>
              </div>
              
              <div class="row-start-3 col-start-2">
                <button 
                  class="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  ngShadcnTooltip="Bottom tooltip"
                  tooltipPosition="bottom"
                >
                  Bottom
                </button>
              </div>
            </div>
          </div>
          
          <!-- Custom Delay -->
          <div class="space-y-4">
            <h3 class="font-semibold">Custom Delay</h3>
            <div class="flex flex-wrap items-center gap-4">
              <button 
                class="px-4 py-2 border rounded-md hover:bg-accent transition-colors"
                ngShadcnTooltip="This tooltip appears instantly"
                [tooltipDelay]="0"
              >
                Instant (0ms)
              </button>
              
              <button 
                class="px-4 py-2 border rounded-md hover:bg-accent transition-colors"
                ngShadcnTooltip="This tooltip has a 1-second delay"
                [tooltipDelay]="1000"
              >
                Delayed (1000ms)
              </button>
            </div>
          </div>
          
          <!-- Rich Content -->
          <div class="space-y-4">
            <h3 class="font-semibold">Rich Content</h3>
            <div class="flex flex-wrap items-center gap-4">
              <button 
                class="px-4 py-2 border rounded-md hover:bg-accent transition-colors"
                ngShadcnTooltip="Rich tooltip with formatted text, icons, and more"
                tooltipPosition="top"
              >
                Rich Content Tooltip
              </button>
              
              <button 
                class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                ngShadcnTooltip="Tooltip with icon"
                tooltipPosition="bottom"
              >
                <span class="flex items-center gap-2">
                  <span>With Icon</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </span>
              </button>
            </div>
          </div>
          
          <div class="mt-4 p-4 bg-muted/20 rounded-md">
            <p class="text-sm text-muted-foreground">
              <strong>Tip:</strong> Tooltips can be triggered by hover, focus, or touch. They automatically position themselves based on available space.
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Tooltip Templates -->
  `,
  styles: []
})
export class TooltipExampleComponent {}

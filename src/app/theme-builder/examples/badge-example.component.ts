import { Component } from '@angular/core';
import { BadgeComponent } from '@packages/badge/src/public-api';
import { CardComponent } from '@packages/card/src/public-api';

// Simple SVG icons
const CheckIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
const AlertCircleIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
const InfoIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
const XIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

@Component({
  selector: 'app-badge-example',
  standalone: true,
  imports: [BadgeComponent, CardComponent],
  template: `
    <ng-shadcn-card>
      <div class="p-6 space-y-6">
        <!-- Basic Badges -->
        <div class="space-y-2">
          <h2 class="text-2xl font-semibold">Basic Badges</h2>
          <div class="flex flex-wrap gap-4 items-center">
            <ng-shadcn-badge>Default</ng-shadcn-badge>
            <ng-shadcn-badge variant="secondary">Secondary</ng-shadcn-badge>
            <ng-shadcn-badge variant="destructive">Error</ng-shadcn-badge>
            <ng-shadcn-badge variant="outline">Outline</ng-shadcn-badge>
            <ng-shadcn-badge variant="success">Success</ng-shadcn-badge>
            <ng-shadcn-badge variant="warning">Warning</ng-shadcn-badge>
            <ng-shadcn-badge variant="info">Info</ng-shadcn-badge>
          </div>
        </div>

        <!-- Badges with Leading Icons -->
        <div class="space-y-2">
          <h3 class="text-xl font-medium">With Leading Icons</h3>
          <div class="flex flex-wrap gap-4 items-center">
            <ng-shadcn-badge>
              <div leadingIcon class="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              Success
            </ng-shadcn-badge>
            <ng-shadcn-badge variant="destructive">
              <div leadingIcon >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              </div>
              Error
            </ng-shadcn-badge>
            <ng-shadcn-badge variant="info">
              <div leadingIcon >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              </div>
              Information
            </ng-shadcn-badge>
          </div>
        </div>

        <!-- Badges with Trailing Icons -->
        <div class="space-y-2">
          <h3 class="text-xl font-medium">With Trailing Icons</h3>
          <div class="flex flex-wrap gap-4 items-center">
            <ng-shadcn-badge variant="success">
              Completed
              <div trailingIcon >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
            </ng-shadcn-badge>
            <ng-shadcn-badge variant="warning">
              Warning
              <div trailingIcon >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              </div>
            </ng-shadcn-badge>
          </div>
        </div>

        <!-- Badges with Both Icons -->
        <div class="space-y-2">
          <h3 class="text-xl font-medium">With Both Icons</h3>
          <div class="flex flex-wrap gap-4 items-center">
            <ng-shadcn-badge variant="info">
              <div leadingIcon >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              Information
              <div trailingIcon >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
            </ng-shadcn-badge>
            <ng-shadcn-badge variant="secondary">
              <div leadingIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              All Systems Go
              <div trailingIcon >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              </div>
            </ng-shadcn-badge>
          </div>
        </div>

        <!-- Dismissible Badge -->
        <div class="space-y-2">
          <h3 class="text-xl font-medium">Dismissible Badge</h3>
          <div class="flex flex-wrap gap-4 items-center">
            <ng-shadcn-badge [dismissible]="true" variant="secondary">
              Click the X to dismiss
            </ng-shadcn-badge>
            <ng-shadcn-badge dismissible fade variant="destructive">
              <div leadingIcon [innerHTML]="AlertCircleIcon"></div>
              Critical Error Fade
            </ng-shadcn-badge>
          </div>
        </div>
      </div>
    </ng-shadcn-card>
  `
})
export class BadgeExampleComponent {
  // Icons
  CheckIcon = CheckIcon;
  AlertCircleIcon = AlertCircleIcon;
  InfoIcon = InfoIcon;
  XIcon = XIcon;
}

import { CardContentComponent } from "./card-content.component";
import { CardDescriptionComponent } from "./card-description.component";
import { CardFooterComponent } from "./card-footer.component";
import { CardHeaderComponent } from "./card-header.component";
import { CardTitleComponent } from "./card-title.component";
import { CardComponent } from "./card.component";


export const CardMeta = {
  name: 'card',
  description: 'A flexible card component with header, content, and footer sections',
  component: CardComponent,
  subComponents: [
    CardHeaderComponent,
    CardTitleComponent,
    CardDescriptionComponent,
    CardContentComponent,
    CardFooterComponent,
  ],
  usage: `
    <!-- Basic card -->
    <ng-shadcn-card>
      <p>Card content goes here</p>
    </ng-shadcn-card>
    
    <!-- Full card structure -->
    <ng-shadcn-card>
      <ng-shadcn-card-header>
        <ng-shadcn-card-title>Card Title</ng-shadcn-card-title>
        <ng-shadcn-card-description>Card description</ng-shadcn-card-description>
      </ng-shadcn-card-header>
      <ng-shadcn-card-content>
        <p>Card content</p>
      </ng-shadcn-card-content>
      <ng-shadcn-card-footer>
        <button>Action</button>
      </ng-shadcn-card-footer>
    </ng-shadcn-card>
  `,
};
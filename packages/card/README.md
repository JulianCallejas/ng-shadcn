# Card Component

A flexible card component for displaying content in a consistent container.

## Installation

```bash
npx ng-shadcn install card
```

## Usage

Import the components in your module or standalone component:

```typescript
import { 
  CardComponent, 
  CardHeaderComponent, 
  CardTitleComponent,
  CardDescriptionComponent,
  CardContentComponent,
  CardFooterComponent 
} from '@ng-shadcn/card';

@Component({
  imports: [
    CardComponent, 
    CardHeaderComponent, 
    CardTitleComponent,
    CardDescriptionComponent,
    CardContentComponent,
    CardFooterComponent
  ],
  // ...
})
```

### Basic Usage

```html
<ng-shadcn-card>
  <p>Simple card content</p>
</ng-shadcn-card>
```

### Complete Card Structure

```html
<ng-shadcn-card>
  <ng-shadcn-card-header>
    <ng-shadcn-card-title>Card Title</ng-shadcn-card-title>
    <ng-shadcn-card-description>
      This is a description of the card content.
    </ng-shadcn-card-description>
  </ng-shadcn-card-header>
  
  <ng-shadcn-card-content>
    <p>Main card content goes here.</p>
  </ng-shadcn-card-content>
  
  <ng-shadcn-card-footer>
    <button>Primary Action</button>
    <button>Secondary Action</button>
  </ng-shadcn-card-footer>
</ng-shadcn-card>
```

## Components

### Card
The main card container.

### CardHeader
Container for card title and description.

### CardTitle
Styled heading for the card.

### CardDescription
Styled description text.

### CardContent
Main content area with proper padding.

### CardFooter
Footer area for actions or additional content.

## API

All components accept a `className` prop for additional styling:

```html
<ng-shadcn-card className="w-96 mx-auto">
  <!-- content -->
</ng-shadcn-card>
```
import { ComponentFixture } from '@angular/core/testing';
import { 
  CardComponent, 
  CardHeaderComponent, 
  CardTitleComponent, 
  CardDescriptionComponent, 
  CardContentComponent, 
  CardFooterComponent 
} from './card.component';
import { TestUtils } from '../../../../src/test-utils';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    fixture = await TestUtils.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render card with default classes', () => {
      const card = TestUtils.getBySelector(fixture, 'div');
      TestUtils.expectToHaveClass(card!, 'rounded-lg');
      TestUtils.expectToHaveClass(card!, 'border');
      TestUtils.expectToHaveClass(card!, 'bg-card');
      TestUtils.expectToHaveClass(card!, 'text-card-foreground');
      TestUtils.expectToHaveClass(card!, 'shadow-sm');
    });

    it('should apply custom className', () => {
      component.className = 'custom-card-class';
      fixture.detectChanges();

      const card = TestUtils.getBySelector(fixture, 'div');
      TestUtils.expectToHaveClass(card!, 'custom-card-class');
    });

    it('should render content inside card', () => {
      fixture.componentRef.setInput('innerHTML', '<p>Card content</p>');
      fixture.detectChanges();

      const card = TestUtils.getBySelector(fixture, 'div');
      expect(card?.nativeElement.innerHTML).toContain('Card content');
    });
  });

  describe('Computed Classes', () => {
    it('should return default classes when no custom className', () => {
      const expectedClasses = 'rounded-lg border bg-card text-card-foreground shadow-sm ';
      expect(component.computedClasses).toBe(expectedClasses);
    });

    it('should include custom className in computed classes', () => {
      component.className = 'my-custom-class';
      const expectedClasses = 'rounded-lg border bg-card text-card-foreground shadow-sm my-custom-class';
      expect(component.computedClasses).toBe(expectedClasses);
    });
  });
});

describe('CardHeaderComponent', () => {
  let component: CardHeaderComponent;
  let fixture: ComponentFixture<CardHeaderComponent>;

  beforeEach(async () => {
    fixture = await TestUtils.createComponent(CardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply header classes', () => {
    const header = TestUtils.getBySelector(fixture, 'div');
    TestUtils.expectToHaveClass(header!, 'flex');
    TestUtils.expectToHaveClass(header!, 'flex-col');
    TestUtils.expectToHaveClass(header!, 'space-y-1.5');
    TestUtils.expectToHaveClass(header!, 'p-6');
  });

  it('should apply custom className', () => {
    component.className = 'custom-header';
    fixture.detectChanges();

    const header = TestUtils.getBySelector(fixture, 'div');
    TestUtils.expectToHaveClass(header!, 'custom-header');
  });
});

describe('CardTitleComponent', () => {
  let component: CardTitleComponent;
  let fixture: ComponentFixture<CardTitleComponent>;

  beforeEach(async () => {
    fixture = await TestUtils.createComponent(CardTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render as h3 element', () => {
    const title = TestUtils.getBySelector(fixture, 'h3');
    expect(title).toBeTruthy();
  });

  it('should apply title classes', () => {
    const title = TestUtils.getBySelector(fixture, 'h3');
    TestUtils.expectToHaveClass(title!, 'text-2xl');
    TestUtils.expectToHaveClass(title!, 'font-semibold');
    TestUtils.expectToHaveClass(title!, 'leading-none');
    TestUtils.expectToHaveClass(title!, 'tracking-tight');
  });

  it('should apply custom className', () => {
    component.className = 'custom-title';
    fixture.detectChanges();

    const title = TestUtils.getBySelector(fixture, 'h3');
    TestUtils.expectToHaveClass(title!, 'custom-title');
  });
});

describe('CardDescriptionComponent', () => {
  let component: CardDescriptionComponent;
  let fixture: ComponentFixture<CardDescriptionComponent>;

  beforeEach(async () => {
    fixture = await TestUtils.createComponent(CardDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render as p element', () => {
    const description = TestUtils.getBySelector(fixture, 'p');
    expect(description).toBeTruthy();
  });

  it('should apply description classes', () => {
    const description = TestUtils.getBySelector(fixture, 'p');
    TestUtils.expectToHaveClass(description!, 'text-sm');
    TestUtils.expectToHaveClass(description!, 'text-muted-foreground');
  });

  it('should apply custom className', () => {
    component.className = 'custom-description';
    fixture.detectChanges();

    const description = TestUtils.getBySelector(fixture, 'p');
    TestUtils.expectToHaveClass(description!, 'custom-description');
  });
});

describe('CardContentComponent', () => {
  let component: CardContentComponent;
  let fixture: ComponentFixture<CardContentComponent>;

  beforeEach(async () => {
    fixture = await TestUtils.createComponent(CardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply content classes', () => {
    const content = TestUtils.getBySelector(fixture, 'div');
    TestUtils.expectToHaveClass(content!, 'p-6');
    TestUtils.expectToHaveClass(content!, 'pt-0');
  });

  it('should apply custom className', () => {
    component.className = 'custom-content';
    fixture.detectChanges();

    const content = TestUtils.getBySelector(fixture, 'div');
    TestUtils.expectToHaveClass(content!, 'custom-content');
  });
});

describe('CardFooterComponent', () => {
  let component: CardFooterComponent;
  let fixture: ComponentFixture<CardFooterComponent>;

  beforeEach(async () => {
    fixture = await TestUtils.createComponent(CardFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply footer classes', () => {
    const footer = TestUtils.getBySelector(fixture, 'div');
    TestUtils.expectToHaveClass(footer!, 'flex');
    TestUtils.expectToHaveClass(footer!, 'items-center');
    TestUtils.expectToHaveClass(footer!, 'p-6');
    TestUtils.expectToHaveClass(footer!, 'pt-0');
  });

  it('should apply custom className', () => {
    component.className = 'custom-footer';
    fixture.detectChanges();

    const footer = TestUtils.getBySelector(fixture, 'div');
    TestUtils.expectToHaveClass(footer!, 'custom-footer');
  });
});

describe('Card Integration', () => {
  it('should work together as a complete card', async () => {
    const fixture = await TestUtils.createComponent(
      class TestCardComponent {
        template = `
          <ng-shadcn-card>
            <ng-shadcn-card-header>
              <ng-shadcn-card-title>Test Title</ng-shadcn-card-title>
              <ng-shadcn-card-description>Test Description</ng-shadcn-card-description>
            </ng-shadcn-card-header>
            <ng-shadcn-card-content>
              <p>Test Content</p>
            </ng-shadcn-card-content>
            <ng-shadcn-card-footer>
              <button>Test Action</button>
            </ng-shadcn-card-footer>
          </ng-shadcn-card>
        `;
      },
      [
        CardComponent,
        CardHeaderComponent,
        CardTitleComponent,
        CardDescriptionComponent,
        CardContentComponent,
        CardFooterComponent
      ]
    );

    fixture.detectChanges();

    // Check that all parts are rendered
    expect(TestUtils.getBySelector(fixture, 'ng-shadcn-card')).toBeTruthy();
    expect(TestUtils.getBySelector(fixture, 'ng-shadcn-card-header')).toBeTruthy();
    expect(TestUtils.getBySelector(fixture, 'ng-shadcn-card-title')).toBeTruthy();
    expect(TestUtils.getBySelector(fixture, 'ng-shadcn-card-description')).toBeTruthy();
    expect(TestUtils.getBySelector(fixture, 'ng-shadcn-card-content')).toBeTruthy();
    expect(TestUtils.getBySelector(fixture, 'ng-shadcn-card-footer')).toBeTruthy();

    // Check content
    const title = TestUtils.getBySelector(fixture, 'h3');
    expect(title?.nativeElement.textContent.trim()).toBe('Test Title');

    const description = TestUtils.getBySelector(fixture, 'p');
    expect(description?.nativeElement.textContent.trim()).toBe('Test Description');
  });
});

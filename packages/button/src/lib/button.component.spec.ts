import { ComponentFixture } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { TestUtils } from '../../../../src/test-utils';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    fixture = await TestUtils.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render button element', () => {
      const button = TestUtils.getBySelector(fixture, 'button');
      expect(button).toBeTruthy();
    });

    it('should render content inside button', () => {
      fixture.componentRef.setInput('innerHTML', 'Click me');
      fixture.detectChanges();
      
      const button = TestUtils.getBySelector(fixture, 'button');
      expect(button?.nativeElement.textContent.trim()).toBe('Click me');
    });

    it('should apply default variant classes', () => {
      const button = TestUtils.getBySelector(fixture, 'button');
      TestUtils.expectToHaveClass(button!, 'bg-primary');
      TestUtils.expectToHaveClass(button!, 'text-primary-foreground');
    });

    it('should apply default size classes', () => {
      const button = TestUtils.getBySelector(fixture, 'button');
      TestUtils.expectToHaveClass(button!, 'h-10');
      TestUtils.expectToHaveClass(button!, 'px-4');
      TestUtils.expectToHaveClass(button!, 'py-2');
    });
  });

  describe('Variants', () => {
    it('should apply destructive variant classes', () => {
      component.variant = 'destructive';
      component.ngOnChanges();
      fixture.detectChanges();

      const button = TestUtils.getBySelector(fixture, 'button');
      TestUtils.expectToHaveClass(button!, 'bg-destructive');
      TestUtils.expectToHaveClass(button!, 'text-destructive-foreground');
    });

    it('should apply outline variant classes', () => {
      component.variant = 'outline';
      component.ngOnChanges();
      fixture.detectChanges();

      const button = TestUtils.getBySelector(fixture, 'button');
      TestUtils.expectToHaveClass(button!, 'border');
      TestUtils.expectToHaveClass(button!, 'border-input');
      TestUtils.expectToHaveClass(button!, 'bg-background');
    });

    it('should apply secondary variant classes', () => {
      component.variant = 'secondary';
      component.ngOnChanges();
      fixture.detectChanges();

      const button = TestUtils.getBySelector(fixture, 'button');
      TestUtils.expectToHaveClass(button!, 'bg-secondary');
      TestUtils.expectToHaveClass(button!, 'text-secondary-foreground');
    });

    it('should apply ghost variant classes', () => {
      component.variant = 'ghost';
      component.ngOnChanges();
      fixture.detectChanges();

      const button = TestUtils.getBySelector(fixture, 'button');
      TestUtils.expectToHaveClass(button!, 'hover:bg-accent');
      TestUtils.expectToHaveClass(button!, 'hover:text-accent-foreground');
    });

    it('should apply link variant classes', () => {
      component.variant = 'link';
      component.ngOnChanges();
      fixture.detectChanges();

      const button = TestUtils.getBySelector(fixture, 'button');
      TestUtils.expectToHaveClass(button!, 'text-primary');
      TestUtils.expectToHaveClass(button!, 'underline-offset-4');
    });
  });

  describe('Sizes', () => {
    it('should apply small size classes', () => {
      component.size = 'sm';
      component.ngOnChanges();
      fixture.detectChanges();

      const button = TestUtils.getBySelector(fixture, 'button');
      TestUtils.expectToHaveClass(button!, 'h-9');
      TestUtils.expectToHaveClass(button!, 'px-3');
    });

    it('should apply large size classes', () => {
      component.size = 'lg';
      component.ngOnChanges();
      fixture.detectChanges();

      const button = TestUtils.getBySelector(fixture, 'button');
      TestUtils.expectToHaveClass(button!, 'h-11');
      TestUtils.expectToHaveClass(button!, 'px-8');
    });

    it('should apply icon size classes', () => {
      component.size = 'icon';
      component.ngOnChanges();
      fixture.detectChanges();

      const button = TestUtils.getBySelector(fixture, 'button');
      TestUtils.expectToHaveClass(button!, 'h-10');
      TestUtils.expectToHaveClass(button!, 'w-10');
    });
  });

  describe('Disabled State', () => {
    it('should apply disabled attribute when disabled is true', () => {
      component.disabled = true;
      fixture.detectChanges();

      const button = TestUtils.getBySelector(fixture, 'button');
      expect(button?.nativeElement.disabled).toBe(true);
    });

    it('should apply disabled classes when disabled', () => {
      component.disabled = true;
      fixture.detectChanges();

      const button = TestUtils.getBySelector(fixture, 'button');
      TestUtils.expectToHaveClass(button!, 'disabled:pointer-events-none');
      TestUtils.expectToHaveClass(button!, 'disabled:opacity-50');
    });

    it('should not emit click event when disabled', () => {
      component.disabled = true;
      fixture.detectChanges();

      spyOn(component.clicked, 'emit');
      const button = TestUtils.getBySelector(fixture, 'button');
      TestUtils.click(button!);

      expect(component.clicked.emit).not.toHaveBeenCalled();
    });
  });

  describe('Click Events', () => {
    it('should emit click event when clicked', () => {
      spyOn(component.clicked, 'emit');
      const button = TestUtils.getBySelector(fixture, 'button');
      TestUtils.click(button!);

      expect(component.clicked.emit).toHaveBeenCalledWith(jasmine.any(Event));
    });

    it('should call handleClick method when clicked', () => {
      spyOn(component, 'handleClick');
      const button = TestUtils.getBySelector(fixture, 'button');
      TestUtils.click(button!);

      expect(component.handleClick).toHaveBeenCalledWith(jasmine.any(Event));
    });
  });

  describe('Custom Classes', () => {
    it('should apply custom className', () => {
      component.className = 'custom-class';
      component.ngOnChanges();
      fixture.detectChanges();

      const button = TestUtils.getBySelector(fixture, 'button');
      TestUtils.expectToHaveClass(button!, 'custom-class');
    });
  });

  describe('Accessibility', () => {
    it('should have button type by default', () => {
      const button = TestUtils.getBySelector(fixture, 'button');
      expect(button?.nativeElement.type).toBe('button');
    });

    it('should have focus-visible classes for keyboard navigation', () => {
      const button = TestUtils.getBySelector(fixture, 'button');
      TestUtils.expectToHaveClass(button!, 'focus-visible:outline-none');
      TestUtils.expectToHaveClass(button!, 'focus-visible:ring-2');
      TestUtils.expectToHaveClass(button!, 'focus-visible:ring-ring');
    });
  });

  describe('Signal Updates', () => {
    it('should update computed classes when variant changes', () => {
      const initialClasses = component.computedClasses();
      
      component.variant = 'destructive';
      component.ngOnChanges();
      
      const updatedClasses = component.computedClasses();
      expect(updatedClasses).not.toBe(initialClasses);
      expect(updatedClasses).toContain('bg-destructive');
    });

    it('should update computed classes when size changes', () => {
      const initialClasses = component.computedClasses();
      
      component.size = 'lg';
      component.ngOnChanges();
      
      const updatedClasses = component.computedClasses();
      expect(updatedClasses).not.toBe(initialClasses);
      expect(updatedClasses).toContain('h-11');
    });
  });
});

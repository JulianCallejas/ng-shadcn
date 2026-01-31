import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  computed,
  effect,
  contentChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@packages/utils/src/public-api';

/* ----------------------------------
 * Variants
 * ---------------------------------- */
const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends VariantProps<typeof buttonVariants> {
  disabled?: boolean;
  class?: string;
}

/* ----------------------------------
 * Component
 * ---------------------------------- */
@Component({
  selector: 'ng-shadcn-button',
  standalone: true,
  imports: [CommonModule],
  template: `
  <ng-template #content>
    <ng-content></ng-content>
  </ng-template>

  @if (!asChild()) {
  <button
    [type]="type()"
    [class]="classes()"
    [disabled]="disabled()"
    [attr.aria-disabled]="disabled()"
  >
    <ng-container *ngTemplateOutlet="content"></ng-container>
  </button>
} @else {
  <ng-container *ngTemplateOutlet="content"></ng-container>
}
  `,
})
export class ButtonComponent {
  /* ---------------- Inputs (signals) ---------------- */
  variant = signal<ButtonProps['variant']>('default');
  size = signal<ButtonProps['size']>('default');
  disabled = signal(false);
  type = signal<'button' | 'submit' | 'reset'>('button');
  asChild = signal(false);
  class = signal('');

  @Input({ alias: 'variant' }) set _variant(v: ButtonProps['variant']) {
    this.variant.set(v ?? 'default');
  }

  @Input({ alias: 'size' }) set _size(v: ButtonProps['size']) {
    this.size.set(v ?? 'default');
  }

   @Input({ alias: 'disabled' }) set _disabled(v: boolean) {
    this.disabled.set(!!v);
  }

  @Input({ alias: 'type' }) set _type(v: 'button' | 'submit' | 'reset') {
    this.type.set(v ?? 'button');
  }

  @Input({ alias: 'asChild' }) set _asChild(v: boolean) {
    this.asChild.set(!!v);
  }

  @Input({ alias: 'class' }) set _class(v: string) {
    this.class.set(v ?? '');
  }

  /** @ignore */
  classes = computed(() =>
    cn(
      buttonVariants({
        variant: this.variant(),
        size: this.size(),
      }),
      this.class()
    )
  );

  /** @ignore */
  private projected = contentChild<ElementRef>('[asChild]');

  constructor() {
    effect(() => {
      if (!this.asChild()) return;
      const el = this.projected();
      if (!el) return;

      const native = el.nativeElement as HTMLElement;

      native.className = cn(native.className, this.classes());

      if (this.disabled()) {
        native.setAttribute('aria-disabled', 'true');
        native.setAttribute('tabindex', '-1');
      }
    });
  }
}

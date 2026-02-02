# Input Pattern Guide (Shadcn Components)

This guide defines how to declare component inputs in a modern, signal-based Angular component library.

---

## 1. Default Rule (Use This First)

**Always prefer `input()` when an input represents reactive state.**

```ts
readonly size = input<'sm' | 'md' | 'lg'>('md');
readonly disabled = input(false, { transform: booleanAttribute });
```

### Use `input()` when:
- The value is used directly
- The value participates in reactive logic (`computed`, `effect`)
- No imperative interception is required
- The input can change at runtime

This should cover **80–90% of all inputs**.

---

## 2. When NOT to Use `input()`

Use a classic `@Input()` setter **only if you need full control over the incoming value**.

```ts
@Input() set value(v: string | null | undefined) {
  this.valueSignal.set(v?.trim() || '');
}

readonly valueSignal = signal('');
```

### Use a setter when:
- The value must be normalized or sanitized
- Validation or fallback logic is required
- Side effects must run immediately on assignment
- Supporting legacy or unstable APIs

---

## 3. Passive Presentational Inputs

Inputs used only for styling or static attributes may remain as classic inputs.

```ts
@Input() class = '';
@Input() id = '';
```

> Note: `class` may be a signal **if it participates in derived or computed state**
> (e.g. class composition with variants or conditional logic).
> Passive class passthroughs should remain classic `@Input()`.

---

## 4. Semantic & ARIA Inputs (Non-Reactive)

Inputs that represent HTML or ARIA attributes should usually remain as classic `@Input()`.

```ts
@Input() role: AriaRole = 'status';
@Input() ariaLabel?: string;
@Input() tabIndex?: number;
```

### Use classic `@Input()` when:
- The input is semantic or descriptive (ARIA, HTML attributes)
- The value does not affect component logic
- No reactive computation depends on it
- The value is unlikely to change at runtime

Using `input()` here provides no real benefit and may reduce API clarity.

---

## 5. Controlled vs Uncontrolled State

For controlled inputs (managed by the parent):

```ts
readonly value = input<string | undefined>(undefined);
```

Use `computed` or `effect` to sync internal state.  
Avoid `ngOnChanges`.

---

## 6. Aliases and Compatibility

`input()` supports aliases and transforms:

```ts
readonly size = input<'sm' | 'md'>('md', { alias: 'size' });
```

This does **not** break public APIs.

---

## 7. Anti-Patterns (Avoid)

- Mixing `input()` and `@Input()` setters for the same value
- Using setters only to forward values to a signal
- Using `ngOnChanges` with signal-based inputs
- Forcing `ChangeDetectorRef` with signal state

---

## 8. Rule of Thumb

> If an input represents state → use `input()`  
> If an input needs interception → use a setter  
> If an input is semantic or descriptive → use classic `@Input()`  
> If an input is cosmetic → keep it simple

Signals + `OnPush` should handle change detection automatically.

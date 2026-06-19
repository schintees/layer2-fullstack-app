import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { CartSummaryComponent } from './cart-summary.component';

describe('CartSummaryComponent', () => {
    let component: CartSummaryComponent;
    let fixture: ComponentFixture<CartSummaryComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CartSummaryComponent]
        });

        fixture = TestBed.createComponent(CartSummaryComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('subtotal', '149.99');
        fixture.componentRef.setInput('itemCount', 2);
    });

    it('should create', () => {
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('should display subtotal and item count', () => {
        // Action
        fixture.detectChanges();

        // Verify
        const el = fixture.nativeElement as HTMLElement;
        expect(el.textContent).toContain('$149.99');
        expect(el.textContent).toContain('2');
    });

    it('should emit checkout event when Place Order is clicked', () => {
        // Prepare
        fixture.detectChanges();
        const checkoutSpy = vi.fn();
        component.checkout.subscribe(checkoutSpy);

        // Action
        component.onCheckout();

        // Verify
        expect(checkoutSpy).toHaveBeenCalled();
    });

    it('should emit clear event when Clear Cart is clicked', () => {
        // Prepare
        fixture.detectChanges();
        const clearSpy = vi.fn();
        component.clear.subscribe(clearSpy);

        // Action
        component.onClear();

        // Verify
        expect(clearSpy).toHaveBeenCalled();
    });

    it('should disable Place Order button when isSubmitting is true', () => {
        // Prepare
        fixture.componentRef.setInput('isSubmitting', true);
        fixture.detectChanges();

        // Action
        const buttons = fixture.nativeElement.querySelectorAll('button');
        const placeOrderBtn = buttons[0] as HTMLButtonElement;

        // Verify
        expect(placeOrderBtn.disabled).toBe(true);
    });

    it('should disable Place Order button when disableCheckout is true', () => {
        // Prepare
        fixture.componentRef.setInput('disableCheckout', true);
        fixture.detectChanges();

        // Action
        const buttons = fixture.nativeElement.querySelectorAll('button');
        const placeOrderBtn = buttons[0] as HTMLButtonElement;

        // Verify
        expect(placeOrderBtn.disabled).toBe(true);
    });

    it('should enable Place Order button when disableCheckout is false and not submitting', () => {
        // Prepare
        fixture.componentRef.setInput('disableCheckout', false);
        fixture.componentRef.setInput('isSubmitting', false);
        fixture.detectChanges();

        // Action
        const buttons = fixture.nativeElement.querySelectorAll('button');
        const placeOrderBtn = buttons[0] as HTMLButtonElement;

        // Verify
        expect(placeOrderBtn.disabled).toBe(false);
    });

    it('should disable Clear Cart button when isSubmitting is true', () => {
        // Prepare
        fixture.componentRef.setInput('isSubmitting', true);
        fixture.detectChanges();

        // Action
        const buttons = fixture.nativeElement.querySelectorAll('button');
        const clearCartBtn = buttons[1] as HTMLButtonElement;

        // Verify
        expect(clearCartBtn.disabled).toBe(true);
    });

    it('should not disable Clear Cart button when only disableCheckout is true', () => {
        // Prepare
        fixture.componentRef.setInput('disableCheckout', true);
        fixture.detectChanges();

        // Action
        const buttons = fixture.nativeElement.querySelectorAll('button');
        const clearCartBtn = buttons[1] as HTMLButtonElement;

        // Verify
        expect(clearCartBtn.disabled).toBe(false);
    });
});

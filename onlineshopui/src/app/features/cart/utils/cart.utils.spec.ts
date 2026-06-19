import {
    buildProductsById,
    calculateCartSubtotal,
    calculateLineTotal,
    toCreateOrderDto
} from './cart.utils';
import { MOCK_PRODUCTS } from '../../../core/mocks/data/products.mock';
import { MOCK_CART_ITEMS } from '../../../core/mocks/data/cart.mock';
import { AddressDto } from '../../../core/types/dtos/location.dto';

describe('cart.utils', () => {
    const validAddress: AddressDto = {
        country: 'Romania',
        city: 'Cluj-Napoca',
        county: 'Cluj',
        streetAddress: 'Strada Mihai Eminescu 5'
    };

    describe('buildProductsById()', () => {
        it('should build a map keyed by product id', () => {
            // Action
            const result = buildProductsById(MOCK_PRODUCTS);

            // Verify
            expect(result.size).toBe(MOCK_PRODUCTS.length);
            expect(result.get(MOCK_PRODUCTS[0].id)).toEqual(MOCK_PRODUCTS[0]);
        });

        it('should return empty map for empty array', () => {
            // Action
            const result = buildProductsById([]);

            // Verify
            expect(result.size).toBe(0);
        });
    });

    describe('calculateCartSubtotal()', () => {
        it('should calculate total price', () => {
            // Prepare
            const productsById = buildProductsById(MOCK_PRODUCTS);

            // Action
            const result = calculateCartSubtotal(MOCK_CART_ITEMS, productsById);

            // Verify
            expect(parseFloat(result)).toBeGreaterThan(0);
        });

        it('should return 0.00 for empty items', () => {
            // Prepare
            const productsById = buildProductsById(MOCK_PRODUCTS);

            // Action
            const result = calculateCartSubtotal([], productsById);

            // Verify
            expect(result).toBe('0.00');
        });

        it('should skip items with unknown product ids', () => {
            // Prepare
            const productsById = buildProductsById(MOCK_PRODUCTS);
            const items = [{ productId: 'unknown-id', quantity: 5 }];

            // Action
            const result = calculateCartSubtotal(items, productsById);

            // Verify
            expect(result).toBe('0.00');
        });
    });

    describe('calculateLineTotal()', () => {
        it('should multiply quantity by price', () => {
            // Action
            const result = calculateLineTotal(3, 10.5);

            // Verify
            expect(result).toBe('31.50');
        });
    });

    describe('toCreateOrderDto()', () => {
        it('should return null for empty items', () => {
            // Action
            const result = toCreateOrderDto([], validAddress);

            // Verify
            expect(result).toBeNull();
        });

        it('should map items and include delivery address', () => {
            // Action
            const result = toCreateOrderDto(MOCK_CART_ITEMS, validAddress);

            // Verify
            expect(result).not.toBeNull();
            expect(result!.items).toHaveLength(MOCK_CART_ITEMS.length);
            expect(result!.items[0].productId).toBe(MOCK_CART_ITEMS[0].productId);
            expect(result!.items[0].quantity).toBe(MOCK_CART_ITEMS[0].quantity);
            expect(result!.deliveryAddress).toEqual(validAddress);
        });
    });
});

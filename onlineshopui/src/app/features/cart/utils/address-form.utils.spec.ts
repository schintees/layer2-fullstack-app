import { createAddressForm } from './address-form.utils';

describe('address-form.utils', () => {
    describe('createAddressForm()', () => {
        it('should create a form with empty initial values', () => {
            // Action
            const form = createAddressForm();

            // Verify
            expect(form.value).toEqual({
                country: '',
                city: '',
                county: '',
                streetAddress: ''
            });
        });

        it('should be invalid when all fields are empty', () => {
            // Action
            const form = createAddressForm();

            // Verify
            expect(form.valid).toBe(false);
        });

        it('should be valid when all fields are filled', () => {
            // Prepare
            const form = createAddressForm();

            // Action
            form.patchValue({
                country: 'Romania',
                city: 'Cluj-Napoca',
                county: 'Cluj',
                streetAddress: 'Strada Mihai Eminescu 5'
            });

            // Verify
            expect(form.valid).toBe(true);
        });

        it('should be invalid when country is missing', () => {
            // Prepare
            const form = createAddressForm();

            // Action
            form.patchValue({
                country: '',
                city: 'Cluj-Napoca',
                county: 'Cluj',
                streetAddress: 'Strada Mihai Eminescu 5'
            });

            // Verify
            expect(form.valid).toBe(false);
            expect(form.controls['country'].errors).toHaveProperty('required');
        });

        it('should be invalid when city is missing', () => {
            // Prepare
            const form = createAddressForm();

            // Action
            form.patchValue({
                country: 'Romania',
                city: '',
                county: 'Cluj',
                streetAddress: 'Strada Mihai Eminescu 5'
            });

            // Verify
            expect(form.valid).toBe(false);
            expect(form.controls['city'].errors).toHaveProperty('required');
        });

        it('should be invalid when county is missing', () => {
            // Prepare
            const form = createAddressForm();

            // Action
            form.patchValue({
                country: 'Romania',
                city: 'Cluj-Napoca',
                county: '',
                streetAddress: 'Strada Mihai Eminescu 5'
            });

            // Verify
            expect(form.valid).toBe(false);
            expect(form.controls['county'].errors).toHaveProperty('required');
        });

        it('should be invalid when streetAddress is missing', () => {
            // Prepare
            const form = createAddressForm();

            // Action
            form.patchValue({
                country: 'Romania',
                city: 'Cluj-Napoca',
                county: 'Cluj',
                streetAddress: ''
            });

            // Verify
            expect(form.valid).toBe(false);
            expect(form.controls['streetAddress'].errors).toHaveProperty('required');
        });
    });
});

-- =============================================
-- V3.1: Seed supplier data and assign suppliers to existing products
-- =============================================

-- Insert sample suppliers
INSERT INTO suppliers (id, name, contact_info)
VALUES ('5a000001-0000-0000-0000-000000000001', 'TechDistributor Inc.', 'contact@techdistributor.com'),
       ('5a000002-0000-0000-0000-000000000002', 'FashionWholesale Co.', 'sales@fashionwholesale.com'),
       ('5a000003-0000-0000-0000-000000000003', 'HomeGoods Supply', 'info@homegoodssupply.com'),
       ('5a000004-0000-0000-0000-000000000004', 'SportGear Direct', 'orders@sportgeardirect.com');

-- Assign suppliers to products by category:
-- Electronics -> TechDistributor Inc.
UPDATE products
SET supplier_id = '5a000001-0000-0000-0000-000000000001'
WHERE id IN (
    'fade0001-0000-0000-0000-000000000001',
    'fade0002-0000-0000-0000-000000000002',
    'fade0003-0000-0000-0000-000000000003'
);

-- Clothing -> FashionWholesale Co.
UPDATE products
SET supplier_id = '5a000002-0000-0000-0000-000000000002'
WHERE id IN (
    'fade0004-0000-0000-0000-000000000004',
    'fade0005-0000-0000-0000-000000000005'
);

-- Home & Garden -> HomeGoods Supply
UPDATE products
SET supplier_id = '5a000003-0000-0000-0000-000000000003'
WHERE id IN (
    'fade0006-0000-0000-0000-000000000006',
    'fade0007-0000-0000-0000-000000000007'
);

-- Sports -> SportGear Direct
UPDATE products
SET supplier_id = '5a000004-0000-0000-0000-000000000004'
WHERE id IN (
    'fade0008-0000-0000-0000-000000000008',
    'fade0009-0000-0000-0000-000000000009',
    'fade000a-0000-0000-0000-00000000000a'
);

-- Enforce NOT NULL now that all existing products have a supplier assigned
ALTER TABLE products
    ALTER COLUMN supplier_id SET NOT NULL;

-- =============================================
-- V3: Add supplier support to the product catalog
-- =============================================

-- Create the suppliers table
CREATE TABLE suppliers
(
    id           UUID         PRIMARY KEY,
    name         VARCHAR(255) NOT NULL,
    contact_info VARCHAR(500)
);

-- Add supplier reference to products (nullable initially to support existing rows)
ALTER TABLE products
    ADD COLUMN supplier_id UUID REFERENCES suppliers (id);

CREATE TABLE IF NOT EXISTS order_products (
    id SERIAL PRIMARY KEY,
    product_id bigint REFERENCES products(id),
    order_id bigint REFERENCES orders(id),
    quantity bigint NOT NULL
);
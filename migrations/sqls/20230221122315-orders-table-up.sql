CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id bigint REFERENCES users(id) NOT NULL,
    status VARCHAR(50) NOT NULL
);
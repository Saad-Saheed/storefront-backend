# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index - /api/products [GET]
- Show (args: product id) - /api/products/:id [GET]
- Create (args: Product)[token required] - /api/products [POST]
- [OPTIONAL] Top 5 most popular products - /api/five_most_porpular [GET]
- [OPTIONAL] Products by category (args: product category) - /api/categories/:category/products [GET]

#### Users
- Index [token required] - /api/users [GET]
- Show (args: id)[token required] - /api/users/:id [GET]
- Create (args: User)[token required] - /api/users [POST]

#### Orders
- Current Order by user (args: user id)[token required] - /api/users/:id/active_orders [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required] - /api/users/:id/completed_orders [GET]

## Data Shapes
#### Product
-  id | integer
- name | varchar(150)
- price | decimal(15,2)
- [OPTIONAL] category | varchar(100)

#### User
- id | integer
- firstName | varchar(150)
- lastName | varchar(150)
- userName | varchar(150)
- password | varchar(255)

#### Orders
- id | integer
- user_id | bigint
- status of order (active or complete) | varchar(50)

#### OrderProducts
id | integer
product_id | bigint
order_id | bigint
quantity | decimal(15,2)

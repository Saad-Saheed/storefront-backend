* This is the second project from udacityxALX full stack javascript course, the main function of this app is to develop different end points to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page.


- To run the app kindly:

1. clone/download the source code

2. run 
```bash
npm install
```
to install all the dependencies

3. create .env file with the following variables, set the values to your own
    - POSTGRES_HOST=localhost
    - POSTGRES_DB=shopping
    - POSTGRES_TEST_DB=shopping_test
    - POSTGRES_USER=shopping_user
    - POSTGRES_PASSWORD=
    - PASSWORD_SALT=
    - TOKEN_SECRET=
    - SALT_ROUNDS=8
    - ENV=test
     
4. Database setup: 
    - The database is using port: 5432
    - In psql shell run the following:

    1. **Create User**
        ```bash
            CREATE USER shopping_user WITH PASSWORD 'password1109';
        ```

    2. **Create test and live database**
        ```bash
            CREATE DATABASE shopping;
        ```
        ```bash
            CREATE DATABASE shopping_test;
        ```

    3. **Grant priviledges to the user over the two database created**
        ```bash
            GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;
        ```
        ```bash
            GRANT ALL PRIVILEGES ON DATABASE shopping_test TO shopping_user;
        ```
    4. **Instal db-migrate globally in the terminal**
        ```bash
            npm i db-migrate -g
        ```
    5. **migrate tables to both test and live databases**
        ```bash
            npm run migrate
        ```

5. run 
```bash
npm run watch
``` 
to compile the typescripts on watch mode and start the server on dist/server.js

6. use <a href="http://localhost:3000/api">http://localhost:3000/api</a> as the base url to for the endpoints


- Here are the available endpoints, Use the Base url stated above with each endpoint

1. /api/ [GET]
2. /api/login [POST] required(username and password)
3. /api/five_most_porpular [GET]
4. /api/categories/:category/products [GET] (replace :category with the category name)
5. /api/users [GET] required(auth token)
6. /api/users [POST] required(first_name, last_name, username and password)
7. /api/users/:id [GET] replace(:id with the user id), required(auth token)
8. /api/users/:id/active_orders [GET] replace(:id with the user id), required(auth token)
9. /api/users/:id/completed_orders [GET] replace(:id with the user id), required(auth token)
10. /api/products [GET]
11. /api/products/:id [GET] replace(:id with the product id)
12. /api/products/:id [PUT] replace(:id with the product id), required(name, price, category and auth token)
13. /api/products [POST] required(name, price, category and auth token)
14. /api/orders [POST] required(name, price, category and auth token)
15. /api/orders/:id [GET] replace(:id with the order id)
16. /api/orders/:id [PUT] replace(:id with the product id), required(user_id, and status)
17. /api/orders/:id/products [POST] replace(:id with the product id), required(product_id, order_id, quantity)


- Testing with jasmine and supertest
    - Stop currently running server before using this command, as the supertest will start it own server

1. To set the environment to test, migrate tables to test database, run jasmine test and drop the test database on test completion, kindly run 
```bash
npm run test
```
2. to run jasmine test without table migrations run 
```bash
npm run jasmine
```


- Other Script

1. to run prettier, run 
```bash
npm run prettier
```
2. to run eslint, run 
```bash
npm run lint
```
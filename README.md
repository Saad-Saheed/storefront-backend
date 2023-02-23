* This is the second project from udacityxALX full stack javascript course, the main function of this app is to develop different end points to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page.


- To run the app kindly:

1. clone/download the source code
2. run 
```bash
npm install
```
to install all the dependencies

3. run 
```bash
npm run watch
``` 
to compile the typescripts on watch mode and start the server on dist/server.js

5. use <a href="http://localhost:3000/api">http://localhost:3000/api</a> as the base url to for the endpoints


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
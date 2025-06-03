## Build an API

An Application Program Interface (API) stands between the end user/client, who interacts with the website, and the server. It basically takes in requests and gives back responses.

## SQL vs NO-SQL

SQL databases use tables

- Comprise rows and columns
- Examples include MySQL and PostgreSQL

NO-SQL databases use collections

- Each collextion is composed of documents
- For instance, `users` and `products` are examples of collections
- There will be multiple (json) documents under it, one for smart watch, another for chairs, and last one for shoes
- Examples include MongoDB, Redis, and Cassandra

## Steps for creating an API

- Have a route for each API (for instance, `products`) in `server.js`
- For each route, we put them under an api-specific routing file such as `product.route.js` with their methods and related endpoints
- Create a controller file (for instance, `product.controller.js`) that contains code for handling all the api-specific CRUD methods

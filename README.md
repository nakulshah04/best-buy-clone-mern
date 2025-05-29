# Best Buy Clone

This is an attempt to create a simplistic clone of the Best Buy website using the MERN (MongoDB, Express.js, React.js, and Node.js) stack.

## Dependencies

- dotenv: To store sensitive information in a .env file and load environment variables at runtime.
- Express: Web framework to build a web API easily, handling http requests and errors and setting up routes. Essentially, it acts as the core server for the app backend.
- Mongoose: To interact with our MongoDB database, making it easier to perform CRUD (create, read, update, delete) operations and validate data before saving to the database.

## Why do we run `npm init -y` in the root?

To enable us to run scripts like `npm run dev` which allows us to simultaneously start the frontend and backend. This command will create a package.json file, which tracks all configurations, dependencies, and metadata for the project, and helps in deployment.

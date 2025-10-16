# Restaurant Management Backend

This project presents backend system responsible for operations in one restaurant, for example: persist data, table creation and orders managements, CRUD operations with products, ingredients, waiters, tables and such.

## Notice

This repository is public for review purposes only and represents a commercial project.
Unauthorized copying, modification, distribution, or commercial use of the code is strictly prohibited without explicit written permission from the copyright holder.

Contact: papalazoski.papi@gmail.com

## Technologies

- **Node.js** – runtime for server-side JavaScript
- **TypeScript** – superset of JS, adding static typing
- **Express.js** – web framework for REST API
- **Sequelize** – oRM for communication with database (in my case with MySQL)
- **MySQL** – relation database for persisting and managing data
- **npm** – package manager

## Structure

- `models/` – definitions of models and their associations
- `services/` – logic for executing external requests over persisted data.
- `controllers/` – controllers with routes who listen on specific url and transfer that request to specific service
- `utils/` – utility function for connecting to database and json web token functions such as create and validate token
- `dto/` – data transfer object used to send in a http response body or used as a http request body
- `middleware/` – middlewares for cors and protected routes

## How to run

In order to run the backend there are few steps to be completed:

1. Install MySQL database v8 or newer https://dev.mysql.com/downloads/installer/ (optional: install workbench for easier configuration).
2. Follow the rest of the MySQL installation instructions and create a user.
3. Create a database named after your will.
4. Inside the root of the project, create .env file with the following variables:

- DB_NAME=your_db_name
- DB_USER=your_db_user_name
- DB_PASS="your_db_user_password"

Following variables should be as they are written below but they go inside .env too.

- DB_HOST=localhost
- DB_DIALECT=mysql
- PORT=8080
- JWT_SECRET="secret_key_for_internal_program"

5. Open terminal of the environment you are using and run **npm install** to install all neccessary dependencies
6. In terminal again, run **npm run dev** to start the backend.

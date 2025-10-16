/**
 * Entry point for the Express application.
 * Sets up middleware, routes, and starts the server.
 */
import express from "express";
import { authenticateRouter } from "./controllers/authenticateController";
import { ingredientRouter } from "./controllers/ingredientController";
import { kitchenOrderRouter } from "./controllers/kitchenOrderController";
import { orderRouter } from "./controllers/orderController";
import { paymentRouter } from "./controllers/paymentController";
import { productRouter } from "./controllers/productController";
import publicRouter from "./controllers/publicController";
import { servingTableRouter } from "./controllers/servingTableController";
import { waiterRouter } from "./controllers/waiterController";
import { corsConfigMiddleware } from "./middleware";
import { defineAssociations, initializeModels } from "./models";
import { sequelize } from "./utils/db";
import { populateDatabase } from "./services/databaseService";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(corsConfigMiddleware());

// Application routes
app.use("/api", [
  publicRouter,
  authenticateRouter,
  productRouter,
  ingredientRouter,
  waiterRouter,
  servingTableRouter,
  paymentRouter,
  orderRouter,
  kitchenOrderRouter,
]);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // First initialize all models, then define associations. We do it in this order to avoid issues syncing models with associations that are not yet defined.
    initializeModels(); // Initialize all models
    defineAssociations(); // Define associations between models

    await sequelize.sync(); // Sync all initialized models and their defined associations to the DB. If tabeles do not exist, they will be created.
    console.log("✅ Database synced");

    // await populateDatabase(); // Populate the database with initial data

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

import express from "express";
import { login } from "../services/authenticateService";

export const authenticateRouter = express.Router();

authenticateRouter.post("/authenticate/login", async (req, res) => {
  const { username, password } = req.body;
  const serviceResponse = await login({ username, password });

  return res.status(serviceResponse.statusCode).json(serviceResponse.message);
});

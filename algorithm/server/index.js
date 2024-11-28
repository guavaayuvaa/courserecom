import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoute from "./routes/auth.js";

dotenv.config();
const connection_url = "mongodb+srv://user:acer@cluster0.0nvn2.mongodb.net/";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/auth", authRoute);

const PORT = 3001;

mongoose
  .connect(connection_url)
  .then(() => {
    app.listen(PORT, () => console.log(`Server started in port:${PORT}`));
  })
  .catch((error) => {
    console.log(error);
  });

import express from "express";
import { connectDB } from "./db/db";
import userRouter from "./routes/user";
import dotenv from "dotenv";
dotenv.config({
  path: ".env/",
});
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/helth", (req, res) => res.send("Hello World"));
app.use("/api/v1/user", userRouter);
connectDB()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error(err));
app.listen(8000, () => console.log("Server is running on port 8000"));

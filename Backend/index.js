import express, { response } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import ProductRouter from "./routes/productRoutes.js";
import UserRouter from "./routes/userRoutes.js";
import OrderRouter from "./routes/orderRoutes.js";
import Jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  const tokenString = req.header("authorization");
  if (tokenString != null) {
    const token = tokenString.replace("Bearer ", "");

    Jwt.verify(token, "secretkey", (err, decoded) => {
      // secretkey should be replaced with process.env.JWT_SECRET in production
      if (decoded != null) {
        console.log(decoded);
        req.user = decoded; // now we can use req.user in other routes because we have set the middleware
        next();
      } else {
        console.log("Invalid token");
        res.status(401).json({ message: "Invalid token" });
      }
    });
  } else {
    console.log("Token not found");
    next();
  }
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database not connected",err);
  });

app.use("/api/product", ProductRouter);
app.use("/api/user", UserRouter);
app.use("/api/order", OrderRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// mongodb+srv://admin:123@cluster0.mny4yal.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

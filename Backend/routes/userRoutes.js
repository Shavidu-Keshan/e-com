import express  from "express";
import { createUser, loginUser } from "../controllers/userController.js";


const UserRouter = express.Router();


UserRouter.post("/",createUser)
UserRouter.post("/login",loginUser)

export default UserRouter;
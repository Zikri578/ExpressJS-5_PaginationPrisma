import express from "express";
import { user_create, user_read } from "../controllers/userController";


// membuat variabel route user untuk memanggil express router
const routes_user = express.Router();

// membuat route create user menggunakan method POST
routes_user.post("/api/users/create", user_create);

// membuat route read user menggunakan method GET
routes_user.get("/api/users/read", user_read);

// memanggil secara default
export default routes_user;
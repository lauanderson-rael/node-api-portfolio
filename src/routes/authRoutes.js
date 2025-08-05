import express from "express";
import cors from 'cors';
import { login } from "../controllers/authController.js";

const corsOptions = {
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
};

const router = express.Router();
router.use(cors())
router.use(cors(corsOptions))

router.post("/login", login);

export default router;

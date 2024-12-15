import express from "express";
import { login } from "../controllers/authController.js";
import cors from 'cors';
const corsOptions = {
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
};
//  app.use(cors());
//     app.use(cors(corsOptions));

const router = express.Router();
router.use(cors())
router.use(cors(corsOptions))

router.post("/login", login);

export default router;

import express from 'express';
import cors from 'cors';
import autenticar from '../middleware/authMiddleware.js';
import { atualizarNovoPost, deletarPostPorId, listarPosts, postarNovoPost} from '../controllers/postsController.js';

const corsOptions = {
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
};


const postRoutes = (app) => {
    app.use(express.json());
    app.use(cors());
    app.use(cors(corsOptions));
    app.use(express.urlencoded({ extended: true }));

    app.get("/posts", listarPosts);

    app.post("/posts", autenticar, postarNovoPost);

    app.put("/update/:id", autenticar, atualizarNovoPost);

    app.delete("/delete/:id", autenticar, deletarPostPorId);
};

export default postRoutes;

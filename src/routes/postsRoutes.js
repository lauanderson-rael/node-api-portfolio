import express from 'express';

import cors from 'cors';
import { atualizarNovoPost, deletarPostPorId, listarPosts, postarNovoPost} from '../controllers/postsController.js';
import autenticar from '../middleware/authMiddleware.js';

const corsOptions = {
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
};

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     },
// });

// const upload = multer({ dest: './uploads', storage });

const routes = (app) => {
    app.use(express.json());
    app.use(cors());
    app.use(cors(corsOptions));
    app.use(express.urlencoded({ extended: true }));
    // app.use('/uploads', express.static('uploads'));

    app.get("/posts", listarPosts);
    app.post("/posts", autenticar, postarNovoPost);
    //.post("/upload", autenticar, upload.single("imagem"), uploadImagem);
    // app.post("/upload", upload.single("imagem"), uploadImagem);

    //http://localhost:3000/upload/6891eeee6f6b3af0351
    app.put("/upload/:id", autenticar, atualizarNovoPost);

    app.delete("/delete/:id", autenticar, deletarPostPorId);
};

export default routes;

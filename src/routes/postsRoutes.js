import express from 'express'
import multer from 'multer';
import cors from 'cors'
import { atualizarNovoPost, deletarPostPorId, listarPosts, postarNovoPost, uploadImagem } from '../controllers/postsController.js';

// avisar que vamos receber requisicoes de uma link externo
const corsOptions = {
    origin: "*", // Permite qualquer origem
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200 // Corrigido o typo de "optiosSuccessStatus" para "optionsSuccessStatus"
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');

    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: './uploads', storage })

const routes = (app) => {
    app.use(express.json())
    app.use(cors(corsOptions))
    app.use(express.urlencoded({ extended: true})) // interpretar formularios
    app.use('/uploads', express.static('uploads'))

    app.get("/posts", listarPosts);
    app.post("/posts", postarNovoPost)
    app.post("/upload", upload.single("imagem"), uploadImagem)

    app.put("/upload/:id", atualizarNovoPost)

    app.delete("/delete/:id", deletarPostPorId)
}

export default routes;

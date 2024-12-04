import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { atualizarNovoPost, deletarPostPorId, listarPosts, postarNovoPost, uploadImagem } from '../controllers/postsController.js';

// Avisar que vamos receber requisições de links externos
const corsOptions = {
    origin: ["http://localhost:8000", "http://localhost:5173", "https://lauanderson-portfolio.vercel.app", "https://backend-instabytes.vercel.app", "https://lauanderson-portfolio-k1baotfie-lauanderson-raels-projects.vercel.app"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optiosSuccessStatus: 200
}

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Diretório onde os arquivos serão salvos
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Mantém o nome original do arquivo
    }
});

// Inicializando o multer sem a opção `dest`
const upload = multer({ storage });

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions));

    // Definindo as rotas
    app.get("/posts", listarPosts);
    app.post("/posts", postarNovoPost);
    
    // Rota para upload de imagem
    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost);
    app.delete("/delete/:id", deletarPostPorId);
}

export default routes;

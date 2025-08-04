import express from "express";
import routes from "./src/routes/postsRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";

const app = express();
app.use(express.json());
app.use(express.static("uploads"));

app.use("/auth", authRoutes); // Rota para autenticação
routes(app);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

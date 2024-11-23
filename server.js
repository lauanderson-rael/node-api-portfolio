import express from "express";
import routes from "./src/routes/postsRoutes.js";

const app = express();
app.use(express.static("uploads")) // tudo que tiver nessa pasta, sera acessado
routes(app)
app.listen(3000, () => {
    console.log("servidor rodando!")
});

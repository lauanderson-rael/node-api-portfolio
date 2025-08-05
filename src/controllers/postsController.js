import { getTodosPosts, criarPost, atualizarPost, deletarPost } from "../models/postsModel.js"

export async function listarPosts(req, res) {
    const posts = await getTodosPosts()
    res.status(200).json(posts)
}

export async function postarNovoPost(req, res) {
    const novopost = req.body;
    try {
        const postCriado = await criarPost(novopost)
        res.status(200).json(postCriado)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ "Erro": "Falha na requisição!" })
    }
}


export async function atualizarNovoPost(req, res) {
    const id = req.params.id

    try {
        const post = {
            imgUrl: req.body.imgUrl,
            descricao: req.body.descricao,
            titulo: req.body.titulo,
            link: req.body.link,
            alt: req.body.alt
        }

        const postCriado = await atualizarPost(id, post)
        res.status(200).json(postCriado)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ "Erro": "Falha na requisição!" })
    }
}


export async function deletarPostPorId(req, res) {
    const id = req.params.id;
    try {
        const resultado = await deletarPost(id);
        if (resultado.deletedCount === 0) {
            return res.status(404).json({ mensagem: 'Post não encontrado!' });
        }
        res.status(200).json({ mensagem: 'Post deletado com sucesso!' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ "Erro": "Falha na requisição!" });
    }
}

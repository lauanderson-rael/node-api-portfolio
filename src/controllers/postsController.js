import { getTodosPosts, criarPost, atualizarPost, deletarPost } from "../models/postsModel.js"
import fs from 'fs'
import gerarDescricaoComGemini from "../services/geminiService.js"




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



export async function uploadImagem(req, res) {
    const id = req.params.id
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const novopost = {
        titulo: "",
        descricao: "",
        imgUrl: baseUrl + "/" + "???" + ".png",
        alt: "",
        link: ""
    }

    try {
        const postCriado = await criarPost(novopost)
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)
        res.status(200).json(postCriado)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ "Erro": "Falha na requisição!" })
    }
}



export async function atualizarNovoPost(req, res) {
    const id = req.params.id
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const urlImagem = `${baseUrl}/${id}.png`

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const post = {
            imgUrl: urlImagem,
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

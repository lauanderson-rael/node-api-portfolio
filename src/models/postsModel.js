import 'dotenv/config'

import { ObjectId } from 'mongodb'
import conectarAoBanco from '../config/dbConfig.js'
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)

export async function getTodosPosts() {
    const db = conexao.db("imersao-instabytes")
    const colecao = db.collection("posts")
    return colecao.find().toArray()
}

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instabytes")
    const colecao = db.collection("posts")
    return colecao.insertOne(novoPost)

}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-instabytes")
    const colecao = db.collection("posts")
    const obgID = ObjectId.createFromHexString(id)  // transformando id para formato do mongo
    return colecao.updateOne({ _id: new ObjectId(obgID) }, { $set: novoPost })  // _id: identifica o elemento, $set: dados que serao atualizados

}

// deletar um post por ID
export async function deletarPost(id) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id); // Criando ObjectId a partir da string
    return colecao.deleteOne({ _id: objID });
}

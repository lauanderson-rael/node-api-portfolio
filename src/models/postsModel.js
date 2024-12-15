import 'dotenv/config'
import { ObjectId } from 'mongodb'
//------------
import { MongoClient } from 'mongodb';
async function conectarAoBanco(stringConexao) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(stringConexao);
        console.log('Conectando ao cluster do banco de dados...');
        await mongoClient.connect();
        console.log('Conectado ao MongoDB Atlas com sucesso!');

        return mongoClient;
    } catch (erro) {
        console.error('Falha na conexão com o banco!', erro);
        process.exit();
    }
}

//-------------
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

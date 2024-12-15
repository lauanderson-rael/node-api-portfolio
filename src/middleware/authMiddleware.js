import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function autenticar(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log(authHeader)

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ mensagem: "Token não fornecido ou inválido." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.username = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ mensagem: "Token inválido ou expirado." });
    }
}

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const credenciais = { username: "admin", password: "admin123" };

export function login(req, res) {
    const { username, password } = req.body;

    if (username === credenciais.username && password === credenciais.password) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        return res.status(200).json({ token });
    }

    res.status(401).json({ mensagem: "Credenciais inválidas." });
}

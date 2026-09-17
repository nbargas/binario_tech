const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const validarJWT = require("./validarJWT");

const app = express();

app.use(express.json());

const JWT_SECRET = "chave-secreta";

mongoose.connect("mongodb://127.0.0.1:27017/aula18-avaliacao")
    .then(() => console.log("MongoDB conectado"))
    .catch((erro) => console.log("Erro ao conectar no MongoDB:", erro));

const Usuario = mongoose.model("Usuario", {
    email: String,
    senha: String
});

app.post("/api/v1/prova/register", async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                mensagem: "Email e senha são obrigatórios"
            });
        }

        if (senha.length < 6) {
            return res.status(400).json({
                mensagem: "A senha deve ter no mínimo 6 caracteres"
            });
        }

        const usuarioExistente = await Usuario.findOne({ email });

        if (usuarioExistente) {
            return res.status(409).json({
                mensagem: "Email já cadastrado"
            });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const usuario = new Usuario({
            email: email,
            senha: senhaHash
        });

        await usuario.save();

        return res.status(201).json({
            mensagem: "Usuário registrado com sucesso"
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro interno do servidor"
        });
    }
});

app.post("/api/v1/prova/login", async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                mensagem: "Email e senha são obrigatórios"
            });
        }

        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(401).json({
                mensagem: "Email ou senha incorretos"
            });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({
                mensagem: "Email ou senha incorretos"
            });
        }

        const token = jwt.sign(
            {
                id: usuario._id,
                email: usuario.email
            },
            JWT_SECRET,
            {
                expiresIn: "30m"
            }
        );

        return res.status(200).json({
            token: token
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro interno do servidor"
        });
    }
});

app.post("/api/v1/prova/login", async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                mensagem: "Email e senha são obrigatórios"
            });
        }

        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(401).json({
                mensagem: "Email ou senha incorretos"
            });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({
                mensagem: "Email ou senha incorretos"
            });
        }

        const token = jwt.sign(
            {
                id: usuario._id,
                email: usuario.email
            },
            JWT_SECRET,
            {
                expiresIn: "30m"
            }
        );

        return res.status(200).json({
            token: token
        });

    } catch (erro) {
        return res.status(500).json({
            mensagem: "Erro interno do servidor"
        });
    }
});

app.get("/api/v1/prova/relatorio", validarJWT, (req, res) => {
    res.status(200).json({
        mensagem: "Relatório acessado com sucesso",
        usuario: req.usuario
    });
});

app.listen(3002, () => {
    console.log("Servidor rodando na porta 3002");
});

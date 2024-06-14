// Importações de módulos e configurações
require("dotenv").config();
const express = require("express");
const conn = require("./db/conn");
const Jogo = require("./models/Jogo");
const handlebars = require("express-handlebars");
const { json } = require("express/lib/response");
const Usuario = require("./models/Usuario");

const app = express();

// HandleBars
app.engine("handlebars", handlebars.engine())
app.set ("view engine", "handlebars")

// Configurações do middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas
app.post("/jogo/novo", async (req, res) => {
  const dadosJogo = {
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    precoBase: req.body.precoBase
  }

  const jogo = await Jogo.create(dadosJogo);
  res.send("Jogo cadastrado com id" + jogo.id);
});

app.post("/usuario/novo", async (req, res) => {
  const dadosUsuario = {
    nickname: req.body.nickname,
    nome: req.body.nome
  }

  const usuario = await Usuario.create(dadosUsuario);
  res.send("Jogo cadastrado com id" + usuario.id);
});

app.get("/usuarios/:id/atualizar", async (req, res) => {
    const id = req.params.id
    const usuario = await Usuario.findByPk(id, {raw: true})

    res.render("formUsuario", {usuario});
});

app.post("/usuarios/:id/atualizar", async (req, res) => {
  const id = req.params.id
  const dadosUsuario ={
  nickname= req.body.nickname,
  nome: req.body.nome,
  }
  const registrosAfetados = Usuario.update(dadosUsuario, {where: {id:id}});

  if(registrosAfetados > 0){
    res.direct("/usuarios");
  }else {
    res.send("Erro ao atualizar usuário!")
  }
});

app.get("/jogo/novo", (req, res) => {
  res.render(`formJogo`);
});

app.get("/usuario/novo", async (req, res) => {
   res.render(`formUsuario`);
});


app.get("/", (req, res) => {
  res.render(`home`);
});

app.get("/usuarios", async (req, res) => {
    const usuarios = await Usuario.findAll({raw: true})
  res.render(`usuarios`, {usuarios});
});

app.post("/usuarios/excluir", async (req, res) => {
  const id = req.body.id;

  const registrosAfetados = await Usuario.destroy({where: {id:id}});
  if(registrosAfetados > 0){
    res.redirect("/usuarios");
  }else {
    res.rend("Erro ao excluir usuario")
  }
})

// Inicialização do servidor
app.listen(8000, () => {
  console.log("Abridu!");
});

// Conexão com o banco de dados
conn
  .sync()
  .then(() => {
    console.log("Conectado ao banco de dados com sucesso!");
  })
  .catch((err) => {
    console.log("Ocorreu um erro: " + err);
  });
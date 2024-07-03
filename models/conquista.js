const conn = require("../db/conn");
const { DataTypes } = require("sequelize");

const Jogo = require("./Jogo")

const Conquista = conn.define("Conquista", {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },    

},{
        tableName: "Conquistas"
}

)

//conquista pertence a jogo e jogo tem várias conquistas (aula 27/06)
Conquista.belongsTo(Jogo)
Jogo.hasMany(Conquista)

module.exports = Conquista
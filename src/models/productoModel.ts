import { DataTypes, Model } from "sequelize";
import { db } from "~/config/db";
import { Usuario } from "~/interfaces/Usuario";
const UsuarioModel = db.define<Usuario & Model, Usuario>("usuario", {
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
});

export default UsuarioModel;

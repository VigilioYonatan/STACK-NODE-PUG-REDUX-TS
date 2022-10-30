import { Sequelize } from "sequelize";
import Enviroment from "./Enviroments";

const db = new Sequelize(
    Enviroment.DB_NAME as string,
    Enviroment.DB_USER as string,
    Enviroment.DB_PASSWORD,
    {
        host: Enviroment.DB_HOST,
        port: 3306,
        dialect: "mysql",
        define: {
            timestamps: true,
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
);

// db.query = async function () {
//     try {
//         // proxy this call
//         return Sequelize.prototype.query.apply(this, arguments);
//     } catch (err) {
//         // handle it with sentry
//         console.log(err);

//         // rethrow error
//         throw err;
//     }
// };

const conexion = async () => {
    try {
        await db.authenticate();
        db.sync();
        console.log(
            "Conexion Correcta a la base de datos " + Enviroment.DB_NAME
        );
    } catch (error) {
        console.log(error);
    }
};
// export default db;
export { conexion, db };

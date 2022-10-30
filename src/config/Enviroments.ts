import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const Enviroment = {
    PORT: process.env.PORT,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    JWT_KEY: process.env.JWT_KEY,
    NODE_ENV: process.env.NODE_ENV,
};

export default Enviroment;

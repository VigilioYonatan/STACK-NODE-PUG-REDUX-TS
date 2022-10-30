import { addAlias } from "module-alias";
addAlias("~", __dirname + "/");
import express, { Application } from "express";
import { pathUrl } from "~/config/config";
import { conexion } from "~/config/db";
import Enviroment from "~/config/Enviroments";

import usuarioRouter from "~/routers/UsuarioRouter";
import webRouter from "~/routers/webRouter";
import apiRouter from "./routers/api";

/* Aplication */
const app: Application = express();

conexion();
/* Middlewares */
app.use(express.static(pathUrl("/public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.set("views", pathUrl("/views"));

/* Routers Views*/
app.use("/", webRouter);
app.use("/auth", usuarioRouter);
app.use("/api", apiRouter);

/* Routers Api */

/* Listening Port */
const puerto = Enviroment.PORT;

app.listen(puerto, () => {
    console.log(`Corriendo servidor en el puerto ${puerto}`);
});

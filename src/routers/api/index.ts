import { Router } from "express";
import productoApiRouter from "./Producto";

const apiRouter: Router = Router();

apiRouter.use("/productos", productoApiRouter);

export default apiRouter;

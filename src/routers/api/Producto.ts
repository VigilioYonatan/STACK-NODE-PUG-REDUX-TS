import { Router } from "express";
import { getProducto } from "~/controllers/productoController";
const productoApiRouter: Router = Router();
productoApiRouter.get("/:id", getProducto);
export default productoApiRouter;

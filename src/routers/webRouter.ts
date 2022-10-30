import { Request, Response, Router } from "express";
import productos from "../data/Producto";
const webRouter = Router();

webRouter.get("/", (_req: Request, res: Response) => {
    res.render("web/homePage", {
        productos,
    });
});

export default webRouter;

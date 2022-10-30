import { Request, Response } from "express";
import productos from "../data/Producto";

/**
 *  @desc Show Product @access public
 *  @route /api/producto @method  GET
 */
export const getProducto = (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(id);

    const producto = productos.find((pro) => pro.id === +id);
    res.json({ success: true, producto });
};

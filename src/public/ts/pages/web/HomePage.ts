import useFetch from "../../hooks/useFetch";
import { APIProducto, Carrito } from "../../interfaces";
import { carritoContext } from "../../store/context";
import { Component, Div } from "../components/components";
import { modalCart } from "../components/Modal";
// import { modalCart } from "../components/Modal";
(() => {
    /* Documents */
    const productos = document.getElementById("productos") as HTMLDivElement;
    const buttonsPrecio = document.querySelectorAll(".btnPrecio") as NodeList;
    let carritoQty = document.getElementById("carritoQTY") as HTMLSpanElement;

    /* Variables Global */
    let show: boolean = false;
    let productosId: string[] = [];
    const { printHTML } = carritoContext();

    /* Components & PrintHMTL */
    Component("#cart", () => modalCart({ show }))();
    printHTML.printQtyCart();
    /* Methods */
    buttonsPrecio.forEach((btn) => {
        const typeBtn = btn as HTMLButtonElement;
        productosId = [...productosId, typeBtn.dataset.id as string];
    });

    /* Listeners */

    carritoQty.addEventListener("click", () => {
        show = !show;
        Component("#cart", () => modalCart({ show }))();
    });
    productos?.addEventListener("click", async (e) => {
        const { actions } = carritoContext();
        const target = e.target as HTMLDivElement;
        const id = target.dataset.id as string;

        const existProduct = productosId.find((pro) => pro === id);

        if (!existProduct) return;

        if (target.nodeName === "BUTTON" && !actions.existeProducto(+id)) {
            const { data: producto } = await useFetch<APIProducto, {}>(
                `/productos/${id}`
            );

            if (producto?.success && producto.producto.id) {
                const newProductoOnCart: Carrito = {
                    ...producto.producto,
                    subtotal: producto.producto.precio,
                    qty: 1,
                };
                carritoContext().actions.onAddCarrito(newProductoOnCart);
                Component("#cart", () => modalCart({ show }))();
            }
        }
    });
})();

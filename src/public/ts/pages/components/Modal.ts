import { Carrito, Producto } from "../../interfaces";
import { carritoContext } from "../../store/context";
import { Button, Component, Div, Image, Span } from "./components";

const modalCart = ({ show = true }: { show?: boolean }) => {
    const { carrito, actions } = carritoContext();
    const productoItem = carrito.map((producto) => {
        const { cantidad, title, id, subtotal, qty } = producto;
        return Div({
            className: "cartModal__body",
            add: [
                Span({
                    className: "cartModal__body__title",
                    textContent: title,
                }),
                Image({
                    src: "https://cdn.monstercat.com/share.png",
                    width: 50,
                }),
                Div({
                    add: [
                        Button({
                            textContent: "+",
                            onclick: () => {
                                actions.onAddCarrito(producto);
                                Component("#cart", () => modalCart({}))();
                              
                            },
                        }),
                        Span({ textContent: qty.toString() }),
                        Button({
                            textContent: "-",
                            onclick: () => {
                                actions.onRemoveCarrito(producto);
                                Component("#cart", () => modalCart({}))();
                            },
                        }),
                        Span({ textContent: subtotal.toString() }),
                    ],
                }),
            ],
        });
    });

    const divPadre = Div({
        className: "cartModal",
        styles: show ? "display:block" : "display:none;",
        add: [
            Span({
                className: "cartModal__title",
                textContent: "Carrito",
            }),
            Div({
                add: !carrito.length
                    ? [Span({ textContent: "No hay" })]
                    : [...productoItem],
            }),
        ],
    });

    return divPadre;
};

export { modalCart };

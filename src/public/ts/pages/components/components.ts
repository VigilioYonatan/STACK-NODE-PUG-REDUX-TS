type ElementProps<T extends HTMLElement> = Partial<Omit<T, "style">> & {
    typeHTML: keyof HTMLElementTagNameMap;
    styles?: string;
    add?: Node[];
};

const Element = <T extends HTMLElement>({ ...rest }: ElementProps<T>) => {
    const element = document.createElement(rest.typeHTML) as T;
    const elementType = element as any;
    const propsEntries = Object.entries(rest);

    propsEntries.map(([key, value]) => {
        if (key === "styles") {
            elementType.style.cssText = value as string;
        }
        if (typeof elementType[key] === "function") {
            elementType[key](value);
        }
        if (key === "add") {
            const nodeValue = value as Node[];
            for (let i = 0; i < nodeValue.length; i++) {
                elementType.appendChild(nodeValue[i]);
            }
        }
        elementType[key] = value;
    });

    return elementType;
};
type CustomElement<T extends HTMLElement> = Omit<ElementProps<T>, "typeHTML">;

export const Button = ({ ...rest }: CustomElement<HTMLButtonElement>) =>
    Element<HTMLButtonElement>({
        ...rest,
        typeHTML: "button",
    });

export const Div = ({ ...rest }: CustomElement<HTMLDivElement>) =>
    Element<HTMLDivElement>({
        ...rest,
        typeHTML: "div",
    });

export const Span = ({ ...rest }: CustomElement<HTMLSpanElement>) =>
    Element<HTMLSpanElement>({
        ...rest,
        typeHTML: "span",
    });
export const Image = ({ ...rest }: CustomElement<HTMLImageElement>) =>
    Element<HTMLImageElement>({
        ...rest,
        typeHTML: "img",
    });

export const Component = (element: string, cb: Function | "") => {
    return () => {
        const elementHtml = document.querySelector(element) as HTMLElement;

        while (elementHtml.firstElementChild) {
            elementHtml.removeChild(elementHtml.firstElementChild);
        }

        if (typeof cb === "string") {
            elementHtml.prepend("");
            return;
        }
        elementHtml.prepend(cb());
    };
};

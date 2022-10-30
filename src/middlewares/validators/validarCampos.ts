import { validationResult, body } from "express-validator";
import { Request, Response, NextFunction } from "express";

const validar = (
    req: Request,
    res: Response<{ param: string; msg: string; success: boolean }>,
    next: NextFunction
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            msg: errors.array()[0].msg,
            param: errors.array()[0].param,
        });
    }

    next();
};

const validarPostBody =
    (url: string, data: string) =>
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        console.log(errors);

        if (!errors.isEmpty()) {
            return res.render(url, {
                errors,
                [data]: req.body,
            });
        }

        next();
    };
const returnErrorCamposNoValidos = <T extends Object>(
    arrayBody: Array<keyof T | string>
) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { ...rest } = req.body as T;
        const data = Object.keys(rest);

        /* Si hay campos demaás */
        for (const dat of data) {
            if (!arrayBody.includes(dat)) {
                const error = new Error(
                    `Campos no permitidos: ${dat} - [${arrayBody.join("-")}]`
                );
                return res.status(401).json({ msg: error.message });
            }
        }
        //! Obeservacion: Si faltan campos o no tienen ningun carácter
        // for (const body of arrayBody) {
        //     if (!data.includes(body as string) || !req.body[body].length) {
        //         const error = new Error(CustomMessage.required);
        //         return res.status(401).json({
        //             success: false,
        //             msg: error.message,
        //             param: body,
        //         });
        //     }
        // }

        next();
    };
};
const expressValidationTyped = <T extends object>() => {
    return {
        body: (a?: keyof T, b?: string) => body(a as string, b),
    };
};

const enum CustomMessage {
    required = "Back: Este campo es obligatorio",
    email = "Back: Este correo electrónico no es válido",
    numeric = "Back: Este campo solo permite numeros",
    text = "Back: Este campo solo permite textos",
    mongoId = "Back: MongoID no válido",
}

const ValidationsRegex = {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    number: /^[0-9]+/,
    letters: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?: [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/,
};

export {
    validar,
    returnErrorCamposNoValidos,
    validarPostBody,
    expressValidationTyped,
    CustomMessage,
    ValidationsRegex,
};

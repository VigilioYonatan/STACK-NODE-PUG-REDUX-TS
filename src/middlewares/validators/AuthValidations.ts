// import { AuthRegisterUser } from "~/interfaces/Auth";
// import {
//     CustomMessage,
//     expressValidationTyped,
//     returnErrorCamposNoValidos,
//     validarPostBody,
// } from "./validarCampos";

// /* POST Auth Usuario Register */

// const validarRegisterValidation = expressValidationTyped<AuthRegisterUser>();
// const camposValidosAuthRegister: Array<keyof AuthRegisterUser> = [
//     "nombre",
//     "email",
//     "password",
//     "repeat_password",
// ];
// const validacionesAuthRegister = () => ({
//     validarBody: returnErrorCamposNoValidos(camposValidosAuthRegister),
//     validaciones: [
//         validarRegisterValidation
//             .body("nombre", CustomMessage.required)
//             .notEmpty()
//             .isLength({
//                 max: 10,
//                 min: 4,
//             })
//             .withMessage("Maximo 10 carácteres y minimo 4"),
//         validarPostBody("auth/registro", "usuario"),
//     ],
// });

// export { validacionesAuthRegister };

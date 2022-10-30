import jwt from "jsonwebtoken";
import Enviroments from "~/config/Enviroments";

const generarJWT = (value: Object, options: jwt.SignOptions): string =>
    jwt.sign(value, Enviroments.JWT_KEY as string, options);

const verifyJWT = <T>(
    value: string,
    options?: jwt.VerifyOptions & jwt.VerifyCallback<T>
) => jwt.verify(value, Enviroments.JWT_KEY as string, options);

export { generarJWT, verifyJWT };

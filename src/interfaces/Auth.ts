import { Usuario } from "./Usuario";

type AuthAddUsuario = Pick<Usuario, "nombre" | "apellido" | "imagen">;

export { type AuthAddUsuario };

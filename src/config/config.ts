import path from "path";

const pathUrl = (url: string) => path.join(__dirname, `/..${url}`);

export { pathUrl };

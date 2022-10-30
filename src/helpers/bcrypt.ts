import bcrypt from "bcryptjs";
const hashValue = (value: string): string => {
    const salt = bcrypt.genSaltSync(10);
    const hast = bcrypt.hashSync(value, salt);
    return hast;
};
const unHashValue = (body: string, hash: string): boolean => {
    const hast = bcrypt.compareSync(body, hash);
    return hast;
};

export { hashValue, unHashValue };

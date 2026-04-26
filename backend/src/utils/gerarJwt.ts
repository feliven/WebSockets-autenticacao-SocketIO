import jwt from "jsonwebtoken";

export const gerarJwt = (payload: object) => {
  return jwt.sign(payload, process.env.SEGREDO_JWT ?? "", { expiresIn: "1h" });
};

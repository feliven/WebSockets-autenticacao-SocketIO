import jwt from "jsonwebtoken";

const chaveSecreta = "chaveSuperSecreta";

export const gerarJwt = (payload: object) => {
  return jwt.sign(payload, chaveSecreta, { expiresIn: "1h" });
};

// const tokenVerificado = jwt.verify(token, chaveSecreta);

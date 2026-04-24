import { scryptSync, randomBytes } from "crypto";

export const criarHashGerarSalt = (senha: string) => {
  const salSenha = randomBytes(16).toString("hex");
  const hashSenha = scryptSync(senha, salSenha, 64).toString("hex");

  return { hashSenha, salSenha };
};

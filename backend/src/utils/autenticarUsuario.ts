import { scryptSync, timingSafeEqual } from "crypto";
import type { Usuario } from "../types.ts";

export const autenticarUsuario = ({ hashSenha, salSenha }: Usuario, senhaInformada: string) => {
  if (!hashSenha || !salSenha) {
    console.error("Hash e/ou salt nulo(s)");
    return;
  }

  const hashGerada = scryptSync(senhaInformada, salSenha, 64);
  const hashReal = Buffer.from(hashSenha, "hex");

  const hashesSaoIguais = timingSafeEqual(hashGerada, hashReal);

  return hashesSaoIguais;
};

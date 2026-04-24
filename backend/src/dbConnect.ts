import { Collection, MongoClient } from "mongodb";
import type { Cadastro, Documento } from "./types.ts";

const cliente = new MongoClient(process.env.DB_CONNECTION_STRING ?? "");

export let documentosColecao: Collection<Documento>;
export let usuariosColecao: Collection<Cadastro>;

try {
  await cliente.connect();
  const db = cliente.db("alurawebsockets");
  documentosColecao = db.collection<Documento>("documentos");
  usuariosColecao = db.collection<Cadastro>("usuarios");

  console.log("conexão ao db bem-sucedida");
} catch (error) {
  console.error(error);
}

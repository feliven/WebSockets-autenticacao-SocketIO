import { Collection, MongoClient } from "mongodb";
import type { Documento, Usuario } from "./types.ts";

const cliente = new MongoClient(process.env.DB_CONNECTION_STRING ?? "");

export let documentosColecao: Collection<Documento>;
export let usuariosColecao: Collection<Usuario>;

try {
  await cliente.connect();
  const db = cliente.db("alurawebsockets");
  documentosColecao = db.collection<Documento>("documentos");
  usuariosColecao = db.collection<Usuario>("usuarios");

  console.log("conexão ao db bem-sucedida");
} catch (error) {
  console.error(error);
}

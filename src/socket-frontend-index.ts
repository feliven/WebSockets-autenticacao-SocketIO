import type { ServerToClientEvents, ClientToServerEvents } from "./shared/types";
import { listarLinkDocumento, listarTodosOsDocumentos, removerLinkDocumento } from "./main";
import { io, Socket } from "socket.io-client";

export const enderecoApi = "http://localhost:3000";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(enderecoApi);

socket.emit("obter_documentos", (docs) => {
  console.log({ docs });
  listarTodosOsDocumentos(docs);
});

export const criarDocumento = (nomeDoc: string) => {
  socket.emit("criar_documento", nomeDoc);
};

socket.on("adicionar_doc_homepage", (doc) => {
  listarLinkDocumento(doc);
});

socket.on("remover_doc_homepage", (id) => {
  removerLinkDocumento(id);
});

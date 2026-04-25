import { listarLinkDocumento, listarTodosOsDocumentos, removerLinkDocumento } from "./main";
import { io } from "socket.io-client";
import { enderecoApi } from "./shared/enderecoApi";
import type { SocketFrontend } from "./shared/types";

const socket: SocketFrontend = io(enderecoApi);

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

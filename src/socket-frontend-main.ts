import {
  listarLinkDocumento,
  listarTodosOsDocumentos,
  removerLinkDocumento,
} from "./funcoes-interface-main";
import { io } from "socket.io-client";
import { enderecoApi, nomeCookie } from "./shared/variables";
import type { SocketFrontend } from "./shared/types";
import { obterCookie } from "./utils/cookies";

const socket: SocketFrontend = io(`${enderecoApi}/usuarios`, {
  auth: {
    token: await obterCookie(nomeCookie),
  },
});

socket.on("connect_error", (error: Error) => {
  console.error(error.message);
  window.location.assign("/src/pages/login/login.html");
});

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

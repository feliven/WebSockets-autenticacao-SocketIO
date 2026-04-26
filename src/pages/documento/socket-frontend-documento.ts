import { enderecoApi, nomeCookie } from "../../shared/variables";
import type { Documento, DocConteudoEId, SocketFrontend } from "../../shared/types";
import { atualizarTextoEditor, desabilitarEdicao } from "./documento";
import { io } from "socket.io-client";
import { obterCookie } from "../../utils/cookies";

const socket: SocketFrontend = io(`${enderecoApi}/usuarios`, {
  auth: {
    token: await obterCookie(nomeCookie),
  },
});

socket.on("connect_error", (error: Error) => {
  console.error(error.message);
  window.location.assign("src/pages/login/login.html");
});

export const selecionarDocumento = (
  idDocumento: string,
  callback: (
    res: Documento & {
      existe: boolean;
    },
  ) => void,
) => {
  socket.emit("selecionar_documento", idDocumento, (resposta) => {
    if (resposta.existe && resposta.conteudo) {
      atualizarTextoEditor(resposta.conteudo);
    }
    callback(resposta);
  });
};

export const emitirTextoDigitado = (dados: DocConteudoEId) => {
  socket.emit("texto_editor", dados);
};

export const excluirDocumento = (idDocumento: string) => {
  socket.emit("excluir_documento", idDocumento);
};

socket.on("texto_para_clients", (texto) => {
  atualizarTextoEditor(texto);
});

socket.on("documento_excluido", (idDocumentoExcluido) => {
  desabilitarEdicao(idDocumentoExcluido);
});

socket.on("disconnect", (motivo) => {
  console.log(`Servidor desconectado!
  Motivo: ${motivo}`);
});

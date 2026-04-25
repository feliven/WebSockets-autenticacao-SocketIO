import { enderecoApi } from "../../shared/enderecoApi";
import type {
  ServerToClientEvents,
  ClientToServerEvents,
  Documento,
  DocConteudoEId,
} from "../../shared/types";
import { atualizarTextoEditor, desabilitarEdicao } from "./documento";
import { io, Socket } from "socket.io-client";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(enderecoApi);

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

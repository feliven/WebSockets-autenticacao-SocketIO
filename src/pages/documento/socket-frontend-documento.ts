import { enderecoApi, nomeCookie } from "../../shared/variables";
import type {
  DocConteudoEId,
  SocketFrontend,
  RespostaDocumento,
  DadosEntrada,
  FullPayload,
} from "../../shared/types";
import {
  atualizarListaUsuarios,
  atualizarTextoEditor,
  desabilitarEdicao,
  idDocumento,
  tratarExibicaoDocumento,
} from "./funcoes-interface-documento";
import { io } from "socket.io-client";
import { obterCookie } from "../../utils/cookies";

const socket: SocketFrontend = io(`${enderecoApi}/usuarios`, {
  auth: {
    token: await obterCookie(nomeCookie),
  },
});

socket.on("connect_error", (error: Error) => {
  console.error(error.message);
  window.location.assign("/src/pages/login/login.html");
});

export const selecionarDocumento = (
  dadosEntrada: DadosEntrada,
  callback: (res: RespostaDocumento) => void,
) => {
  socket.emit("selecionar_documento", dadosEntrada, (resposta) => {
    if (resposta.existe && resposta.conteudo) {
      atualizarTextoEditor(resposta.conteudo);
    }
    callback(resposta);
  });
};

socket.on("usuario_ja_no_documento", () => {
  alert("Você já abriu este documento em outra página.");
  window.location.assign("/");
});

socket.on("usuarios_no_documento", (listaUsuarios) => {
  atualizarListaUsuarios(listaUsuarios);
});

socket.on("autorizacao_sucesso", (payload) => {
  tratarAutorizacaoSucesso(payload);
});

const tratarAutorizacaoSucesso = (payload: FullPayload) => {
  selecionarDocumento({ idDocumento, nomeUsuario: payload.nome }, tratarExibicaoDocumento);
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

import type { FullPayload, RespostaDocumento } from "../../shared/types";
import {
  emitirTextoDigitado,
  excluirDocumento,
  selecionarDocumento,
} from "./socket-frontend-documento";

const parametros = new URLSearchParams(window.location.search);
const idDocumento = parametros.get("id") ?? "";

const elemTituloDocumento = document.getElementById(
  "titulo-documento",
) as HTMLHeadingElement | null;
const elemEditorTexto = document.getElementById("editor-texto") as HTMLTextAreaElement | null;
const elemBotaoExcluir = document.getElementById("excluir-documento") as HTMLButtonElement | null;

const timeoutAindaCarregando = setTimeout(() => {
  if (elemTituloDocumento) {
    elemTituloDocumento.textContent = "Carregando...";
  } else {
    console.error("elemTituloDocumento não existe");
  }
}, 1000);

const timeoutMsgErro = setTimeout(() => {
  if (elemTituloDocumento) {
    elemTituloDocumento.textContent = "Erro ao carregar. Tente novamente.";
  } else {
    console.error("elemTituloDocumento não existe");
  }
}, 7000);

export const tratarAutorizacaoSucesso = (payload: FullPayload) => {
  selecionarDocumento({ idDocumento, nomeUsuario: payload.nome }, tratarExibicaoDocumento);
};

const tratarExibicaoDocumento = (resposta: RespostaDocumento) => {
  if (!elemTituloDocumento || !elemEditorTexto || !elemBotaoExcluir) {
    console.error("elemTituloDocumento, elemEditorTexto e/ou elemBotaoExcluir não existe(m)");
    return;
  }

  if (!resposta.existe) {
    elemTituloDocumento.textContent = "(Documento inexistente)";
    elemEditorTexto.disabled = true;
    elemEditorTexto.placeholder = "Documento não existe ou foi removido.";

    elemBotaoExcluir.disabled = true;
  } else {
    clearTimeout(timeoutAindaCarregando);
    clearTimeout(timeoutMsgErro);
    elemTituloDocumento.textContent = resposta.nome || "(Documento sem título)";

    elemEditorTexto.disabled = false;
    elemEditorTexto.value = resposta.conteudo ?? "";
    elemEditorTexto.placeholder = "Comece a digitar...";

    elemBotaoExcluir.disabled = false;
  }
};

elemEditorTexto?.addEventListener("keyup", (e) => {
  if (elemEditorTexto.disabled) return;

  const textoDigitado = (e.target as HTMLTextAreaElement).value;
  const doc = { _id: idDocumento, conteudo: textoDigitado };
  emitirTextoDigitado(doc);
});

export const atualizarTextoEditor = (texto: string) => {
  if (elemEditorTexto) {
    elemEditorTexto.value = texto;
  } else {
    console.error("elemEditorTexto não existe");
  }
};

const elemUsuariosConectados = document.getElementById(
  "usuarios-conectados",
) as HTMLUListElement | null;
const wrapperListaUsuariosVazia = document.getElementById(
  "wrapper-lista-usuarios-vazia",
) as HTMLDivElement | null;
const wrapperListaUsuariosPopulada = document.getElementById(
  "wrapper-lista-usuarios-populada",
) as HTMLDivElement | null;

export const atualizarListaUsuarios = (listaUsuarios: string[]) => {
  if (!elemUsuariosConectados || !wrapperListaUsuariosVazia || !wrapperListaUsuariosPopulada) {
    console.error(
      "elemUsuariosConectados, wrapperListaUsuariosVazia e/ou wrapperListaUsuariosPopulada não existe(m)",
    );
    return;
  }

  if (listaUsuarios.length === 0) {
    wrapperListaUsuariosVazia.hidden = false;
    wrapperListaUsuariosPopulada.hidden = true;
    return;
  }

  wrapperListaUsuariosVazia.hidden = true;
  wrapperListaUsuariosPopulada.hidden = false;

  for (let i = 0; i < listaUsuarios.length; i++) {
    const usuarioListado = document.createElement("li");
    usuarioListado.classList.add("list-group-item");
    usuarioListado.textContent = listaUsuarios[i];

    elemUsuariosConectados.appendChild(usuarioListado);
  }
};

elemBotaoExcluir?.addEventListener("click", () => {
  excluirDocumento(idDocumento);
  window.location.assign("/");
});

export const desabilitarEdicao = (idDocumentoExcluido: string) => {
  if (elemBotaoExcluir) {
    elemBotaoExcluir.disabled = true;
  } else {
    console.error("elemBotaoExcluir não existe");
  }

  if (!elemEditorTexto) {
    console.error("elemEditorTexto não existe");
    return;
  }

  if (idDocumentoExcluido === idDocumento) {
    elemEditorTexto.disabled = true;
    elemEditorTexto.placeholder = "Este documento foi excluído.";
    alert("Este documento foi excluído por outro usuário!");
  }
};

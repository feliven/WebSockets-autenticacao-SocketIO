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

selecionarDocumento(idDocumento, (resposta) => {
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
});

elemEditorTexto?.addEventListener("keyup", (e) => {
  if (elemEditorTexto.disabled) return;

  const textoDigitado = (e.target as HTMLTextAreaElement).value;
  const doc = { _id: idDocumento, conteudo: textoDigitado };
  emitirTextoDigitado(doc);
});

elemBotaoExcluir?.addEventListener("click", () => {
  excluirDocumento(idDocumento);
  window.location.assign("/");
});

export const atualizarTextoEditor = (texto: string) => {
  if (elemEditorTexto) {
    elemEditorTexto.value = texto;
  } else {
    console.error("elemEditorTexto não existe");
  }
};

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

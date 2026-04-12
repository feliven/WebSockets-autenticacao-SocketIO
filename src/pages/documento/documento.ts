import {
  emitirTextoDigitado,
  excluirDocumento,
  selecionarDocumento,
} from "./socket-frontend-documento";

const parametros = new URLSearchParams(window.location.search);
const idDocumento = parametros.get("id") ?? "";

const elemTituloDocumento = document.getElementById("titulo-documento") as HTMLHeadingElement;
const elemEditorTexto = document.getElementById("editor-texto") as HTMLTextAreaElement;
const elemBotaoExcluir = document.getElementById("excluir-documento") as HTMLButtonElement;

const timeoutAindaCarregando = setTimeout(() => {
  elemTituloDocumento.textContent = "Aguarde...";
}, 1000);

const timeoutMsgErro = setTimeout(() => {
  elemTituloDocumento.textContent = "Erro ao carregar. Tente novamente.";
}, 7000);

selecionarDocumento(idDocumento, (resposta) => {
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

elemEditorTexto.addEventListener("keyup", (e) => {
  if (elemEditorTexto.disabled) return;

  const textoDigitado = (e.target as HTMLTextAreaElement).value;
  const doc = { _id: idDocumento, conteudo: textoDigitado };
  emitirTextoDigitado(doc);
});

elemBotaoExcluir.addEventListener("click", () => {
  excluirDocumento(idDocumento);
  window.location.assign("../home/home.html");
});

export const atualizarTextoEditor = (texto: string) => {
  elemEditorTexto.value = texto;
};

export const desabilitarEdicao = (idDocumentoExcluido: string) => {
  elemBotaoExcluir.disabled = true;

  if (idDocumentoExcluido === idDocumento) {
    elemEditorTexto.disabled = true;
    elemEditorTexto.placeholder = "Este documento foi excluído.";
    alert("Este documento foi excluído por outro usuário!");
  }
};

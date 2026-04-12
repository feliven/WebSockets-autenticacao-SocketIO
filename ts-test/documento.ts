import { emitirTextoDigitado, selecionarDocumento } from "./socket-frontend.js";

const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get("nome");
if (nomeDocumento) {
  selecionarDocumento(nomeDocumento);
}

const elemTituloDocumento = document.getElementById(
  "titulo-documento",
) as HTMLHeadingElement | null;
if (elemTituloDocumento) {
  elemTituloDocumento.textContent = nomeDocumento || "Documento sem título";
}

const elemEditorTexto = document.getElementById("editor-texto") as HTMLTextAreaElement | null;

elemEditorTexto?.addEventListener("keyup", (event) => {
  const textoDigitado = (event.target as HTMLTextAreaElement).value;

  emitirTextoDigitado({
    texto: textoDigitado,
    nomeDocumento: nomeDocumento ?? "",
  });
});

export const atualizarTextoEditor = (texto: string) => {
  if (elemEditorTexto) {
    elemEditorTexto.value = texto;
  }
};

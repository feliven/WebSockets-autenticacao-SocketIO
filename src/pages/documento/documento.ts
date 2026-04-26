import { elemBotaoExcluir, elemEditorTexto, idDocumento } from "./funcoes-interface-documento";
import { emitirTextoDigitado, excluirDocumento } from "./socket-frontend-documento";

elemEditorTexto?.addEventListener("keyup", (e) => {
  if (elemEditorTexto?.disabled) return;

  const textoDigitado = (e.target as HTMLTextAreaElement).value;
  const doc = { _id: idDocumento, conteudo: textoDigitado };
  emitirTextoDigitado(doc);
});

elemBotaoExcluir?.addEventListener("click", () => {
  excluirDocumento(idDocumento);
  window.location.assign("/");
});

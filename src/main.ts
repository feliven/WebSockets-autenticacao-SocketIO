import type { DocNomeEId, DocumentoComId } from "./shared/types";
import { criarDocumento } from "./socket-frontend-index";

const elemListaDocumentos = document.getElementById("lista-documentos") as HTMLDivElement;
const elemListaVazia = document.getElementById("lista-documentos-vazia") as HTMLDivElement;
const elemTextoListaVazia = document.getElementById(
  "texto-lista-documentos-vazia",
) as HTMLParagraphElement;
const elemFormNovoDocumento = document.getElementById("form-adiciona-documento") as HTMLFormElement;

setTimeout(() => {
  elemTextoListaVazia.textContent = "Aguarde...";
}, 0);

const timeoutMsgErro = setTimeout(() => {
  elemTextoListaVazia.textContent = "Erro ao carregar documentos. Tente novamente.";
}, 7000);

export const listarLinkDocumento = (doc: DocNomeEId) => {
  elemListaVazia.remove();

  const nomeArquivo = doc.nome;
  const idArquivo = doc._id;

  // <a href="documento.html?nome=JavaScript" class="list-group-item list-group-item-action"> JavaScript </a>

  const linkDocumento = document.createElement("a");
  linkDocumento.textContent = nomeArquivo;
  linkDocumento.href = `/src/pages/documento/documento.html?id=${idArquivo}`;
  linkDocumento.classList.add("list-group-item", "list-group-item-action");
  linkDocumento.id = idArquivo;

  elemListaDocumentos.appendChild(linkDocumento);
};

export const listarTodosOsDocumentos = (docs: DocumentoComId[]) => {
  if (!docs.length) {
    elemListaDocumentos.textContent = "Não foram encontrados documentos para exibir.";
    clearTimeout(timeoutMsgErro);
    return;
  }

  docs.forEach((doc) => {
    listarLinkDocumento(doc);
  });

  elemFormNovoDocumento.hidden = false;
};

export const removerLinkDocumento = (id: string) => {
  const linkDocumento = document.getElementById(id);
  linkDocumento?.remove();
};

const elemNomeNovoDocumento = document.getElementById("input-documento") as HTMLInputElement;

elemFormNovoDocumento.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const nomeNovoDoc = elemNomeNovoDocumento.value;
  criarDocumento(nomeNovoDoc);
  elemNomeNovoDocumento.value = "";
});

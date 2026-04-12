import type { DocNomeEId, DocumentoComId } from "../../shared/types";
import { criarDocumento } from "./socket-frontend-index";

const elemListaDocumentos = document.getElementById("lista-documentos") as HTMLDivElement;
const elemListaVazia = document.getElementById("lista-documentos-vazia") as HTMLDivElement;

const timeoutAindaCarregando = setTimeout(() => {
  elemListaVazia.textContent = "Aguarde...";
}, 3000);

const timeoutMsgErro = setTimeout(() => {
  elemListaVazia.textContent = "Erro ao carregar documentos. Tente novamente.";
}, 7000);

export const listarLinkDocumento = (doc: DocNomeEId) => {
  elemListaVazia.remove();

  const nomeArquivo = doc.nome;
  const idArquivo = doc._id;

  // <a href="documento.html?nome=JavaScript" class="list-group-item list-group-item-action"> JavaScript </a>

  const linkDocumento = document.createElement("a");
  linkDocumento.textContent = nomeArquivo;
  linkDocumento.href = `../documento/documento.html?id=${idArquivo}`;
  linkDocumento.classList.add("list-group-item", "list-group-item-action");
  linkDocumento.id = idArquivo;

  elemListaDocumentos.appendChild(linkDocumento);
};

export const listarTodosOsDocumentos = (docs: DocumentoComId[]) => {
  if (!docs.length) {
    elemListaVazia.textContent = "Não foram encontrados documentos para exibir.";
    clearTimeout(timeoutAindaCarregando);
    clearTimeout(timeoutMsgErro);
    return;
  }

  docs.forEach((doc) => {
    listarLinkDocumento(doc);
  });
};

export const removerLinkDocumento = (id: string) => {
  const linkDocumento = document.getElementById(id);
  linkDocumento?.remove();
};

const elemNomeNovoDocumento = document.getElementById("input-documento") as HTMLInputElement;
const elemFormNovoDocumento = document.getElementById("form-adiciona-documento") as HTMLFormElement;

elemFormNovoDocumento.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const nomeNovoDoc = elemNomeNovoDocumento.value;
  criarDocumento(nomeNovoDoc);
  elemNomeNovoDocumento.value = "";
});

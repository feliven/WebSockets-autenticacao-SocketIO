import type { DocNomeEId, DocumentoComId } from "./shared/types";
import { nomeCookie } from "./shared/variables";
import { obterCookie } from "./utils/cookies";

const tokenJwt = await obterCookie(nomeCookie);
console.log({ tokenJwt });

const elemListaDocumentos = document.getElementById("lista-documentos") as HTMLDivElement | null;
const elemListaVazia = document.getElementById("lista-documentos-vazia") as HTMLDivElement | null;
const elemSpinner = document.getElementById("spinner") as HTMLDivElement | null;
const elemTextoListaVazia = document.getElementById(
  "texto-lista-documentos-vazia",
) as HTMLParagraphElement | null;
export const elemFormNovoDocumento = document.getElementById(
  "form-adiciona-documento",
) as HTMLFormElement | null;
export const elemNomeNovoDocumento = document.getElementById(
  "input-documento",
) as HTMLInputElement | null;
export const elemBotaoLogout = document.getElementById("botao-logout") as HTMLButtonElement | null;

setTimeout(() => {
  if (elemTextoListaVazia) {
    elemTextoListaVazia.textContent = "Aguarde...";
  } else {
    console.error("elemTextoListaVazia não existe");
  }
}, 0);

const timeoutMsgErro = setTimeout(() => {
  if (elemSpinner) {
    elemSpinner.hidden = true;
  } else {
    console.error("elemSpinner não existe");
  }

  if (elemTextoListaVazia) {
    elemTextoListaVazia.textContent = "Erro ao carregar documentos. Tente novamente.";
  } else {
    console.error("elemTextoListaVazia não existe");
  }
}, 7000);

export const listarLinkDocumento = (doc: DocNomeEId) => {
  if (elemListaVazia) {
    elemListaVazia.remove();
  }

  const nomeArquivo = doc.nome;
  const idArquivo = doc._id;

  // <a href="documento.html?nome=JavaScript" class="list-group-item list-group-item-action"> JavaScript </a>

  if (!elemListaDocumentos) {
    console.error("elemListaDocumentos não existe");
    return;
  }

  const linkDocumento = document.createElement("a");
  linkDocumento.textContent = nomeArquivo;
  linkDocumento.href = `/src/pages/documento/documento.html?id=${idArquivo}`;
  linkDocumento.classList.add("list-group-item", "list-group-item-action");
  linkDocumento.id = idArquivo;

  elemListaDocumentos.appendChild(linkDocumento);
};

export const listarTodosOsDocumentos = (docs: DocumentoComId[]) => {
  if (!docs.length && elemListaDocumentos) {
    elemListaDocumentos.textContent = "Não foram encontrados documentos para exibir.";
    clearTimeout(timeoutMsgErro);
    return;
  }

  docs.forEach((doc) => {
    listarLinkDocumento(doc);
  });

  if (elemFormNovoDocumento) {
    elemFormNovoDocumento.hidden = false;
  }
};

export const removerLinkDocumento = (id: string) => {
  const linkDocumento = document.getElementById(id);
  linkDocumento?.remove();
};

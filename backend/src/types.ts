import type { WithId } from "mongodb";

export type Documento = {
  nome: string | null;
  conteudo: string | null;
};

export type DocumentoComId = WithId<Documento>;
export type DocConteudoEId = WithId<Omit<Documento, "nome">>;
export type DocNomeEId = WithId<Omit<Documento, "conteudo">>;

export type ServerToClientEvents = {
  texto_para_clients: (texto: string) => void;
  documento_excluido: (idDocumento: string) => void;
  adicionar_doc_homepage: (doc: DocNomeEId) => void;
  remover_doc_homepage: (idDocumento: string) => void;
};

export type ClientToServerEvents = {
  criar_documento: (nomeDocumento: string) => void;
  excluir_documento: (idDocumento: string) => void;
  obter_documentos: (callback: (retornarDocs: DocumentoComId[]) => void) => void;
  selecionar_documento: (
    idDocumento: string,
    callback: (resposta: Documento & { existe: boolean }) => void,
  ) => void;
  texto_editor: (dados: DocConteudoEId) => void;
};

export type InterServerEvents = {
  ping: () => void;
};

export type SocketData = {
  name: string;
  age: number;
};

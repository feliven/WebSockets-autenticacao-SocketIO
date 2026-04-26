import type { WithId } from "mongodb";
import type { Namespace, Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";

export type SocketBackend = Socket<ClientToServerEvents, ServerToClientEvents>;
export type IoServer = Server<ClientToServerEvents, ServerToClientEvents>;
export type IoNamespace = Namespace<ClientToServerEvents, ServerToClientEvents>;

export type MiddlewareFunction = Parameters<Server["use"]>[0];

export type MyPayload = { nome: string };
type JwtPayload = jwt.JwtPayload;
export type FullPayload = MyPayload & JwtPayload;

// types no frontend e backend devem ser iguais a partir deste ponto

export type Documento = {
  nome: string | null;
  conteudo: string | null;
};

export type Cadastro = {
  usuario: string | null;
  senha: string | null;
};

export type Usuario = {
  usuario: string | null;
  hashSenha: string | null;
  salSenha: string | null;
};

export type DocumentoComId = WithId<Documento>;
export type DocConteudoEId = WithId<Omit<Documento, "nome">>;
export type DocNomeEId = WithId<Omit<Documento, "conteudo">>;
export type RespostaDocumento = Documento & { existe: boolean };
export type DadosEntrada = { idDocumento: string; nomeUsuario: string };

export type ServerToClientEvents = {
  texto_para_clients: (texto: string) => void;
  documento_excluido: (idDocumento: string) => void;
  adicionar_doc_homepage: (doc: DocNomeEId) => void;
  remover_doc_homepage: (idDocumento: string) => void;
  cadastro_sucesso: () => void;
  cadastro_erro: () => void;
  usuario_ja_existe: () => void;
  autenticacao_sucesso: (tokenJwt: string) => void;
  autenticacao_senha_incorreta: () => void;
  autenticacao_erro: () => void;
  usuario_nao_encontrado: () => void;
  usuario_senha_nao_informados: () => void;
  autorizacao_sucesso: (payload: FullPayload) => void;
  usuarios_no_documento: (listaUsuarios: string[]) => void;
  usuario_ja_no_documento: () => void;
};

export type ClientToServerEvents = {
  criar_documento: (nomeDocumento: string) => void;
  excluir_documento: (idDocumento: string) => void;
  obter_documentos: (callback: (retornarDocs: DocumentoComId[]) => void) => void;
  selecionar_documento: (
    dadosEntrada: DadosEntrada,
    callback: (resposta: RespostaDocumento) => void,
  ) => void;
  texto_editor: (dados: DocConteudoEId) => void;
  cadastrar_usuario: (dados: Cadastro) => void;
  autenticar_usuario: (dados: Cadastro) => void;
};

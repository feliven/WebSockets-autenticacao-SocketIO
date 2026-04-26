import type { DadosEntrada } from "../types.ts";

const conexoesDocumentos: DadosEntrada[] = [];

export const adicionarConexao = (dados: DadosEntrada) => {
  conexoesDocumentos.push(dados);

  console.log({ conexoesDocumentos });
};

export const obterUsuariosNoDocumento = (idDocumento: string) => {
  const listaConexoesNoDocumento = conexoesDocumentos.filter((conexao) => {
    return conexao.idDocumento === idDocumento;
  });

  const listaUsuariosNoDocumento = listaConexoesNoDocumento.map((conexao) => {
    return conexao.nomeUsuario;
  });

  return listaUsuariosNoDocumento;
};

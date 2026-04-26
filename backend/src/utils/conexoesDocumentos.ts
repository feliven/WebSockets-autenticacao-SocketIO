import type { DadosEntrada } from "../types.ts";

const conexoesDocumentos: DadosEntrada[] = [];

export const adicionarConexao = (dados: DadosEntrada) => {
  conexoesDocumentos.push(dados);

  console.log({ conexoesDocumentos });
};

export const encontrarConexao = (dadosConexao: DadosEntrada) => {
  const conexaoEncontrada = conexoesDocumentos.find((dado) => {
    return (
      dado.idDocumento === dadosConexao.idDocumento && dado.nomeUsuario === dadosConexao.nomeUsuario
    );
  });

  if (!conexaoEncontrada) {
    console.error("Conexão não encontrada");
  }

  return conexaoEncontrada;
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

export const removerConexao = (dadosConexao: DadosEntrada) => {
  const indiceConexao = conexoesDocumentos.findIndex((dado) => {
    return (
      dado.idDocumento === dadosConexao.idDocumento && dado.nomeUsuario === dadosConexao.nomeUsuario
    );
  });

  if (indiceConexao > -1) {
    conexoesDocumentos.splice(indiceConexao, 1);

    console.log({ conexoesDocumentos });
  } else {
    console.error("conexão não encontrada em conexoesDocumentos");
  }
};

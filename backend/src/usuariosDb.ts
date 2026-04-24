import { ObjectId } from "mongodb";
import { usuariosColecao } from "./dbConnect.ts";
import type { Cadastro } from "./types.ts";

export const criarUsuario = (dados: Cadastro) => {
  try {
    const usuarioCriado = usuariosColecao.insertOne({ usuario: dados.usuario, senha: dados.senha });
    return usuarioCriado;
  } catch (error) {
    console.error(error);
  }
};

export const obterUsuarios = () => {
  try {
    const users = usuariosColecao.find().toArray();
    return users;
  } catch (error) {
    console.error(error);
  }
};

export const encontrarUsuario = (idUsuario: string) => {
  try {
    const usuarioProcurado = usuariosColecao.findOne({ _id: new ObjectId(idUsuario) });
    return usuarioProcurado;
  } catch (error) {
    console.error(error);
  }
};

export const atualizarUsuario = (idUsuario: string, nomeUsuario: string) => {
  try {
    const resultadoAtualizacao = usuariosColecao.updateOne(
      {
        _id: new ObjectId(idUsuario),
      },
      { $set: { usuario: nomeUsuario } },
    );

    return resultadoAtualizacao;
  } catch (error) {
    console.error(error);
  }
};

export const excluirUsuario = (idUsuario: string) => {
  try {
    const usuarioExcluido = usuariosColecao.deleteOne({ _id: new ObjectId(idUsuario) });
    return usuarioExcluido;
  } catch (error) {
    console.error(error);
  }
};

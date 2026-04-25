import { ObjectId } from "mongodb";
import { usuariosColecao } from "./dbConnect.ts";
import type { Cadastro } from "./types.ts";
import { criarHashGerarSalt } from "./utils/criaHashSal.ts";

export const criarUsuario = ({ usuario, senha }: Cadastro) => {
  if (!usuario || !senha) {
    console.error("Usuário e/ou senha não informado(s)");
    return;
  }

  const { hashSenha, salSenha } = criarHashGerarSalt(senha);

  try {
    const usuarioCriado = usuariosColecao.insertOne({ usuario, hashSenha, salSenha });
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

export const encontrarUsuarioPorId = (idUsuario: string) => {
  try {
    const usuarioProcurado = usuariosColecao.findOne({ _id: new ObjectId(idUsuario) });
    return usuarioProcurado;
  } catch (error) {
    console.error(error);
  }
};

export const encontrarUsuarioPorNome = (nomeUsuario: string) => {
  try {
    const usuarioProcurado = usuariosColecao.findOne({ usuario: nomeUsuario });
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

import { ObjectId } from "mongodb";
import { documentosColecao } from "./dbConnect.ts";

export const criarDocumento = (nomeDocumento: string) => {
  try {
    const docCriado = documentosColecao.insertOne({ nome: nomeDocumento, conteudo: "" });
    return docCriado;
  } catch (error) {
    console.error(error);
  }
};

export const obterDocumentos = () => {
  try {
    const docs = documentosColecao.find().toArray();
    return docs;
  } catch (error) {
    console.error(error);
  }
};

export const encontrarDocumento = (idDocumento: string) => {
  try {
    const docProcurado = documentosColecao.findOne({ _id: new ObjectId(idDocumento) });

    return docProcurado;
  } catch (error) {
    console.error(error);
  }
};

export const atualizarDocumento = (idDocumento: string, texto: string) => {
  try {
    const resultadoAtualizacao = documentosColecao.updateOne(
      {
        _id: new ObjectId(idDocumento),
      },
      { $set: { conteudo: texto } },
    );

    return resultadoAtualizacao;
  } catch (error) {
    console.error(error);
  }
};

export const excluirDocumento = (idDocumento: string) => {
  try {
    const docExcluido = documentosColecao.deleteOne({ _id: new ObjectId(idDocumento) });
    return docExcluido;
  } catch (error) {
    console.error(error);
  }
};

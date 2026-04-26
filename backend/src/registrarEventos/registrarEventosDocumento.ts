import { atualizarDocumento, encontrarDocumento, excluirDocumento } from "../documentosDb.ts";
import type { SocketBackend, IoNamespace } from "../types.ts";
import { adicionarConexao, obterUsuariosNoDocumento } from "../utils/conexoesDocumentos.ts";

export const registrarEventosDocumento = (socket: SocketBackend, io: IoNamespace) => {
  socket.on("excluir_documento", async (idDocumento) => {
    const resultado = await excluirDocumento(idDocumento);

    if (resultado?.deletedCount) {
      io.emit("documento_excluido", idDocumento);
      io.emit("remover_doc_homepage", idDocumento);
    }
  });

  socket.on("selecionar_documento", async (dadosEntrada, retornarDoc) => {
    console.log("dadosEntrada.nomeUsuario:", dadosEntrada.nomeUsuario);

    const doc = await encontrarDocumento(dadosEntrada.idDocumento);

    if (doc) {
      void socket.join(doc._id.toString());

      adicionarConexao(dadosEntrada);

      const usuariosNoDocumento = obterUsuariosNoDocumento(dadosEntrada.idDocumento);

      console.log({ usuariosNoDocumento });

      retornarDoc({ ...doc, existe: true });
    } else {
      retornarDoc({ existe: false, nome: null, conteudo: null });
    }
  });

  socket.on("texto_editor", async ({ _id, conteudo }) => {
    if (!conteudo) return;

    const resultadoAtualizacao = await atualizarDocumento(_id.toString(), conteudo);

    if (resultadoAtualizacao?.modifiedCount) {
      socket.to(_id.toString()).emit("texto_para_clients", conteudo);
    }
  });
};

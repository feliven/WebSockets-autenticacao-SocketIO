import { atualizarDocumento, encontrarDocumento, excluirDocumento } from "../documentosDb.ts";
import type { SocketBackend, IoServer } from "../types.ts";

export const registrarEventosDocumento = (socket: SocketBackend, io: IoServer) => {
  socket.on("excluir_documento", async (idDocumento) => {
    const resultado = await excluirDocumento(idDocumento);

    if (resultado?.deletedCount) {
      io.emit("documento_excluido", idDocumento);
      io.emit("remover_doc_homepage", idDocumento);
    }
  });

  socket.on("selecionar_documento", async (idDocumento, retornarDoc) => {
    const doc = await encontrarDocumento(idDocumento);

    if (doc) {
      void socket.join(doc._id.toString());
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

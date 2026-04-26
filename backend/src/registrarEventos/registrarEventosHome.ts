import { criarDocumento, obterDocumentos } from "../documentosDb.ts";
import type { SocketBackend, IoNamespace } from "../types.ts";

export const registrarEventosHome = (socket: SocketBackend, io: IoNamespace) => {
  console.log("um usuário se conectou", socket.id);

  socket.on("obter_documentos", async (retornarDocs) => {
    const docs = await obterDocumentos();

    if (docs) {
      retornarDocs(docs);
    }
  });

  socket.on("criar_documento", async (nomeDocumento) => {
    const resultado = await criarDocumento(nomeDocumento);

    if (resultado?.insertedId) {
      const idResultado = resultado.insertedId;
      const novoDoc = { _id: idResultado, nome: nomeDocumento };
      io.emit("adicionar_doc_homepage", novoDoc);
    }
  });
};

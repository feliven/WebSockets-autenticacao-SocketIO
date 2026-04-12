import io from "./Server.ts";
import {
  atualizarDocumento,
  criarDocumento,
  encontrarDocumento,
  excluirDocumento,
  obterDocumentos,
} from "./documentosDb.ts";

io.on("connection", (socket) => {
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

  socket.on("disconnect", (motivo) => {
    console.log(`Cliente "${socket.id}" desconectado!
    Motivo: ${motivo}`);
  });
});

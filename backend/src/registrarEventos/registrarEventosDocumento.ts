import { atualizarDocumento, encontrarDocumento, excluirDocumento } from "../documentosDb.ts";
import type { SocketBackend, IoNamespace } from "../types.ts";
import {
  adicionarConexao,
  obterUsuariosNoDocumento,
  removerConexao,
} from "../utils/conexoesDocumentos.ts";

export const registrarEventosDocumento = (socket: SocketBackend, io: IoNamespace) => {
  socket.on("selecionar_documento", async (dadosEntrada, retornarDoc) => {
    console.log("dadosEntrada.nomeUsuario:", dadosEntrada.nomeUsuario);

    const doc = await encontrarDocumento(dadosEntrada.idDocumento);

    if (doc) {
      void socket.join(doc._id.toString());
      retornarDoc({ ...doc, existe: true });

      adicionarConexao(dadosEntrada);
      const usuariosNoDocumento = obterUsuariosNoDocumento(dadosEntrada.idDocumento);

      console.log("selecionar_documento", { usuariosNoDocumento });

      io.to(dadosEntrada.idDocumento).emit("usuarios_no_documento", usuariosNoDocumento);
    } else {
      retornarDoc({ existe: false, nome: null, conteudo: null });
    }

    socket.on("texto_editor", async ({ _id, conteudo }) => {
      if (!conteudo) return;

      const resultadoAtualizacao = await atualizarDocumento(_id.toString(), conteudo);

      if (resultadoAtualizacao?.modifiedCount) {
        socket.to(_id.toString()).emit("texto_para_clients", conteudo);
      }
    });

    socket.on("excluir_documento", async (idDocumento) => {
      const resultado = await excluirDocumento(idDocumento);

      if (resultado?.deletedCount) {
        io.emit("documento_excluido", idDocumento);
        io.emit("remover_doc_homepage", idDocumento);
      }
    });

    socket.on("disconnect", () => {
      console.log(`Cliente ${socket.id} desconectado`);

      removerConexao(dadosEntrada);

      const usuariosNoDocumento = obterUsuariosNoDocumento(dadosEntrada.idDocumento);

      console.log("disconnect", { usuariosNoDocumento });

      io.to(dadosEntrada.idDocumento).emit("usuarios_no_documento", usuariosNoDocumento);
    });
  });
};

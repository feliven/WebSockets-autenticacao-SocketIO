import type { SocketBackend } from "../types.ts";
import { criarUsuario, encontrarUsuarioPorNome } from "../usuariosDb.ts";

export const registrarEventosCadastro = (socket: SocketBackend) => {
  socket.on("cadastrar_usuario", async (dados) => {
    if (!dados.usuario) {
      return;
    }

    const usuarioJaExiste = Boolean(await encontrarUsuarioPorNome(dados.usuario));

    if (usuarioJaExiste) {
      socket.emit("usuario_ja_existe");
      return;
    }

    const resultado = await criarUsuario(dados);

    if (resultado?.acknowledged) {
      socket.emit("cadastro_sucesso");
    } else {
      socket.emit("cadastro_erro");
    }
  });
};

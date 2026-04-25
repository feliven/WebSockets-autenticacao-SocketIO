import type { Socket } from "socket.io";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "../types.ts";
import { autenticarUsuario, encontrarUsuarioPorNome } from "../usuariosDb.ts";

export const registrarEventosLogin = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>,
) => {
  socket.on("autenticar_usuario", async ({ usuario, senha }) => {
    if (!usuario || !senha) {
      socket.emit("usuario_senha_nao_informados");
      console.error("Usuário e/ou senha não informado(s)");
      return;
    }

    const usuarioEncontrado = await encontrarUsuarioPorNome(usuario);

    if (!usuarioEncontrado) {
      socket.emit("usuario_nao_encontrado");
      console.error("Usuário não encontrado");
      return;
    }

    const resultado = autenticarUsuario(usuarioEncontrado, senha);

    if (resultado === true) {
      socket.emit("autenticacao_sucesso");
    } else if (resultado === false) {
      socket.emit("autenticacao_senha_incorreta");
      console.error("Senha incorreta");
    } else {
      socket.emit("autenticacao_erro");
      console.error("Erro ao fazer login");
    }
  });
};

import type { MyPayload, SocketBackend } from "../types.ts";
import { encontrarUsuarioPorNome } from "../usuariosDb.ts";
import { autenticarUsuario } from "../utils/autenticarUsuario.ts";
import { gerarJwt } from "../utils/gerarJwt.ts";

export const registrarEventosLogin = (socket: SocketBackend) => {
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
      const payload: MyPayload = { nome: usuarioEncontrado.usuario ?? "ERRO NO TOKEN" };

      const tokenJwt = gerarJwt(payload);

      socket.emit("autenticacao_sucesso", tokenJwt);
    } else if (resultado === false) {
      socket.emit("autenticacao_senha_incorreta");
      console.error("Senha incorreta");
    } else {
      socket.emit("autenticacao_erro");
      console.error("Erro ao fazer login");
    }
  });
};

import { io } from "socket.io-client";
import type { Cadastro, SocketFrontend } from "../../shared/types";
import { enderecoApi } from "../../shared/enderecoApi";
import { definirCookie } from "../../utils/cookies";

const socket: SocketFrontend = io(enderecoApi);

export const emitirAutenticacaoUsuario = (dados: Cadastro) => {
  socket.emit("autenticar_usuario", dados);
};

socket.on("autenticacao_sucesso", (tokenJwt) => {
  void definirCookie("tokenJwt", tokenJwt);
  window.location.assign("/");
});

socket.on("autenticacao_senha_incorreta", () => {
  alert("Senha incorreta!");
});

socket.on("autenticacao_erro", () => {
  alert("Erro ao fazer login. Tente novamente.");
});

socket.on("usuario_nao_encontrado", () => {
  alert("Usuário não foi encontrado.");
});

socket.on("usuario_senha_nao_informados", () => {
  alert("Usuário e/ou senha não informado(s).");
});

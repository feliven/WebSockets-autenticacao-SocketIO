import { io, Socket } from "socket.io-client";
import type { ServerToClientEvents, ClientToServerEvents, Cadastro } from "../../shared/types";
import { enderecoApi } from "../../socket-frontend-index";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(enderecoApi);

export const emitirCadastroUsuario = (dados: Cadastro) => {
  socket.emit("cadastrar_usuario", dados);
};

socket.on("cadastro_sucesso", () => {
  console.log("Cadastro realizado com sucesso");
});

socket.on("cadastro_erro", () => {
  console.error("Erro no cadastro");
});

import { io, Socket } from "socket.io-client";
import type { ServerToClientEvents, ClientToServerEvents, Cadastro } from "../../shared/types";
import { enderecoApi } from "../../socket-frontend-index";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(enderecoApi);

export const emitirCadastroUsuario = (dados: Cadastro) => {
  socket.emit("cadastrar_usuario", dados);
};

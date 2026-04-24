import type { Server, Socket } from "socket.io";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "../types.ts";
import { criarUsuario } from "../usuariosDb.ts";

export const registrarEventosCadastro = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>,
  io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>,
) => {
  socket.on("cadastrar_usuario", async (dados) => {
    const resultado = await criarUsuario(dados);

    if (resultado?.acknowledged) {
      socket.emit("cadastro_sucesso");
    } else {
      socket.emit("cadastro_erro");
    }
  });
};

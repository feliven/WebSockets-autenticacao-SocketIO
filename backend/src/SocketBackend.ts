import io from "./Server.ts";
import { registrarEventosCadastro } from "./registrarEventos/registrarEventosCadastro.ts";
import { registrarEventosDocumento } from "./registrarEventos/registrarEventosDocumento.ts";
import { registrarEventosInicio } from "./registrarEventos/registrarEventosInicio.ts";

io.on("connection", (socket) => {
  registrarEventosInicio(socket, io);
  registrarEventosDocumento(socket, io);
  registrarEventosCadastro(socket);

  socket.on("disconnect", (motivo) => {
    console.log(`Cliente "${socket.id}" desconectado!
    Motivo: ${motivo}`);
  });
});

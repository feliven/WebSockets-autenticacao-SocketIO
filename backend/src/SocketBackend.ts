import io from "./Server.ts";
import { registrarEventosCadastro } from "./registrarEventos/registrarEventosCadastro.ts";
import { registrarEventosDocumento } from "./registrarEventos/registrarEventosDocumento.ts";
import { registrarEventosInicio } from "./registrarEventos/registrarEventosInicio.ts";
import { registrarEventosLogin } from "./registrarEventos/registrarEventosLogin.ts";

io.on("connection", (socket) => {
  registrarEventosInicio(socket, io);
  registrarEventosDocumento(socket, io);
  registrarEventosCadastro(socket);
  registrarEventosLogin(socket);

  socket.on("disconnect", (motivo) => {
    console.log(`Cliente "${socket.id}" desconectado!
    Motivo: ${motivo}`);
  });
});

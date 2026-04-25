import io from "./Server.ts";
import autorizarUsuario from "./middleware/autorizarUsuario.ts";
import { registrarEventosCadastro } from "./registrarEventos/registrarEventosCadastro.ts";
import { registrarEventosDocumento } from "./registrarEventos/registrarEventosDocumento.ts";
import { registrarEventosHome } from "./registrarEventos/registrarEventosHome.ts";
import { registrarEventosLogin } from "./registrarEventos/registrarEventosLogin.ts";

// Applies the middleware ONLY to this namespace
io.of("/usuarios").use(autorizarUsuario);

io.of("/usuarios").on("connection", (socket) => {
  registrarEventosHome(socket, io.of("/usuarios"));
  registrarEventosDocumento(socket, io.of("/usuarios"));
});

// Default namespace remains open for public events
io.on("connection", (socket) => {
  registrarEventosCadastro(socket);
  registrarEventosLogin(socket);

  socket.on("disconnect", (motivo) => {
    console.log(`Cliente "${socket.id}" desconectado!
    Motivo: ${motivo}`);
  });
});

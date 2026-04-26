import io from "./Server.ts";
import autorizarUsuario from "./middleware/autorizarUsuario.ts";
import { registrarEventosCadastro } from "./registrarEventos/registrarEventosCadastro.ts";
import { registrarEventosDocumento } from "./registrarEventos/registrarEventosDocumento.ts";
import { registrarEventosHome } from "./registrarEventos/registrarEventosHome.ts";
import { registrarEventosLogin } from "./registrarEventos/registrarEventosLogin.ts";
import type { IoNamespace } from "./types.ts";

const nspUsuarios: IoNamespace = io.of("/usuarios");

// Applies the middleware ONLY to this namespace
nspUsuarios.use(autorizarUsuario);

nspUsuarios.on("connection", (socket) => {
  registrarEventosHome(socket, nspUsuarios);
  registrarEventosDocumento(socket, nspUsuarios);
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

import { io, Socket } from "socket.io-client";
import { atualizarTextoEditor } from "./documento.js";
import type { ClientToServerEvents, ServerToClientEvents, TextoENomeDocumento } from "./types.js";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

export const selecionarDocumento = (nomeDocumento: string) => {
  socket.emit("selecionar_documento", nomeDocumento);
};

export const emitirTextoDigitado = (dados: TextoENomeDocumento) => {
  socket.emit("texto_editor", dados);
};

socket.on("texto_para_clients", (texto: string) => {
  atualizarTextoEditor(texto);
});

socket.on("disconnect", (motivo: string) => {
  console.log(`Servidor desconectado!
  Motivo: ${motivo}`);
});

import jwt from "jsonwebtoken";
import type { FullPayload, MiddlewareFunction, SocketBackend } from "../types.ts";

const autorizarUsuario: MiddlewareFunction = (socket: SocketBackend, next) => {
  const tokenJwt = socket.handshake.auth.token as string | undefined;

  console.log({ tokenJwt });

  if (!tokenJwt) {
    next(new Error("Token não fornecido"));
    return;
  }

  try {
    const payloadToken = jwt.verify(tokenJwt, process.env.SEGREDO_JWT ?? "") as FullPayload;
    console.log({ payloadToken });

    socket.emit("autorizacao_sucesso", payloadToken);

    next();
  } catch (error) {
    if (error instanceof Error) {
      next(error);
    } else {
      console.error("Erro inesperado", { error });
    }
  }
};

export default autorizarUsuario;

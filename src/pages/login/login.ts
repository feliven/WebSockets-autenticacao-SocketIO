import { emitirAutenticacaoUsuario } from "./socket-frontend-login";

const elemFormLogin = document.getElementById("form-login") as HTMLFormElement | null;

console.log({ elemFormLogin });

elemFormLogin?.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(elemFormLogin);

  const inputUsuario = formData.get("input-usuario") as string | null;
  const inputSenha = formData.get("input-senha") as string | null;

  emitirAutenticacaoUsuario({ usuario: inputUsuario, senha: inputSenha });
});

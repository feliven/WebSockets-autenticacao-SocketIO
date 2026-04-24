import { emitirCadastroUsuario } from "./socket-frontend-cadastro";

const elemFormCadastro = document.getElementById("form-cadastro") as HTMLFormElement | null;

elemFormCadastro?.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(elemFormCadastro);

  const inputUsuario = formData.get("input-usuario") as string | null;
  const inputSenha = formData.get("input-senha") as string | null;

  emitirCadastroUsuario({ usuario: inputUsuario, senha: inputSenha });
});

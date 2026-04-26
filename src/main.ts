import {
  elemFormNovoDocumento,
  elemNomeNovoDocumento,
  elemBotaoLogout,
} from "./funcoes-interface-main";
import { criarDocumento } from "./socket-frontend-main";
import { nomeCookie } from "./shared/variables";
import { removerCookie } from "./utils/cookies";

elemFormNovoDocumento?.addEventListener("submit", (evento) => {
  evento.preventDefault();

  if (elemNomeNovoDocumento) {
    const nomeNovoDoc = elemNomeNovoDocumento.value;
    criarDocumento(nomeNovoDoc);
    elemNomeNovoDocumento.value = "";
  } else {
    console.error("elemNomeNovoDocumento não existe");
  }
});

elemBotaoLogout?.addEventListener("click", async () => {
  const cookieFoiRemovido = await removerCookie(nomeCookie);

  if (cookieFoiRemovido === true) {
    console.log("Logout feito com sucesso");
    window.location.assign("/src/pages/login/login.html");
  } else if (cookieFoiRemovido === false) {
    alert("Erro ao fazer logout.");
  } else {
    console.warn("Cookie de sessão não encontrado.");
  }
});

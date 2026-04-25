export const definirCookie = (chave: string, valor: string) => {
  document.cookie = `${chave}=${valor};path=/`;
};

export const obterCookie = (chave: string) => {
  const cookieComChave = document.cookie.split("; ").find((cookie) => {
    return cookie.startsWith(`${chave}=`);
  });

  console.log({ cookieComChave });

  if (!cookieComChave) {
    console.error("Cookie não encontrado");
    return;
  }

  const valorCookie = cookieComChave.split("=")[1];

  return valorCookie;
};

export const removerCookie = (chave: string) => {
  if (!obterCookie(chave)) {
    return;
  }

  document.cookie = `${chave}=; expires=01 Jan 1970`;

  const cookieFoiRemovido = !obterCookie(chave);

  return cookieFoiRemovido;
};

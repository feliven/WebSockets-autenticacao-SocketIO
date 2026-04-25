export const definirCookie = async (chave: string, valor: string) => {
  try {
    await cookieStore.set(chave, valor);
  } catch (error) {
    console.error(`Erro ao configurar cookie ${chave}:`, { error });
  }
};

export const obterCookie = async (chave: string) => {
  try {
    const cookieComChave = await cookieStore.get(chave);
    console.log({ cookieComChave });

    if (!cookieComChave) {
      console.error("Cookie não encontrado");
      return;
    }

    const valorCookie = cookieComChave.value;
    return valorCookie;
  } catch (error) {
    console.error(`Erro ao obter cookie ${chave}:`, { error });
  }
};

export const removerCookie = async (chave: string) => {
  try {
    const cookieParaRemover = await obterCookie(chave);
    if (!cookieParaRemover) {
      return;
    }

    await cookieStore.delete(chave);

    const cookieFoiRemovido = !(await obterCookie(chave));
    return cookieFoiRemovido;
  } catch (error) {
    console.error(`Erro ao remover cookie ${chave}:`, { error });
  }
};

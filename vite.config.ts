import { resolve } from "path";
import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {},
  lint: { options: { typeAware: true, typeCheck: true } },
  build: {
    rolldownOptions: {
      input: {
        home: resolve(import.meta.dirname, "index.html"),
        documento: resolve(import.meta.dirname, "src/pages/documento/documento.html"),
        cadastro: resolve(import.meta.dirname, "src/pages/cadastro/cadastro.html"),
        login: resolve(import.meta.dirname, "src/pages/login/login.html"),
      },
    },
  },
});

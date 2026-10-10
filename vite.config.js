import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { cpSync } from 'node:fs';

// Copia a pasta imagens para o dist: os cards de projetos montam o caminho das imagens em
// tempo de execução (js/projetos.js), então o Vite não consegue rastreá-las como assets
const copiarImagens = {
  name: 'copiar-imagens',
  closeBundle() { cpSync('imagens', 'dist/imagens', { recursive: true }); }
};

export default defineConfig({
  plugins: [copiarImagens],
  // Caminho base no GitHub Pages (repositório wagnerpaivawp/projeto-ong)
  base: '/projeto-ong/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Site multipágina: cada HTML é um ponto de entrada
    rollupOptions: {
      input: {
        raiz: resolve(__dirname, 'index.html'),
        index: resolve(__dirname, 'html/index.html'),
        projetos: resolve(__dirname, 'html/projetos.html'),
        cadastro: resolve(__dirname, 'html/cadastro.html')
      }
    },
    // Minificação (esbuild) de JS e CSS; HTML é minificado pelo próprio Vite
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: false,
    // Não embute imagens em base64 no HTML; mantém arquivos separados e cacheáveis
    assetsInlineLimit: 0
  }
});

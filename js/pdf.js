// pdf.js – Exporta o conteúdo do livro para PDF

document.addEventListener("DOMContentLoaded", () => {
  const exportarBtn = document.getElementById("exportar-pdf-btn");
  const editor = document.getElementById("editor-texto");
  const titulo = document.getElementById("titulo-livro");

  exportarBtn.addEventListener("click", () => {
    const conteudo = editor.value;
    const nomeArquivo = (titulo.textContent || "rascunho").replace(/\s+/g, "_");

    const janela = window.open("", "_blank");
    janela.document.write(`
      <html>
        <head>
          <title>${nomeArquivo}</title>
          <style>
            body { font-family: sans-serif; padding: 2rem; white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <h1>${titulo.textContent}</h1>
          <div>${conteudo.replace(/\n/g, "<br>")}</div>
        </body>
      </html>
    `);
    janela.document.close();
    janela.print();
  });
});

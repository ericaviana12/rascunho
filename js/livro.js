// livro.js – Lógica de edição e salvamento de livros

document.addEventListener("DOMContentLoaded", () => {
  const editor = document.getElementById("editor-texto");
  const salvarBtn = document.getElementById("salvar-btn");
  const statusTexto = document.getElementById("status-salvamento");
  const tituloElemento = document.getElementById("titulo-livro");

  let livros = JSON.parse(localStorage.getItem("livros")) || [];
  let livroIndex = parseInt(localStorage.getItem("livroAtual"));
  let livroAtual = livros[livroIndex] || { titulo: "", conteudo: "", status: "Rascunho" };

  // Carrega conteúdo inicial
  tituloElemento.textContent = livroAtual.titulo;
  editor.value = livroAtual.conteudo;
  statusTexto.textContent = "Carregado";

  // Salvamento automático a cada 5 segundos
  setInterval(() => {
    salvar(false);
  }, 5000);

  // Salvamento manual
  salvarBtn.addEventListener("click", () => {
    salvar(true);
  });

  // Função de salvar
  function salvar(manual) {
    livroAtual.conteudo = editor.value;
    livroAtual.status = "Rascunho";
    livros[livroIndex] = livroAtual;
    localStorage.setItem("livros", JSON.stringify(livros));

    if (manual) {
      statusTexto.textContent = "Salvo manualmente";
    } else {
      statusTexto.textContent = "Salvo automaticamente";
    }

    setTimeout(() => {
      statusTexto.textContent = "";
    }, 2000);
  }
});

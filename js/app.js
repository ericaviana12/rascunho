// app.js – Lógica da Home do app Rascunho

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("livros-container");
  const novoLivroBtn = document.getElementById("novo-livro-btn");

  // Carrega os livros salvos do localStorage
  function carregarLivros() {
    const livros = JSON.parse(localStorage.getItem("livros")) || [];
    container.innerHTML = "";

    if (livros.length === 0) {
      container.innerHTML = "<p>Nenhum livro criado ainda.</p>";
      return;
    }

    livros.forEach((livro, index) => {
      const div = document.createElement("div");
      div.className = "livro-item";
      div.innerHTML = `
        <h3>${livro.titulo || "Livro sem título"}</h3>
        <p>Status: ${livro.status || "Rascunho"}</p>
        <button onclick="abrirLivro(${index})">Abrir</button>
      `;
      container.appendChild(div);
    });
  }

  // Cria um novo livro
  novoLivroBtn.addEventListener("click", () => {
    const livros = JSON.parse(localStorage.getItem("livros")) || [];
    const novoLivro = {
      titulo: "Novo Livro",
      conteudo: "",
      status: "Rascunho",
      criadoEm: new Date().toISOString(),
    };
    livros.push(novoLivro);
    localStorage.setItem("livros", JSON.stringify(livros));
    localStorage.setItem("livroAtual", livros.length - 1); // salva o índice atual
    window.location.href = "livro.html";
  });

  window.abrirLivro = (index) => {
    localStorage.setItem("livroAtual", index);
    window.location.href = "livro.html";
  };

  carregarLivros();
});

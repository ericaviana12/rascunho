// js/db.js – Gerenciamento de dados no localStorage

const DB_KEY = "rascunho_livros";
const CONFIG_KEY = "rascunho_config";

// Funções para livros
function salvarLivro(id, livro) {
  const livros = carregarLivros();
  livros[id] = livro;
  localStorage.setItem(DB_KEY, JSON.stringify(livros));
}

function carregarLivros() {
  const dados = localStorage.getItem(DB_KEY);
  return dados ? JSON.parse(dados) : {};
}

function deletarLivro(id) {
  const livros = carregarLivros();
  delete livros[id];
  localStorage.setItem(DB_KEY, JSON.stringify(livros));
}

// Funções para configurações
function salvarConfiguracoes(config) {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
}

function carregarConfiguracoes() {
  const dados = localStorage.getItem(CONFIG_KEY);
  return dados ? JSON.parse(dados) : {
    fonte: "sans-serif",
    tema: "claro"
  };
}

const salvarLivro = (livro, index = null) => {
    const livros = JSON.parse(localStorage.getItem('livros')) || [];
    if (index !== null) {
      livros[index] = livro;
    } else {
      livros.push(livro);
    }
    localStorage.setItem('livros', JSON.stringify(livros));
  };
  
  const carregarLivro = (index) => {
    const livros = JSON.parse(localStorage.getItem('livros')) || [];
    return livros[index] || null;
  };
  
  const excluirLivro = (index) => {
    const livros = JSON.parse(localStorage.getItem('livros')) || [];
    livros.splice(index, 1);
    localStorage.setItem('livros', JSON.stringify(livros));
  };
  
  const listarLivros = () => {
    return JSON.parse(localStorage.getItem('livros')) || [];
  };
  
  const marcarComoLendo = (index) => {
    localStorage.setItem('livroLendo', index);
  };
  
  const obterLivroAtual = () => {
    const index = localStorage.getItem('livroLendo');
    return index !== null ? carregarLivro(index) : null;
  };
  
document.addEventListener('DOMContentLoaded', () => {
    const livroContainer = document.getElementById('livro-container');
  
    const livros = JSON.parse(localStorage.getItem('livros')) || [];
    const index = localStorage.getItem('livroLendo');
  
    if (index === null || !livros[index]) {
      livroContainer.innerHTML = '<p>Livro não encontrado.</p>';
      return;
    }
  
    const livro = livros[index];
  
    const html = `
      <article class="livro">
        <h1 class="titulo">${livro.titulo}</h1>
        <img src="${livro.capa}" alt="Capa do livro" class="capa">
  
        <section class="dedicacao">
          <h2>Dedicação</h2>
          <div>${livro.dedicacao}</div>
        </section>
  
        <section class="prefacio">
          <h2>Prefácio</h2>
          <div>${livro.prefacio}</div>
        </section>
  
        <section class="sumario">
          <h2>Sumário</h2>
          <div>${livro.sumario}</div>
        </section>
  
        <section class="conteudo">
          <h2>Conteúdo</h2>
          <div>${livro.conteudo}</div>
        </section>
      </article>
    `;
  
    livroContainer.innerHTML = html;
  });
  
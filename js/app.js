document.addEventListener('DOMContentLoaded', () => {
    const livrosContainer = document.getElementById('livros-container');
    const livros = JSON.parse(localStorage.getItem('livros')) || [];
  
    if (livros.length === 0) {
      livrosContainer.innerHTML = '<p>Nenhum livro criado ainda.</p>';
    } else {
      livros.forEach((livro, index) => {
        const card = document.createElement('div');
        card.classList.add('livro-card');
  
        const capa = document.createElement('img');
        capa.src = livro.capa;
        capa.alt = `Capa do livro ${livro.titulo}`;
        card.appendChild(capa);
  
        const titulo = document.createElement('h3');
        titulo.textContent = livro.titulo;
        card.appendChild(titulo);
  
        const botoes = document.createElement('div');
  
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.onclick = () => {
          localStorage.setItem('livroEditando', index);
          window.location.href = 'editor.html';
        };
        botoes.appendChild(btnEditar);
  
        const btnLer = document.createElement('button');
        btnLer.textContent = 'Ler';
        btnLer.onclick = () => {
          localStorage.setItem('livroLendo', index);
          window.location.href = 'leitura.html';
        };
        botoes.appendChild(btnLer);
  
        card.appendChild(botoes);
        livrosContainer.appendChild(card);
      });
    }
  
    document.getElementById('novo-livro-btn')?.addEventListener('click', () => {
      localStorage.removeItem('livroEditando');
      window.location.href = 'editor.html';
    });
  });
  
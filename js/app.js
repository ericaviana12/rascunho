// Função para carregar livros salvos
function carregarLivros() {
  const listaLivros = document.getElementById('lista-livros');
  if (!listaLivros) return;

  listaLivros.innerHTML = '';
  const livros = JSON.parse(localStorage.getItem('livros') || '[]');

  livros.forEach((livro, index) => {
    const card = document.createElement('div');
    card.className = 'col-md-4';
    card.innerHTML = `
      <div class="card h-100">
        <img src="${livro.capa}" class="card-img-top capa-preview" alt="Capa do livro">
        <div class="card-body">
          <h5 class="card-title">${livro.titulo}</h5>
          <p class="card-text">${livro.dedicatoria || ''}</p>
          <a href="livro.html?id=${index}" class="btn btn-primary btn-sm mb-1">Editar</a>
          <button onclick="excluirLivro(${index})" class="btn btn-danger btn-sm mb-1">Excluir</button>
          <button onclick="exportarLivro(${index})" class="btn btn-success btn-sm">Exportar PDF</button>
        </div>
      </div>
    `;
    listaLivros.appendChild(card);
  });
}

// Função para adicionar novos capítulos
function adicionarCapitulo(titulo = '', texto = '') {
  const capitulos = document.getElementById('capitulos');
  const index = capitulos.querySelectorAll('.capitulo').length;

  const div = document.createElement('div');
  div.className = 'mb-3 capitulo';
  div.innerHTML = `
    <label class="form-label">Título do Capítulo</label>
    <input type="text" class="form-control titulo-capitulo" value="${titulo}">
    <label class="form-label mt-2">Texto</label>
    <textarea class="form-control texto-capitulo" rows="4">${texto}</textarea>
    <button type="button" class="btn btn-danger btn-sm mt-2" onclick="removerCapitulo(this)">Remover Capítulo</button>
    <hr>
  `;
  capitulos.appendChild(div);
}

// Função para remover um capítulo
function removerCapitulo(botao) {
  botao.parentElement.remove();
}

// Função para salvar livro
function salvarLivro() {
  const id = document.getElementById('livro-id').value;
  const titulo = document.getElementById('titulo').value.trim();
  const dedicatoria = document.getElementById('dedicatoria').value.trim();
  const capaInput = document.getElementById('capa');
  const capitulosElements = document.querySelectorAll('.capitulo');

  if (!titulo) {
    alert('Título é obrigatório!');
    return;
  }

  let capaBase64 = '';
  const livros = JSON.parse(localStorage.getItem('livros') || '[]');

  function salvar(capaData) {
    const novoLivro = {
      titulo,
      dedicatoria,
      capa: capaData || (livros[id] && livros[id].capa),
      capitulos: Array.from(capitulosElements).map(c => ({
        titulo: c.querySelector('.titulo-capitulo').value,
        texto: c.querySelector('.texto-capitulo').value
      }))
    };

    if (id) {
      livros[id] = novoLivro;
    } else {
      livros.push(novoLivro);
    }

    localStorage.setItem('livros', JSON.stringify(livros));
    window.location.href = 'painel.html';
  }

  if (capaInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function (e) {
      capaBase64 = e.target.result;
      salvar(capaBase64);
    };
    reader.readAsDataURL(capaInput.files[0]);
  } else {
    salvar();
  }
}

// Função para excluir livro
function excluirLivro(index) {
  if (confirm('Deseja excluir este livro?')) {
    const livros = JSON.parse(localStorage.getItem('livros') || '[]');
    livros.splice(index, 1);
    localStorage.setItem('livros', JSON.stringify(livros));
    carregarLivros();
  }
}

// Função para exportar livro como PDF
function exportarLivro(index) {
  const livros = JSON.parse(localStorage.getItem('livros') || '[]');
  const livro = livros[index];

  if (!livro) return;

  const janela = window.open('', '_blank');
  janela.document.write(`
    <html>
    <head>
      <title>${livro.titulo}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; margin: 40px auto}
        h1, h2 { text-align: center; margin: 30px auto}
        img { max-width: 300px; display: block; margin: 20px auto; }
        .capitulo { page-break-before: always; margin: 20px auto}
      </style>
    </head>
    <body>
      <img src="${livro.capa}" alt="Capa do livro">
      <h1>${livro.titulo}</h1>
      ${livro.dedicatoria ? `<p><em>${livro.dedicatoria}</em></p>` : ''}
      <h2>Sumário</h2>
      <ul>
        ${livro.capitulos.map(c => `<li>${c.titulo}</li>`).join('')}
      </ul>
      ${livro.capitulos.map(c => `
        <div class="capitulo">
          <h2>${c.titulo}</h2>
          <p>${c.texto.replace(/\n/g, '<br>')}</p>
        </div>
      `).join('')}
    </body>
    </html>
  `);
  janela.document.close();
  janela.print();
}

// Se for página de edição, carregar dados do livro
window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (id !== null && document.getElementById('form-livro')) {
    const livros = JSON.parse(localStorage.getItem('livros') || '[]');
    const livro = livros[id];

    if (livro) {
      document.getElementById('livro-id').value = id;
      document.getElementById('titulo').value = livro.titulo;
      document.getElementById('dedicatoria').value = livro.dedicatoria || '';
      livro.capitulos.forEach(c => adicionarCapitulo(c.titulo, c.texto));
    }
    document.getElementById('titulo-pagina').innerText = 'Editar Livro';
  }

  carregarLivros();
}

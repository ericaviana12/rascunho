let livros = JSON.parse(localStorage.getItem('livros') || '[]');

// INDEX
function criarNovoLivro() {
  const novo = {
    id: Date.now(),
    titulo: 'Novo Livro',
    dedicatoria: '',
    capa: '',
    capitulos: []
  };
  livros.push(novo);
  localStorage.setItem('livros', JSON.stringify(livros));
  window.location.href = `livro.html?id=${novo.id}`;
}

function carregarLivros() {
  const container = document.getElementById('livros-container');
  if (!container) return;
  container.innerHTML = '';

  livros.forEach(livro => {
    const card = document.createElement('div');
    card.className = 'col-md-4';
    card.innerHTML = `
      <div class="card h-100">
        ${livro.capa ? `<img src="${livro.capa}" class="card-img-top" alt="Capa do Livro">` : ''}
        <div class="card-body">
          <h5 class="card-title">${livro.titulo}</h5>
          <a href="livro.html?id=${livro.id}" class="btn btn-primary btn-sm">Editar</a>
          <button class="btn btn-danger btn-sm" onclick="excluirLivro(${livro.id})">Excluir</button>
          <button class="btn btn-secondary btn-sm" onclick="exportarPDF(${livro.id})">Exportar PDF</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function excluirLivro(id) {
  if (!confirm('Deseja excluir este livro?')) return;
  livros = livros.filter(l => l.id !== id);
  localStorage.setItem('livros', JSON.stringify(livros));
  carregarLivros();
}

function exportarPDF(id) {
  const livro = livros.find(l => l.id === id);
  if (!livro) return;
  alert(`Exportar "${livro.titulo}" em PDF — funcionalidade a implementar`);
}

// LIVRO.HTML
const params = new URLSearchParams(window.location.search);
const livroId = params.get('id');
if (livroId && document.getElementById('livro-form')) {
  const livro = livros.find(l => l.id == livroId);

  if (livro) {
    document.getElementById('titulo').value = livro.titulo;
    document.getElementById('dedicatoria').value = livro.dedicatoria;

    const capaInput = document.getElementById('capa');
    capaInput.addEventListener('change', e => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        livro.capa = reader.result;
      };
      reader.readAsDataURL(file);
    });

    livro.capitulos.forEach((c, i) => adicionarCapitulo(c.titulo, c.texto, i));

    document.getElementById('livro-form').addEventListener('submit', e => {
      e.preventDefault();
      livro.titulo = document.getElementById('titulo').value;
      livro.dedicatoria = document.getElementById('dedicatoria').value;
      livro.capitulos = [];

      const caps = document.querySelectorAll('.capitulo');
      caps.forEach(cap => {
        livro.capitulos.push({
          titulo: cap.querySelector('.cap-titulo').value,
          texto: cap.querySelector('.cap-texto').value
        });
      });

      const idx = livros.findIndex(l => l.id == livroId);
      livros[idx] = livro;
      localStorage.setItem('livros', JSON.stringify(livros));
      alert('Livro salvo com sucesso!');
    });
  }
}

function adicionarCapitulo(titulo = '', texto = '', i = Date.now()) {
  const container = document.getElementById('capitulos-container');
  const div = document.createElement('div');
  div.className = 'capitulo';
  div.innerHTML = `
    <input type="text" class="form-control cap-titulo mb-2" placeholder="Título do capítulo" value="${titulo}" />
    <textarea class="form-control cap-texto mb-2" rows="5" placeholder="Texto do capítulo">${texto}</textarea>
    <button type="button" class="btn btn-sm btn-danger" onclick="this.parentElement.remove()">Remover Capítulo</button>
  `;
  container.appendChild(div);
}

// CONFIGURAÇÕES
const configForm = document.getElementById('config-form');
if (configForm) {
  configForm.addEventListener('submit', e => {
    e.preventDefault();
    const prefs = {
      fonte: document.getElementById('fonte').value,
      tamanho: document.getElementById('tamanho').value,
      cor: document.getElementById('corTexto').value
    };
    localStorage.setItem('preferencias', JSON.stringify(prefs));
    alert('Configurações salvas!');
  });
}

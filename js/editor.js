document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('editor-form');
    const tituloInput = document.getElementById('titulo');
    const capaInput = document.getElementById('capa');
    const capaPreview = document.getElementById('capa-preview');
    const dedicacao = document.getElementById('dedicacao');
    const prefacio = document.getElementById('prefacio');
    const sumario = document.getElementById('sumario');
    const conteudo = document.getElementById('conteudo');
    const progressoBarra = document.getElementById('barra-progresso');
  
    let livros = JSON.parse(localStorage.getItem('livros')) || [];
    let index = localStorage.getItem('livroEditando');
    let livroAtual = index !== null ? livros[index] : null;
  
    if (livroAtual) {
      tituloInput.value = livroAtual.titulo;
      capaPreview.src = livroAtual.capa;
      dedicacao.innerHTML = livroAtual.dedicacao;
      prefacio.innerHTML = livroAtual.prefacio;
      sumario.innerHTML = livroAtual.sumario;
      conteudo.innerHTML = livroAtual.conteudo;
    }
  
    capaInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => capaPreview.src = reader.result;
      if (file) reader.readAsDataURL(file);
    });
  
    form.addEventListener('input', atualizarBarraProgresso);
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const livro = {
        titulo: tituloInput.value,
        capa: capaPreview.src,
        dedicacao: dedicacao.innerHTML,
        prefacio: prefacio.innerHTML,
        sumario: sumario.innerHTML,
        conteudo: conteudo.innerHTML
      };
  
      if (index !== null) {
        livros[index] = livro;
      } else {
        livros.push(livro);
      }
  
      localStorage.setItem('livros', JSON.stringify(livros));
      window.location.href = 'index.html';
    });
  
    function atualizarBarraProgresso() {
      const campos = [tituloInput, dedicacao, prefacio, sumario, conteudo];
      let preenchidos = campos.filter(c => {
        return c.value?.trim().length > 0 || c.innerHTML?.trim().length > 0;
      }).length;
      progressoBarra.style.width = `${(preenchidos / campos.length) * 100}%`;
    }
  
    atualizarBarraProgresso();
  });
  
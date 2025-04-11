function atualizarProgresso() {
    const progressoBarra = document.getElementById('barraProgresso');
    const progressoTexto = document.getElementById('textoProgresso');
  
    if (!progressoBarra || !progressoTexto) return;
  
    const livro = JSON.parse(localStorage.getItem('livroAtual'));
    if (!livro || !livro.capitulos || livro.capitulos.length === 0) {
      progressoBarra.style.width = '0%';
      progressoTexto.textContent = '0% concluído';
      return;
    }
  
    const total = livro.capitulos.length;
    let lidos = 0;
    livro.capitulos.forEach(c => {
      if (c.lido) lidos++;
    });
  
    const percentual = Math.round((lidos / total) * 100);
    progressoBarra.style.width = `${percentual}%`;
    progressoTexto.textContent = `${percentual}% concluído`;
  }
  
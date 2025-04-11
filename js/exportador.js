function gerarPDF(livro) {
    const janela = window.open('', '_blank');
    const estilo = `
      <style>
        body {
          font-family: 'Literata', serif;
          margin: 2em;
          color: #111;
        }
        h1, h2 {
          text-align: center;
          page-break-after: avoid;
        }
        .pagina {
          page-break-after: always;
        }
        .sumario {
          margin-bottom: 2em;
        }
        .sumario h2 {
          text-align: left;
          margin-bottom: 1em;
        }
        .sumario ul {
          list-style: none;
          padding: 0;
        }
        .sumario ul li::before {
          content: "– ";
          color: #444;
        }
        .pagina img.capa {
          max-width: 100%;
          display: block;
          margin: 0 auto 2em auto;
        }
        .pagina .secao {
          margin-top: 2em;
        }
      </style>
    `;
  
    let conteudo = `<html><head><meta charset="utf-8">${estilo}</head><body>`;
  
    conteudo += `<div class="pagina"><img src="${livro.capa}" class="capa"><h1>${livro.titulo}</h1></div>`;
  
    if (livro.dedicatoria) {
      conteudo += `<div class="pagina"><div class="secao"><h2>Dedicatória</h2><p>${livro.dedicatoria}</p></div></div>`;
    }
  
    if (livro.prefacio) {
      conteudo += `<div class="pagina"><div class="secao"><h2>Prefácio</h2><p>${livro.prefacio}</p></div></div>`;
    }
  
    if (livro.capitulos && livro.capitulos.length) {
      conteudo += `<div class="pagina sumario"><h2>Sumário</h2><ul>`;
      livro.capitulos.forEach((cap, i) => {
        conteudo += `<li>${cap.titulo}</li>`;
      });
      conteudo += `</ul></div>`;
    }
  
    livro.capitulos.forEach((cap, i) => {
      conteudo += `<div class="pagina"><div class="secao"><h2>${cap.titulo}</h2>${cap.conteudo}</div></div>`;
    });
  
    conteudo += `</body></html>`;
  
    janela.document.write(conteudo);
    janela.document.close();
    janela.print();
  }
  
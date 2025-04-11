# Rascunho - Editor de Livros Pessoais

Rascunho é um editor de livros pessoais que permite a criação, edição e exportação de livros em formato PDF. O app permite que o autor personalize o conteúdo de seus livros, incluindo a capa, dedicatória, prefácio, capítulos e estilos de formatação. Além disso, o livro pode ser salvo localmente e acessado offline, além de ser possível a exportação para PDF.

## Funcionalidades

- **Editor de Livro**: Criação e edição do conteúdo do livro com formatação customizável.
- **Sumário Automático**: O sumário é gerado automaticamente com base nos capítulos.
- **Barra de Progresso**: Acompanha o progresso da escrita do livro.
- **Exportação para PDF**: O livro pode ser exportado para PDF com a formatação escolhida.
- **Leitura do Livro**: Visualização do livro com layout final.
- **Salvamento Offline**: Todos os livros criados podem ser salvos localmente e acessados offline.

## Estrutura do Projeto

- **index.html**: Tela principal com a lista de livros.
- **editor.html**: Editor do livro (com sumário, capítulos, estilos e barra de progresso).
- **leitura.html**: Visualização do livro com layout final.
- **css/style.css**: Arquivo de estilos do app.
- **js/app.js**: Lógica principal do app.
- **js/editor.js**: Lógica do editor de livros.
- **js/leitura.js**: Lógica para exibir o livro na leitura.
- **js/db.js**: Gerenciamento do armazenamento local dos dados.
- **js/progresso.js**: Lógica da barra de progresso da escrita.
- **data/livros/**: Armazena os dados dos livros criados.
- **assets/icons/**: Ícones do app.
- **assets/capas/**: Capas dos livros carregadas pelo usuário.
- **manifest.json**: Manifesto PWA.
- **service-worker.js**: Service worker para funcionalidade offline.

## Autoria

Projeto desenvolvido por Erica Viana

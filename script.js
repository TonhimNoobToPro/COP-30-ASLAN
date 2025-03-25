// Função para mostrar uma seção específica
let secaoAtual = null;
let botaoAtual = null;

function mostrarSecao(secaoId) {
  // Ocultar a seção atual, se houver
  if (secaoAtual) {
    const secaoAnterior = document.getElementById(secaoAtual);
    secaoAnterior.classList.remove('animate');
    secaoAnterior.style.display = 'none'; // Esconder a seção anterior
  }

  // Remover o estado "selected" do botão anterior
  if (botaoAtual) {
    botaoAtual.classList.remove('selected');
  }

  // Mostrar a nova seção
  const secaoSelecionada = document.getElementById(secaoId);
  if (secaoSelecionada) {
    // Exibir a seção selecionada
    secaoSelecionada.style.display = 'block'; // Mostrar a seção no layout
    setTimeout(() => {
      secaoSelecionada.classList.add('animate'); // Aplicar animação
    }, 10); // Pequeno delay para garantir a transição

    secaoAtual = secaoId;

    // Marcar o botão clicado como "selected"
    const botaoSelecionado = document.getElementById(`btn-${secaoId}`);
    botaoSelecionado.classList.add('selected');
    botaoAtual = botaoSelecionado;

    // Capturar o título da seção do atributo data-title
    const tituloSecao = botaoSelecionado.getAttribute('data-title');

    // Mostrar notificação com o título da seção
    mostrarNotificacao(`Section loaded: ${tituloSecao}`);
  }
}

// Observador de Interseção para animação
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, {
    threshold: 0.5
  });

  // Aplicar observador apenas às seções visíveis inicialmente
  const sectionsVisiveis = document.querySelectorAll('#titulo, #descricao, #selecao');
  sectionsVisiveis.forEach(section => {
    observer.observe(section);
  });
});

// Notificação Visual
function mostrarNotificacao(mensagem) {
  const notificacao = document.createElement('div');
  notificacao.className = 'notificacao';
  notificacao.textContent = mensagem;

  document.body.appendChild(notificacao);

  setTimeout(() => {
    notificacao.classList.add('show');
  }, 100);

  setTimeout(() => {
    notificacao.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notificacao);
    }, 500);
  }, 3000);
}
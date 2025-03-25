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
// Função para criar o gráfico
function criarGrafico() {
  const ctx = document.getElementById('graficoPermafrost').getContext('2d');

  // Dados atualizados em inglês
  const grafico = new Chart(ctx, {
    type: 'bar', // Tipo de gráfico (barras)
    data: {
      labels: ['Carbon in Permafrost (Trillions)', 'CO₂ in Atmosphere (Gigatons)', 'Methane (ppb)'],
      datasets: [{
        label: 'Carbon Comparison',
        data: [1.5, 0.85, 1.908], // Valores normalizados para comparação direta
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)', // Vermelho claro (Permafrost)
          'rgba(54, 162, 235, 0.6)', // Azul claro (CO₂)
          'rgba(75, 192, 192, 0.6)'  // Verde claro (Metano)
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        tooltip: {
          enabled: true,
          callbacks: {
            label: function (context) {
              return `${context.label}: ${context.raw}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Carbon Amount (Normalized Units)'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Comparison of Carbon Sources'
          }
        }
      },
      animation: {
        duration: 2000, // Duração da animação
        easing: 'easeInOutQuad' // Efeito suave
      }
    }
  });

  // Animação ao passar o mouse ou clicar no celular
  const canvas = document.getElementById('graficoPermafrost');
  canvas.addEventListener('mouseenter', () => {
    grafico.update(); // Atualiza o gráfico para reativar a animação
  });

  canvas.addEventListener('touchstart', () => {
    grafico.update(); // Atualiza o gráfico para reativar a animação no celular
  });
}

// Criar o gráfico quando a seção for exibida
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target.id === 'secao1') {
        criarGrafico(); // Cria o gráfico apenas quando a seção 1 aparece
      }
    });
  }, {
    threshold: 0.5
  });

  // Observar a seção 1
  const secao1 = document.getElementById('secao1');
  observer.observe(secao1);
});

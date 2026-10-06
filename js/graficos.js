// Gráfico de impacto na página inicial (Chart.js 4, carregado de js/vendor/chart.umd.js)
var graficoImpacto = null; // guarda a instância para destruir antes de redesenhar (SPA)

export function iniciarGraficos() {
  var canvas = document.getElementById('grafico-impacto');
  if (!canvas || typeof Chart === 'undefined') return;

  if (graficoImpacto) { graficoImpacto.destroy(); graficoImpacto = null; }

  var estilo = getComputedStyle(document.documentElement);
  var verde = estilo.getPropertyValue('--cor-primaria').trim();
  var laranja = estilo.getPropertyValue('--cor-secundaria').trim();

  graficoImpacto = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['2022', '2023', '2024', '2025', '2026'],
      datasets: [
        { label: 'Famílias atendidas', data: [120, 180, 260, 340, 410], backgroundColor: verde },
        { label: 'Voluntários ativos', data: [18, 27, 41, 58, 73], backgroundColor: laranja }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' },
        title: { display: true, text: 'Crescimento do Instituto Raízes por ano' }
      },
      scales: { y: { beginAtZero: true } }
    }
  });
}

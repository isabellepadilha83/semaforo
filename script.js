const logDiv = document.querySelector('.log');
const veicLuzes = document.querySelectorAll('.coluna.veiculos .luz');
const pedLuzes = document.querySelectorAll('.coluna.pedestres .luz');

let intervalId = null;
let etapa = 0;

function log(msg) {
  const div = document.createElement('div');
  div.textContent = msg;
  logDiv.appendChild(div);
  logDiv.scrollTop = logDiv.scrollHeight;
}

function resetLuzes() {
  veicLuzes.forEach(luz => luz.classList.remove('ativo'));
  pedLuzes.forEach(luz => luz.classList.remove('ativo'));
}

function atualizarLuzes() {
  resetLuzes();

  switch (etapa) {
    case 0:
      veicLuzes[2].classList.add('ativo'); // verde veic
      pedLuzes[0].classList.add('ativo'); // vermelho ped
      log('Veículos: VERDE, Pedestres: VERMELHO');
      break;
    case 1:
      veicLuzes[1].classList.add('ativo'); // amarelo veic
      pedLuzes[0].classList.add('ativo'); // vermelho ped
      log('Veículos: AMARELO, Pedestres: VERMELHO');
      break;
    case 2:
      veicLuzes[0].classList.add('ativo'); // vermelho veic
      pedLuzes[1].classList.add('ativo'); // verde ped
      log('Veículos: VERMELHO, Pedestres: VERDE');
      break;
    case 3:
      veicLuzes[0].classList.add('ativo'); // vermelho veic
      pedLuzes[0].classList.add('ativo'); // vermelho ped
      log('Veículos: VERMELHO, Pedestres: VERMELHO (pausa)');
      break;
  }
}

function iniciarSemaforo() {
  if (intervalId) {
    log('Semáforo já está rodando');
    return;
  }
  log('Semáforo iniciado');
  etapa = 0;
  atualizarLuzes();
  intervalId = setInterval(() => {
    etapa = (etapa + 1) % 4;
    atualizarLuzes();
  }, 4000);
}

function pararSemaforo() {
  if (!intervalId) {
    log('Semáforo já está parado');
    return;
  }
  clearInterval(intervalId);
  intervalId = null;
  resetLuzes();
  log('Semáforo parado');
}

document.querySelector('.start').addEventListener('click', iniciarSemaforo);
document.querySelector('.stop').addEventListener('click', pararSemaforo);

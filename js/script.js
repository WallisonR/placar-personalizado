// Elementos do DOM
const nomeCasa = document.getElementById('nomeCasa');
const nomeVisitante = document.getElementById('nomeVisitante');
const golsCasa = document.getElementById('golsCasa');
const golsVisitante = document.getElementById('golsVisitante');
const tempoJogo = document.getElementById('tempoJogo');
const statusPartida = document.getElementById('statusPartida');
const logoCasa = document.getElementById('logoCasa');
const logoVisitante = document.getElementById('logoVisitante');

// Elementos do Painel de Controle
const inputNomeCasa = document.getElementById('inputNomeCasa');
const inputNomeVisitante = document.getElementById('inputNomeVisitante');
const inputLogoCasa = document.getElementById('inputLogoCasa');
const inputLogoVisitante = document.getElementById('inputLogoVisitante');
const inputStatus = document.getElementById('inputStatus');
const btnAplicar = document.getElementById('btnAplicar');

// Mostrar/ocultar painel de controle
const toggleControls = document.getElementById('toggleControls');
const painelControle = document.getElementById('painelControle');

toggleControls.addEventListener('click', () => {
    if (painelControle.style.display === 'none' || painelControle.style.display === '') {
        painelControle.style.display = 'block';
        toggleControls.textContent = 'x'; // Altere o texto do botão para "x" ao abrir
    } else {
        painelControle.style.display = 'none';
        toggleControls.textContent = '+'; // Altere o texto do botão para "+" ao fechar
    }
});

// Atualizar nomes, logos e status no placar
btnAplicar.addEventListener('click', () => {
    nomeCasa.textContent = inputNomeCasa.value;
    nomeVisitante.textContent = inputNomeVisitante.value;
    statusPartida.textContent = inputStatus.value;

    if (inputLogoCasa.value) {
        logoCasa.src = inputLogoCasa.value;
    }

    if (inputLogoVisitante.value) {
        logoVisitante.src = inputLogoVisitante.value;
    }
});

// Atualizar marcador de gols
const btnGolCasa = document.getElementById('btnGolCasa');
const btnGolCasaMenos = document.getElementById('btnGolCasaMenos');
const btnGolVisitante = document.getElementById('btnGolVisitante');
const btnGolVisitanteMenos = document.getElementById('btnGolVisitanteMenos');

// Função para adicionar animação ao gol
function animacaoGol(elemento) {
    elemento.classList.add('gol-animation'); // Adiciona a classe de animação
    setTimeout(() => {
        elemento.classList.remove('gol-animation'); // Remove a classe após 1 segundo
    }, 1000); // Duração da animação (1s)
}

btnGolCasa.addEventListener('click', () => {
    golsCasa.textContent = parseInt(golsCasa.textContent) + 1;
    animacaoGol(golsCasa); // Aplica a animação ao placar do time da casa
});

btnGolCasaMenos.addEventListener('click', () => {
    const valorAtual = parseInt(golsCasa.textContent);
    if (valorAtual > 0) {
        golsCasa.textContent = valorAtual - 1;
    }
});

btnGolVisitante.addEventListener('click', () => {
    golsVisitante.textContent = parseInt(golsVisitante.textContent) + 1;
    animacaoGol(golsVisitante); // Aplica a animação ao placar do time visitante
});

btnGolVisitanteMenos.addEventListener('click', () => {
    const valorAtual = parseInt(golsVisitante.textContent);
    if (valorAtual > 0) {
        golsVisitante.textContent = valorAtual - 1;
    }
});

// Controle do cronômetro
const btnIniciarCronometro = document.getElementById('btnIniciarCronometro');
const btnPausarCronometro = document.getElementById('btnPausarCronometro');
const btnZerarCronometro = document.getElementById('btnZerarCronometro');
const selectTempo = document.getElementById('selectTempo');
let cronometroInterval;
let segundos = 0;

// Atualizar o tempo de jogo no placar
function atualizarTempoJogo() {
    const tempoSelecionado = selectTempo.value;
    let textoTempo;

    if (tempoSelecionado === '1') {
        textoTempo = '1º Tempo';
    } else if (tempoSelecionado === '2') {
        textoTempo = '2º Tempo';
    } else {
        textoTempo = tempoSelecionado; // Intervalo, Prorrogação ou Pênaltis
    }

    if (tempoSelecionado !== 'Intervalo' && tempoSelecionado !== 'Pênaltis') {
        tempoJogo.textContent = `${textoTempo}: ${document.getElementById('cronometro').value}`;
    } else {
        tempoJogo.textContent = textoTempo;
    }
}

// Iniciar o cronômetro
btnIniciarCronometro.addEventListener('click', () => {
    if (!cronometroInterval) {
        cronometroInterval = setInterval(() => {
            segundos++;
            const minutos = Math.floor(segundos / 60);
            const segundosRestantes = segundos % 60;
            document.getElementById('cronometro').value = `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
            atualizarTempoJogo(); // Atualizar o tempo no placar
        }, 1000);
    }
});

// Pausar o cronômetro
btnPausarCronometro.addEventListener('click', () => {
    clearInterval(cronometroInterval);
    cronometroInterval = null;
});

// Zerar o cronômetro
btnZerarCronometro.addEventListener('click', () => {
    clearInterval(cronometroInterval);
    cronometroInterval = null;
    segundos = 0;
    document.getElementById('cronometro').value = '00:00';
    atualizarTempoJogo(); // Atualizar o tempo no placar
});

// Atualizar o tempo no placar ao mudar o select de tempo
selectTempo.addEventListener('change', atualizarTempoJogo);
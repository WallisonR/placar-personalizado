const nomeCasa = document.getElementById('nomeCasa');
const nomeVisitante = document.getElementById('nomeVisitante');
const golsCasa = document.getElementById('golsCasa');
const golsVisitante = document.getElementById('golsVisitante');
const tempoJogo = document.getElementById('tempoJogo');
const statusPartida = document.getElementById('statusPartida');
const logoCasa = document.getElementById('logoCasa');
const logoVisitante = document.getElementById('logoVisitante');

const inputNomeCasa = document.getElementById('inputNomeCasa');
const inputNomeVisitante = document.getElementById('inputNomeVisitante');
const inputLogoCasa = document.getElementById('inputLogoCasa');
const inputLogoVisitante = document.getElementById('inputLogoVisitante');
const btnAplicar = document.getElementById('btnAplicar');

const toggleControls = document.getElementById('toggleControls');
const painelControle = document.getElementById('painelControle');

const inputCronometro = document.getElementById('inputCronometro');
const btnEditarCronometro = document.getElementById('btnEditarCronometro');

toggleControls.addEventListener('click', () => {
    if (painelControle.style.display === 'none' || painelControle.style.display === '') {
        painelControle.style.display = 'block';
        toggleControls.textContent = 'x';
    } else {
        painelControle.style.display = 'none';
        toggleControls.textContent = '+';
    }
});

btnAplicar.addEventListener('click', () => {
    nomeCasa.textContent = inputNomeCasa.value;
    nomeVisitante.textContent = inputNomeVisitante.value;
    const fileCasa = inputLogoCasa.files[0];
    if (fileCasa) {
        const readerCasa = new FileReader();
        readerCasa.onload = (e) => {
            logoCasa.src = e.target.result;
        };
        readerCasa.readAsDataURL(fileCasa);
    }

    const fileVisitante = inputLogoVisitante.files[0];
    if (fileVisitante) {
        const readerVisitante = new FileReader();
        readerVisitante.onload = (e) => {
            logoVisitante.src = e.target.result;
        };
        readerVisitante.readAsDataURL(fileVisitante);
    }
});

const selectCorLogoCasa = document.getElementById('selectCorLogoCasa');
const selectCorLogoVisitante = document.getElementById('selectCorLogoVisitante');

btnAplicar.addEventListener('click', () => {
    logoCasa.parentElement.style.backgroundColor = selectCorLogoCasa.value;

    logoVisitante.parentElement.style.backgroundColor = selectCorLogoVisitante.value;
});

const btnGolCasa = document.getElementById('btnGolCasa');
const btnGolCasaMenos = document.getElementById('btnGolCasaMenos');
const btnGolVisitante = document.getElementById('btnGolVisitante');
const btnGolVisitanteMenos = document.getElementById('btnGolVisitanteMenos');

function animacaoGol(elemento) {
    elemento.classList.add('gol-animation');
    setTimeout(() => {
        elemento.classList.remove('gol-animation');
    }, 1000);
}

btnGolCasa.addEventListener('click', () => {
    golsCasa.textContent = parseInt(golsCasa.textContent) + 1;
    animacaoGol(golsCasa);
});

btnGolCasaMenos.addEventListener('click', () => {
    const valorAtual = parseInt(golsCasa.textContent);
    if (valorAtual > 0) {
        golsCasa.textContent = valorAtual - 1;
    }
});

btnGolVisitante.addEventListener('click', () => {
    golsVisitante.textContent = parseInt(golsVisitante.textContent) + 1;
    animacaoGol(golsVisitante);
});

btnGolVisitanteMenos.addEventListener('click', () => {
    const valorAtual = parseInt(golsVisitante.textContent);
    if (valorAtual > 0) {
        golsVisitante.textContent = valorAtual - 1;
    }
});

const btnIniciarCronometro = document.getElementById('btnIniciarCronometro');
const btnPausarCronometro = document.getElementById('btnPausarCronometro');
const btnZerarCronometro = document.getElementById('btnZerarCronometro');
const selectTempo = document.getElementById('selectTempo');
let cronometroInterval = null;
let segundos = 0;
let inicioCronometro = null;

function atualizarTempoJogo() {
    const tempoSelecionado = selectTempo.value;
    let textoTempo;

    if (tempoSelecionado === '1') {
        textoTempo = '1º';
    } else if (tempoSelecionado === '2') {
        textoTempo = '2º';
    } else if (tempoSelecionado === '1P') {
        textoTempo = '1ºP';
    } else if (tempoSelecionado === '2P') {
        textoTempo = '2ºP';
    } else {
        textoTempo = tempoSelecionado;
    }

    const tempoBox = document.getElementById('tempoJogo');
    const cronometro = document.getElementById('cronometro');

    if (tempoSelecionado !== 'Intervalo' && tempoSelecionado !== 'Pênaltis') {
        tempoBox.textContent = textoTempo;
        tempoBox.style.display = 'flex';
        cronometro.style.display = 'block';
    } else {
        tempoBox.textContent = '';
        tempoBox.style.display = 'none';
        cronometro.textContent = textoTempo;
        segundos = 0;
    }
}

function atualizarCronometro() {
    if (!inicioCronometro) {
        return;
    }

    const agora = new Date();
    const diferenca = Math.floor((agora - inicioCronometro) / 1000);
    const minutos = Math.floor(diferenca / 60);
    const segundosRestantes = diferenca % 60;

    const cronometro = document.getElementById('cronometro');
    cronometro.textContent = `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;

    if (cronometroInterval) {
        requestAnimationFrame(atualizarCronometro);
    }
}

btnEditarCronometro.addEventListener('click', () => {
    const valor = inputCronometro.value.trim();
    const regex = /^[0-5]?\d:[0-5]\d$/;

    if (regex.test(valor)) {
        const [minutos, segundosRestantes] = valor.split(':').map(Number);
        segundos = minutos * 60 + segundosRestantes;
        inicioCronometro = new Date() - segundos * 1000;

        const cronometro = document.getElementById('cronometro');
        cronometro.textContent = valor;
    } else {
        alert('Por favor, insira um valor válido no formato MM:SS.');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    atualizarTempoJogo();
});

btnIniciarCronometro.addEventListener('click', () => {
    if (!cronometroInterval) {
        inicioCronometro = new Date() - segundos * 1000;
        cronometroInterval = true;
        requestAnimationFrame(atualizarCronometro);
    }
});

btnPausarCronometro.addEventListener('click', () => {
    cronometroInterval = null;

    const agora = new Date();
    segundos = Math.floor((agora - inicioCronometro) / 1000);
});

btnZerarCronometro.addEventListener('click', () => {
    cronometroInterval = null;
    segundos = 0;
    inicioCronometro = null;

    const cronometro = document.getElementById('cronometro');
    cronometro.textContent = '00:00';
});

selectTempo.addEventListener('change', atualizarTempoJogo);

document.addEventListener('DOMContentLoaded', () => {
    atualizarTempoJogo();
});
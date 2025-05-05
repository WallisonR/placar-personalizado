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
    // Carregar a logo do Time Casa
    const fileCasa = inputLogoCasa.files[0];
    if (fileCasa) {
        const readerCasa = new FileReader();
        readerCasa.onload = (e) => {
            logoCasa.src = e.target.result; // Define a imagem carregada como a logo
        };
        readerCasa.readAsDataURL(fileCasa);
    }

    // Carregar a logo do Time Visitante
    const fileVisitante = inputLogoVisitante.files[0];
    if (fileVisitante) {
        const readerVisitante = new FileReader();
        readerVisitante.onload = (e) => {
            logoVisitante.src = e.target.result; // Define a imagem carregada como a logo
        };
        readerVisitante.readAsDataURL(fileVisitante);
    }
});

// Elementos para controle de cor
const selectCorLogoCasa = document.getElementById('selectCorLogoCasa');
const selectCorLogoVisitante = document.getElementById('selectCorLogoVisitante');

// Atualizar a cor de fundo das logos ao clicar no botão "Aplicar Alterações"
btnAplicar.addEventListener('click', () => {
    // Atualizar a cor de fundo da logo do Time Casa
    logoCasa.parentElement.style.backgroundColor = selectCorLogoCasa.value;

    // Atualizar a cor de fundo da logo do Time Visitante
    logoVisitante.parentElement.style.backgroundColor = selectCorLogoVisitante.value;
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
let cronometroInterval = null;
let segundos = 0;
let inicioCronometro = null; // Armazena o timestamp do início do cronômetro

// Atualizar o tempo de jogo no placar
function atualizarTempoJogo() {
    const tempoSelecionado = selectTempo.value;
    let textoTempo;

    if (tempoSelecionado === '1') {
        textoTempo = '1º';
    } else if (tempoSelecionado === '2') {
        textoTempo = '2º';
    } else if (tempoSelecionado === '1P') {
        textoTempo = '1ºP'; // Primeiro tempo da prorrogação
    } else if (tempoSelecionado === '2P') {
        textoTempo = '2ºP'; // Segundo tempo da prorrogação
    } else {
        textoTempo = tempoSelecionado; // Intervalo ou Pênaltis
    }

    const tempoBox = document.getElementById('tempoJogo');
    const cronometro = document.getElementById('cronometro');

    if (tempoSelecionado !== 'Intervalo' && tempoSelecionado !== 'Pênaltis') {
        tempoBox.textContent = textoTempo; // Exibe o tempo na nova caixa
        tempoBox.style.display = 'flex'; // Mostra a tempo-box
        cronometro.style.display = 'block'; // Mostra o cronômetro
    } else {
        tempoBox.textContent = ''; // Limpa a nova caixa
        tempoBox.style.display = 'none'; // Oculta a tempo-box
        cronometro.textContent = textoTempo; // Exibe "Intervalo" ou "Pênaltis" no lugar do cronômetro
        segundos = 0; // Reseta os segundos
    }
}

function atualizarCronometro() {
    if (!inicioCronometro) {
        return; // Interrompe a execução se o cronômetro foi zerado
    }

    const agora = new Date();
    const diferenca = Math.floor((agora - inicioCronometro) / 1000); // Calcula a diferença em segundos
    const minutos = Math.floor(diferenca / 60);
    const segundosRestantes = diferenca % 60;

    // Atualiza o valor do cronômetro
    const cronometro = document.getElementById('cronometro');
    cronometro.textContent = `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;

    // Continua chamando a função para garantir que o cronômetro funcione em segundo plano
    if (cronometroInterval) {
        requestAnimationFrame(atualizarCronometro);
    }
}

// Atualizar o cronômetro e tempo ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    atualizarTempoJogo(); // Atualiza o tempo de jogo ao abrir o projeto
});

// Iniciar o cronômetro
btnIniciarCronometro.addEventListener('click', () => {
    if (!cronometroInterval) {
        inicioCronometro = new Date() - segundos * 1000; // Ajusta o início com base no tempo já decorrido
        cronometroInterval = true; // Marca que o cronômetro está ativo
        requestAnimationFrame(atualizarCronometro); // Usa requestAnimationFrame para atualizar o cronômetro
    }
});

// Pausar o cronômetro
btnPausarCronometro.addEventListener('click', () => {
    cronometroInterval = null; // Para o cronômetro

    // Calcula o tempo decorrido até o momento da pausa
    const agora = new Date();
    segundos = Math.floor((agora - inicioCronometro) / 1000);
});

// Zerar o cronômetro
btnZerarCronometro.addEventListener('click', () => {
    // Para o cronômetro
    cronometroInterval = null;
    segundos = 0;
    inicioCronometro = null;

    // Atualiza o cronômetro na interface principal
    const cronometro = document.getElementById('cronometro');
    cronometro.textContent = '00:00';
});

// Atualizar o tempo no placar ao mudar o select de tempo
selectTempo.addEventListener('change', atualizarTempoJogo);

// Atualizar o cronômetro e tempo ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    atualizarTempoJogo(); // Atualiza o tempo de jogo ao abrir o projeto
});
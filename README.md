# Placar de Futebol Personalizado para OBS

Este é um projeto de **placar de futebol personalizado** desenvolvido para ser utilizado em transmissões ao vivo no **OBS Studio**. Ele permite configurar nomes, logos, placar, tempo de jogo e status da partida de forma dinâmica.

## 🚀 Funcionalidades

- **Configuração de Times**:
  - Alterar os nomes dos times.
  - Adicionar logos dos times via upload.
  - Alterar a cor de fundo das logos dos times (opções predefinidas: Azul, Vermelho, Preto, Branco, Verde, Amarelo).
- **Controle do Placar**:
  - Adicionar ou remover gols para cada time.
  - Animação ao marcar gols.
  - Números do placar com fonte personalizada e destaque.
- **Cronômetro**:
  - Iniciar, pausar e zerar o cronômetro.
  - Atualização automática do tempo no placar.
- **Tempo de Jogo**:
  - Selecionar o tempo de jogo (1º Tempo, 2º Tempo, Intervalo, 1º Tempo da Prorrogação, 2º Tempo da Prorrogação, Pênaltis).
  - Exibição dinâmica de tempos da prorrogação como `1ºT´P` e `2ºT´P`.
- **Status da Partida**:
  - Atualizar o status da partida (ex.: "Ao vivo", "Encerrado").
- **Painel de Controle**:
  - Interface para configurar todas as opções de forma intuitiva.
  - Botão de controle reposicionado para não interferir no layout do OBS.
- **Chroma Key**:
  - Fundo verde puro (`#00FF00`) para integração perfeita com o filtro de chroma key no OBS.

## 🖼️ Layout

O layout do placar é responsivo e foi projetado para se integrar perfeitamente em transmissões ao vivo. Ele inclui:
- Logos dos times (com upload e personalização de cor de fundo).
- Placar centralizado com números destacados.
- Tempo de jogo e status da partida.


## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura do projeto.
- **CSS3**: Estilização e responsividade.
- **JavaScript**: Funcionalidades dinâmicas, como controle do placar e cronômetro.

## 📦 Como Usar

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/WallisonR/placar-personalizado.git
   cd placar-personalizado
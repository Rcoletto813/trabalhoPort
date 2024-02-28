window.alert("Clique no botão abaixo para começar o jogo!")

const frases = {
  "Vou ir embora": "0", // denotativas
  "Coração de pedra": "1", // conotativas
  "O sol está brilhando": "0", // denotativas
  "O mar está agitado": "0", // denotativas
  "Ele tem um coração de ouro": "1", // conotativas
  "A chuva está caindo lá fora": "0", // denotativas
  "Ela tem um sorriso radiante": "1", // conotativas
  "O pássaro voa alto no céu": "0", // denotativas
  "A montanha é majestosa e imponente": "1", // conotativas
  "O livro está sobre a mesa": "0", // denotativas
  "O céu está estrelado": "0", // denotativas
  "O vento sopra suavemente": "0", // denotativas
  "A água é essencial para a vida": "0", // denotativas
  "A felicidade é um estado de espírito": "1", // conotativas
  "O fogo aquece o ambiente": "0", // denotativas
  "A noite é escura": "0", // denotativas
  "A música é uma forma de expressão": "0", // denotativas
  "O gelo derrete quando aquecido": "0", // denotativas
  "A lua brilha no céu à noite": "0", // denotativas
  "O amor é um sentimento profundo": "1", // conotativas
  "As estrelas pontilham o céu": "0", // denotativas
  "O tempo voa quando estamos nos divertindo": "1", // conotativas
  "A solidão pode ser dolorosa": "1", // conotativas
  "A primavera traz vida à natureza": "0", // denotativas
  "O outono é uma estação de transição": "0", // denotativas
  "O inverno traz o frio e a neve": "0", // denotativas
  "O verão é quente e ensolarado": "0", // denotativas
  "O riso é contagioso": "1", // conotativas
  "A água cristalina é refrescante": "0", // denotativas
  "As flores desabrocham na primavera": "0", // denotativas
  "O silêncio pode ser reconfortante": "1", // conotativas
  "A coragem é necessária para enfrentar desafios": "0", // denotativas
  "A esperança nos mantém perseverantes": "1", // conotativas
  "A dor nos ensina lições valiosas": "1", // conotativas
  "A paciência é uma virtude": "1", // conotativas
  "A perseverança leva ao sucesso": "1", // conotativas
  "A beleza está nos olhos de quem vê": "1", // conotativas
  "A liberdade é um direito fundamental": "1", // conotativas
  "A honestidade é a melhor política": "1", // conotativas
  "A vida é uma jornada cheia de surpresas": "1", // conotativas
  "A gratidão nos faz apreciar mais a vida": "1", // conotativas
  "A gentileza é uma qualidade admirável": "1", // conotativas
  "A amizade é um tesouro precioso": "1", // conotativas
  "O perdão nos liberta do ressentimento": "1", // conotativas
  "A fé nos dá esperança nos momentos difíceis": "1", // conotativas
  "A alegria contagia os que estão ao nosso redor": "1", // conotativas
  "A tristeza faz parte da experiência humana": "1", // conotativas
  "A humildade nos torna mais tolerantes": "1", // conotativas
  "O conhecimento é poder": "1", // conotativas
  "A educação é a chave para um futuro melhor": "1", // conotativas
  "A compaixão nos aproxima dos outros": "1", // conotativas
  "O respeito é fundamental em qualquer relacionamento": "1", // conotativas
  "A comunicação é essencial para o entendimento mútuo": "1", // conotativas
  "A criatividade nos permite encontrar soluções inovadoras": "1", // conotativas
  "A generosidade aquece o coração": "1", // conotativas
  "A determinação nos ajuda a superar obstáculos": "1", // conotativas
  "A honestidade nos faz pessoas confiáveis": "1", // conotativas
  "A curiosidade nos impulsiona a buscar conhecimento": "1", // conotativas
  "A liberdade de expressão é um direito humano fundamental": "1", // conotativas
};

let frasesSorteadas = [];

var audioAcerto = new Audio("SomCerto.mp3");
var audioErro = new Audio("SomErrado.mp3");

const frasesPareadas = Object.entries(frases); // Converte o objeto em uma matriz de pares chave-valor

const campoFrase = document.querySelector("#fraseJulgar");
const pontuacao = document.querySelector("#pontuação");

const tempoTotal = 30;
let tempoRestante = tempoTotal;

let pontos = 0;
let resposta;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function carregarFrase() {
  let fraseIndex; // Declaração de fraseIndex fora do loop

  while (true) {
    fraseIndex = Math.floor(Math.random() * frasesPareadas.length);
    let sorteada = false;

    for (var i = 0; i < frasesSorteadas.length; i++) {
      if (frasesSorteadas[i] == fraseIndex) {
        sorteada = true;
        break;
      }
    }

    if (!sorteada) {
      // A frase não foi sorteada anteriormente
      break;
    }
  }

  const [frase, res] = frasesPareadas[fraseIndex];
  campoFrase.value = frase;
  resposta = res;
  frasesSorteadas.push(fraseIndex);
}

function btnResposta(btnValor) {
  // btnValor = 0 ---> denotativa |||| btnValor = 1 ---> conotativa
  if (btnValor == resposta) {
    pontos += 2;
    audioAcerto.play();
    if (resposta == 0) {
      document.getElementById("corretoDeno").style.opacity = 1;
      sleep(300).then(() => {
        document.getElementById("corretoDeno").style.opacity = 0;
      });
    } else {
      document.getElementById("corretoCono").style.opacity = 1;
      sleep(300).then(() => {
        document.getElementById("corretoCono").style.opacity = 0;
      });
    }
  } else {
    pontos -= 1;
    audioErro.play();
    if (resposta == 0) {
      document.getElementById("erradoCono").style.opacity = 1;
      sleep(300).then(() => {
        document.getElementById("erradoCono").style.opacity = 0;
      });
    } else {
      document.getElementById("erradoDeno").style.opacity = 1;
      sleep(300).then(() => {
        document.getElementById("erradoDeno").style.opacity = 0;
      });
    }
  }
  pontuacao.textContent = pontos;

  carregarFrase();
}


// Função para atualizar o cronômetro
function atualizarCronometro() {
  const tempoLabel = document.querySelector("#tempo")

  // Converte o tempo restante para minutos e segundos
  const minutos = Math.floor(tempoRestante / 60);
  const segundos = tempoRestante % 60;

  // Formata os minutos e segundos para exibir com dois dígitos
  const minutosFormatados = String(minutos).padStart(2, '0');
  const segundosFormatados = String(segundos).padStart(2, '0');

  // Exibe o tempo restante
  tempoLabel.textContent = minutosFormatados + ":" + segundosFormatados
  console.log(`Tempo restante: ${minutosFormatados}:${segundosFormatados}`);

  // Verifica se o tempo restante chegou a zero
  if (tempoRestante === 0) {
    clearInterval(intervalID); // Para o cronômetro
    exibirModal();
  } else {
    tempoRestante--; // Decrementa o tempo restante
  }
}

function exibirModal() {
  const modal = new bootstrap.Modal(document.getElementById('fim')); // Seleciona o modal usando Bootstrap
  modal.show(); // Exibe o modal
  document.querySelector("#pontFinal").textContent = pontos
}

function recarregar() {
  window.location.reload();
}

const intervalID = setInterval(atualizarCronometro, 1000);

carregarFrase();

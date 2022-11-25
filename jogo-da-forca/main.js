import Controlador from "./Controlador.class.mjs";
import Jogador from "./Jogador.class.mjs";
import Partida from "./Partida.class.mjs";

// const primeiraRodada = new Partida('paralelepipedo');
const jogador1 = new Jogador("Julia");
const jogador2 = new Jogador("Vitoria");
const jogador3 = new Jogador("Gabi");
const controlador = new Controlador(jogador1, jogador2, jogador3);

const botaoEnviarPalpite = document.getElementById("enviar-palpite");

botaoEnviarPalpite.addEventListener("click", function () {
  const inputDoPalpite = document.getElementById("palpite");

  controlador.processarPalpite(inputDoPalpite.value);

  inputDoPalpite.value = "";
});

const botaoReiniciar = document.getElementById("reiniciar");

botaoReiniciar.addEventListener(
  "click",
  controlador.reiniciar.bind(controlador)
);

// const posicaoPrimeiroPalpite = primeiraRodada.posicaoDaLetraSeElaExistir('a');
// console.log(posicaoPrimeiroPalpite); // retorno esperado: [1, 3]
// console.log(primeiraRodada.tentativasRestantes); // retorno esperado: 10

// const posicaoSegundoPalpite = primeiraRodada.posicaoDaLetraSeElaExistir('a');
// console.log(posicaoSegundoPalpite); // retorno esperado: console.log('Esse palpite já foi dado') + []

// const posicaoTerceiroPalpite = primeiraRodada.posicaoDaLetraSeElaExistir('z');
// console.log(posicaoTerceiroPalpite); // retorno esperado: []
// console.log(primeiraRodada.tentativasRestantes); // retorno esperado: 9
// console.log(primeiraRodada.letrasErradas); // retorno esperado: ['z']

// primeiraRodada.resetTudo()
// console.log(primeiraRodada.tentativasRestantes) // Esperado: 10
// console.log(primeiraRodada.letrasErradas) // Esperado: []

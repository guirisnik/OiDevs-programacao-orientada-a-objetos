import Partida from "./Partida.class.mjs";

const primeiraRodada = new Partida('paralelepipedo');

const posicaoPrimeiroPalpite = primeiraRodada.posicaoDaLetraSeElaExistir('a');
console.log(posicaoPrimeiroPalpite); // retorno esperado: [1, 3]
console.log(primeiraRodada.tentativasRestantes); // retorno esperado: 10

const posicaoSegundoPalpite = primeiraRodada.posicaoDaLetraSeElaExistir('a');
console.log(posicaoSegundoPalpite); // retorno esperado: console.log('Esse palpite já foi dado') + []

const posicaoTerceiroPalpite = primeiraRodada.posicaoDaLetraSeElaExistir('z');
console.log(posicaoTerceiroPalpite); // retorno esperado: []
console.log(primeiraRodada.tentativasRestantes); // retorno esperado: 9
console.log(primeiraRodada.letrasErradas); // retorno esperado: ['z']


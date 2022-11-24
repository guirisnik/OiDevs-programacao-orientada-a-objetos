import PalpiteErradoError from "./PalpiteErrado.error.mjs";
import PalpiteJaFoiDadoError from "./PalpiteJaFoiDado.error.mjs";

export default class Partida {
  #palavra = "";
  #tentativasRestantes = 10;
  #letrasCertas = [];
  #letrasErradas = [];

  constructor(palavra) {
    this.#palavra = palavra;
    // this.#tentativas = 10; -> Poderia ser assim também em vez da linha (3)
  }

  // string.includes(char) -> Verifica se existe dentro da string;
  posicaoDaLetraSeElaExistir(letra) {
    const letraFormatada = letra.toLowerCase();
    if (
      this.#letrasCertas.includes(letraFormatada) ||
      this.#letrasErradas.includes(letraFormatada)
    ) {
      const erro = new PalpiteJaFoiDadoError("Esse palpite já foi dado");
      throw erro;
      // console.log('Esse palpite já foi dado');
      // return [];
    }

    if (this.#palavra.includes(letraFormatada)) {
      //se a letra existir
      this.#letrasCertas.push(letraFormatada);
      const posicoes = [];
      this.#palavra.split("").forEach((elemento, indice) => {
        if (elemento === letraFormatada) {
          posicoes.push(indice); //coloca o indice da letra
        }
      });
      return posicoes;
    } else {
      this.#letrasErradas.push(letraFormatada);
      this.#tentativasRestantes -= 1;
      const erro = new PalpiteErradoError("Este palpite não está no palavra");
      throw erro;
    }
  }

  get tentativasRestantes() {
    return this.#tentativasRestantes;
  }

  get letrasErradas() {
    return this.#letrasErradas;
  }

  get totalDeLetrasDaPalavra() {
    return this.#palavra.length;
  }

  resetTudo() {
    this.#letrasErradas = [];
    this.#letrasCertas = [];
    this.#tentativasRestantes = 10;
  }

  palavraCorresponde(palavra) {
    return this.#palavra === palavra;
  }
}

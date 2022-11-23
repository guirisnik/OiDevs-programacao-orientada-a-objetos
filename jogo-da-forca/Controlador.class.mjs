import Partida from "./Partida.class.mjs";

export default class Controlador {
  #partida;
//   #espacosDasLetras;

  constructor() {
    this.#partida = new Partida("paralelepipedo");

    this.#renderizarEspacosDasLetras();
    // this.#espacosDasLetras = this.#renderizarEspacosDasLetras()
  }

  #renderizarEspacosDasLetras() {
    const quantidadeDeEspacos = this.#partida.totalDeLetrasDaPalavra;
    let divs = "";
    for (let index = 0; index < quantidadeDeEspacos; index++) {
      divs += `<div id="espaco-${index}" class="letra"></div>`;
    }
    document.querySelector(".container-da-palavra").innerHTML = divs;

    // let divs = [];
    // for (let index = 0; index < quantidadeDeEspacos; index++) {
    //   const divEspaco = document.createElement('div')
    //   divEspaco.id = `espaco-${index}`;
    //   divEspaco.classList.add('letra')
    //   divs.push(divEspaco)
    // }
    // document.querySelector(".container-da-palavra").append(...divs);
    // return divs;
  }

  processarPalpite(palpite) {
    if(palpite.length === 1) {
        const posicoes = this.#partida.posicaoDaLetraSeElaExistir(palpite)

        posicoes.forEach(index => this.#revelarLetra(palpite, index));
    }
  }

  #revelarLetra(letra, index) {
    document.getElementById(`espaco-${index}`).innerText = letra
    // this.#renderizarEspacosDasLetras[index].innerText = letra
  }
}

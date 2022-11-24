import PalpiteErradoError from "./PalpiteErrado.error.mjs";
import PalpiteJaFoiDadoError from "./PalpiteJaFoiDado.error.mjs";
import Partida from "./Partida.class.mjs";

export default class Controlador {
  #partida;
  //   #espacosDasLetras;

  constructor() {
    this.#partida = new Partida("paralelepipedo");

    this.#renderizarEspacosDasLetras();
    this.#renderizarTentativasRestantes();
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
    if (palpite.length === 0) alert("Palpites vazios não são permitidos");
    else if (palpite.length === 1) {
      try {
        const posicoes = this.#partida.posicaoDaLetraSeElaExistir(palpite);

        posicoes.forEach((index) => this.#revelarLetra(palpite, index));
      } catch (error) {
        if (error instanceof PalpiteErradoError) {
          this.#renderizarTentativasRestantes();
          this.#renderizarLetrasErradas();
        } else if (error instanceof PalpiteJaFoiDadoError) {
          alert(error.message);
        } else {
          console.error(error);
        }
      }
    } else if (palpite.length > 1) {
      const ehAPalavraCorreta = this.#partida.palavraCorresponde(palpite);

      if (ehAPalavraCorreta) {
        palpite.split("").forEach(this.#revelarLetra);
        this.#desabilitarPalpites();
        alert("Parabéns! Você ganhou! :D");
      } else {
        alert("Palavra está incorreta! Tente novamente");
      }
    }

    if (this.#partida.tentativasRestantes === 0) this.#desabilitarPalpites();
  }

  #renderizarTentativasRestantes() {
    const elementoTentativasRestantes = document.getElementById(
      "tentativas-restantes"
    );

    if (this.#partida.tentativasRestantes > 1)
      elementoTentativasRestantes.innerHTML = `${
        this.#partida.tentativasRestantes
      } tentativas restantes`;
    else if (this.#partida.tentativasRestantes === 1)
      elementoTentativasRestantes.innerHTML = `${
        this.#partida.tentativasRestantes
      } tentativa restante`;
    else elementoTentativasRestantes.innerHTML = `Você perdeu`;
  }

  #desabilitarPalpites() {
    this.#interruptorDePalpites(false);
  }

  #habilitarPalpites() {
    this.#interruptorDePalpites(true);
  }

  #interruptorDePalpites(estado) {
    const inputDoPalpite = document.getElementById("palpite");
    const botaoEnviarPalpite = document.getElementById("enviar-palpite");

    if (estado === false) {
      inputDoPalpite.setAttribute("disabled", estado);
      botaoEnviarPalpite.setAttribute("disabled", estado);
    } else {
      inputDoPalpite.removeAttribute("disabled");
      botaoEnviarPalpite.removeAttribute("disabled");
    }
  }

  #renderizarLetrasErradas() {
    const elementoLetrasErradas = document.getElementById("letras-erradas");

    elementoLetrasErradas.innerHTML = this.#partida.letrasErradas.join(", ");
  }

  #revelarLetra(letra, index) {
    document.getElementById(`espaco-${index}`).innerText = letra;
    // this.#renderizarEspacosDasLetras[index].innerText = letra
  }

  reiniciar() {
    this.#partida.resetTudo();
    this.#habilitarPalpites();
    this.#renderizarLetrasErradas();
    this.#renderizarEspacosDasLetras();
    this.#renderizarTentativasRestantes();
  }
}

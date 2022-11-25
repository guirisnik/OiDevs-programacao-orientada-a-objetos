import Jogador from "./Jogador.class.mjs";
import PalpiteErradoError from "./PalpiteErrado.error.mjs";
import PalpiteJaFoiDadoError from "./PalpiteJaFoiDado.error.mjs";
import Partida from "./Partida.class.mjs";

export default class Controlador {
  #partida;
  #jogadores = [new Jogador()];
  #jogadorDaVez = 0;
  //   #espacosDasLetras;

  constructor(...jogadores) {
    this.#partida = new Partida("paralelepipedo");
    this.#jogadores = jogadores;

    this.#renderizarEspacosDasLetras();
    this.#renderizarTentativasRestantes();
    this.#renderizarJogadores();

    document.getElementById("jogador-0").classList.add("jogador-da-vez");
    // this.#espacosDasLetras = this.#renderizarEspacosDasLetras()
  }

  #rotacionarJogadorDaVez() {
    document
      .getElementById(`jogador-${this.#jogadorDaVez}`)
      .classList.remove("jogador-da-vez");

    do {
      this.#jogadorDaVez = (this.#jogadorDaVez + 1) % this.#jogadores.length;
    } while (this.#jogadores[this.#jogadorDaVez].perdeu);

    document
      .getElementById(`jogador-${this.#jogadorDaVez}`)
      .classList.add("jogador-da-vez");
  }

  #renderizarJogadores() {
    document.getElementById("jogadores").innerHTML = this.#jogadores
      .map((jogador, index) => {
        return jogador.perdeu
          ? `<li class="jogador-perdeu" id="jogador-${index}">${jogador.nome}: ${jogador.pontos} pontos</li>`
          : `<li id="jogador-${index}">${jogador.nome}: ${jogador.pontos} pontos</li>`;
      })
      .join("");
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

        this.#jogadores[this.#jogadorDaVez].adicionarPontos(1);
        this.#renderizarJogadores();
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

      this.#rotacionarJogadorDaVez();
    } else if (palpite.length > 1) {
      const ehAPalavraCorreta = this.#partida.palavraCorresponde(palpite);

      if (ehAPalavraCorreta) {
        palpite.split("").forEach(this.#revelarLetra);
        this.#desabilitarPalpites();
        alert("Parabéns! Você ganhou! :D");
        this.#jogadores[this.#jogadorDaVez].adicionarPontos(5);
        this.#renderizarJogadores();
      } else {
        document
          .getElementById(`jogador-${this.#jogadorDaVez}`)
          .classList.add("jogador-perdeu");
        this.#jogadores[this.#jogadorDaVez].perdeu = true;
        alert("Palavra está incorreta! Você perdeu :(");
        this.#rotacionarJogadorDaVez();
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

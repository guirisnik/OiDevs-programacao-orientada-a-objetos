export default class Jogador {
  #nome;
  #pontos = 0;
  #perdeu = false;

  constructor(nome) {
    this.#nome = nome;
  }

  adicionarPontos(pontos) {
    if (!Number.isInteger(pontos))
      throw new Error("Pontos precisam ser números inteiros");
    if (pontos < 0) throw new Error("Pontos precisam ser números positivos");

    this.#pontos += pontos;
  }

  get perdeu() {
    return this.#perdeu;
  }

  set perdeu(estado) {
    if (typeof estado !== "boolean")
      throw new Error("Estado precisa ser um booleano");

    this.#perdeu = estado;
  }

  get nome() {
    return this.#nome;
  }

  get pontos() {
    return this.#pontos;
  }
}

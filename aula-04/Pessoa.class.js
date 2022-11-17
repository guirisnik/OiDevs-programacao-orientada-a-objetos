class Pessoa {
  #nome;
  altura;
  peso;

  constructor(nome, altura, peso) {
    this.#nome = nome;
    this.altura = altura;
    this.peso = peso;
  }

  apresentacao() {
    return `Oi, meu nome é ${this.#nome}, tenho ${this.altura}m e peso ${
      this.peso
    }kg`;
  }
}

module.exports = Pessoa;

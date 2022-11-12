const { Documento } = require("./Endereco.class");

class Usuario {
  #nomeCompleto;
  #dataDeNascimento;
  #documento;
  #endereco;

  constructor({
    nomeCompleto = "",
    dataDeNascimento = new Date(),
    documento = new Documento("RG", ""),
  } = {}) {
    this.#nomeCompleto = nomeCompleto;
    this.#dataDeNascimento = dataDeNascimento;

    if (!documento instanceof Documento) throw "Parametro documento inválido.";

    this.#documento = documento;
  }

  inserirEndereco(endereco) {
    this.#endereco = endereco;
  }

  get endereco() {
    return this.#endereco;
  }
}

module.exports = Usuario;

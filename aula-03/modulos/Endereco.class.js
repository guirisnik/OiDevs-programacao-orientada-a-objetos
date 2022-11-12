class Endereco {
  #logradouro;
  #numero;
  #cep;
  #cidade;
  #estado;
  #complemento;

  constructor(logradouro, numero, cep, cidade, estado, complemento = "") {
    this.#logradouro = logradouro;
    this.#numero = numero;
    this.#cep = cep;
    this.#cidade = cidade;
    this.#estado = estado;
    this.#complemento = complemento;
  }

  set complemento(novoComplemento) {
    this.#complemento = novoComplemento;
  }
}

class Documento {
  #tipo;
  #numero;

  static documentosAceitos() {
    return ["RG", "CPF", "CNH"];
  }

  constructor(tipo, numero) {
    if (!Documento.documentosAceitos().includes(tipo))
      throw "Tipo de documento não é aceito.";

    this.#tipo = tipo;
    this.#numero = numero;
  }
}

module.exports = { Documento, Endereco };

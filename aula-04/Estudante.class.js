const Pessoa = require("./Pessoa.class");

class Estudante extends Pessoa {
  curso;

  constructor(nome, altura, peso, curso) {
    super(nome, altura, peso);
    this.curso = curso;
  }
}

module.exports = Estudante;

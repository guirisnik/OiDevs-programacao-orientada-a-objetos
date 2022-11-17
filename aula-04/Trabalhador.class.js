const Pessoa = require("./Pessoa.class");

class Trabalhador extends Pessoa {
  salario;

  constructor(nome, altura, peso, salario) {
    super(nome, altura, peso);
    this.salario = salario;
  }

  apresentacao() {
    return `${super.apresentacao()}. Eu ganho R$${this.salario} por mês`
  }
}

module.exports = Trabalhador;

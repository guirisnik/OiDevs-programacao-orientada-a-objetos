const Pessoa = require("./Pessoa.class");
const Trabalhador = require("./Trabalhador.class");
const Estudante = require("./Estudante.class");

Pessoa.prototype.calcularImc = function () {
  return this.peso / Math.pow(this.altura, 2);
};

const pessoa = new Pessoa("Guilherme", 1.74, 61);
const trabalhadora = new Trabalhador("Gabi", 1.7, 55, 20000);
const estudante = new Estudante("Julia", 1.65, 53, "Ciência da Computação");

console.log(trabalhadora instanceof Trabalhador);
console.log(trabalhadora instanceof Pessoa);

function apresentarPessoa(pessoa) {
  if (!pessoa instanceof Pessoa) throw "Não é uma pessoa";

  console.log(pessoa.apresentacao());
}

apresentarPessoa(trabalhadora);
apresentarPessoa(estudante);

console.log(pessoa.calcularImc());
console.log(trabalhadora.calcularImc());
console.log(estudante.calcularImc());

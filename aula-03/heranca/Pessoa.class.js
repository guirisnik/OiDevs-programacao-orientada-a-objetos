class Pessoa {
  #nome;
  #idade;
  #peso;
  #altura;

  static numeroDePessoas = 0;

  constructor(nome, idade, peso, altura) {
    this.#nome = nome;
    this.#idade = idade;
    this.#peso = peso;
    this.#altura = altura;
  }

  static oi() {
    console.log("oi");
  }

  calcularImc() {
    return this.#peso / Math.pow(this.#altura, 2);
  }

  get nome() {
    return this.#nome;
  }

  set nome(novoNome) {
    this.#nome = novoNome;
  }

  apresentacao() {
    console.log(`Oi, meu nome é ${this.nome}.`);
  }
}

class Trabalhador extends Pessoa {
  #salario;

  constructor(nome, idade, peso, altura, salario) {
    super(nome, idade, peso, altura);
    this.#salario = salario;
  }
}

class Estudante extends Pessoa {
  #curso;

  constructor(nome, idade, peso, altura, curso) {
    super(nome, idade, peso, altura);
    this.#curso = curso;
  }
}

class Programador extends Trabalhador {
  #linguagem;

  constructor(nome, idade, peso, altura, salario, linguagem) {
    super(nome, idade, peso, altura, salario);
    this.#linguagem = linguagem;
  }
}

// Trabalhador herda de Pessoa
const trabalhador = new Trabalhador("Guilherme", 29, 61, 1.74, 1000);

// Estudante herda de Pessoa
const estudante = new Estudante("Hélade", 25, 55, 1.7, "Programação");

// Programador herda de Trabalhador que herda de Pessoa
const programador = new Programador("Julia", 23, 53, 1.65, 15000, "JavaScript");

trabalhador.nome = "Joao";

console.log(trabalhador.nome);

trabalhador.apresentacao();
estudante.apresentacao();
programador.apresentacao();

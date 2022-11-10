class Pessoa {
  nome;
  sobrenome;
  #idade;
  #peso;
  #altura;

  static numeroDePessoas = 0;

  constructor(nome, sobrenome, idade, peso, altura) {
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.#idade = idade;
    this.#peso = peso;
    this.#altura = altura;
    Pessoa.numeroDePessoas += 1;
  }

  static criarDeUmObjeto(obj) {
    return new Pessoa(obj.nome, obj.sobrenome, obj.idade, obj.altura, obj.peso);
  }

  static oi() {
    console.log("oi :)");
  }

  get imc() {
    return this.#peso / Math.pow(this.#altura, 2);
  }

  get idade() {
    return `${this.#idade} anos`;
  }

  set peso(novoPeso) {
    this.#peso = novoPeso;
  }

  get peso() {
    return this.#peso;
  }
}

console.log(Pessoa.numeroDePessoas); // 0

const pessoa = new Pessoa("Guilherme", "Risnik", 29, 61, 1.74);

console.log(Pessoa.numeroDePessoas); // 1

const p = {
  nome: "Guilherme",
  sobrenome: "Risnik",
  idade: 29,
  peso: 30,
  altura: 1.74,
};

const pessoa2 = Pessoa.criarDeUmObjeto(p); // Cria instância de Pessoa usando método estático

console.log(pessoa2.imc);

console.log(pessoa.numeroDePessoas); // undefined

console.log(Pessoa.numeroDePessoas); // 2

console.log(pessoa.imc); // imc com peso = 61

pessoa.peso = 50;

console.log(pessoa.imc); // imc com novo peso = 50

class Pessoa {
  nome;
  sobrenome;
  idade;
  peso;
  altura;

  constructor(nome, sobrenome, idade, peso, altura) {
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.idade = idade;
    this.peso = peso;
    this.altura = altura;
  }

  apresentacao() {
    console.log(`Oi, meu nome é ${this.nome} e tenho ${this.idade} anos.`);
  }

  calcularImc() {
    return this.peso / Math.pow(this.altura, 2);
  }
}

const pessoa = new Pessoa("Guilherme", "Risnik", 29, 61, 1.74);

pessoa.apresentacao();

console.log(`O IMC de ${pessoa.nome} é ${pessoa.calcularImc()}`);

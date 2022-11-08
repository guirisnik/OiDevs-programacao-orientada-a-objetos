const pessoa = {
    nome: 'Guilherme',
    idade: 29,
    apresentacao: (nome, idade) => {
        console.log(`[meu objeto] Oi, meu nome é ${this.nome} e tenho ${this.idade} anos.`);
        console.log(`[parametros] Oi, meu nome é ${nome} e tenho ${idade} anos.`);
    }
}

pessoa.apresentacao('Paula', 21);
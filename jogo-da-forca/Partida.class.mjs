export default class Partida {
    #palavra = '';
    #tentativasRestantes = 10;
    #letrasCertas = [];
    #letrasErradas = [];

    constructor(palavra) {
        this.#palavra = palavra;
        // this.#tentativas = 10; -> Poderia ser assim também em vez da linha (3)
    }

    // string.includes(char) -> Verifica se existe dentro da string;
    posicaoDaLetraSeElaExistir(letra) {
        if(this.#letrasCertas.includes(letra) || this.#letrasErradas.includes(letra)) { // a letra ja foi usada
            // throw new Error();
            console.log('Esse palpite já foi dado');
            return [];
        } 

        if(this.#palavra.includes(letra)) { //se a letra existir
            this.#letrasCertas.push(letra);
            const posicoes = [];
            this.#palavra.split('').forEach((elemento, indice) => {
                if(elemento === letra) {
                    posicoes.push(indice); //coloca o indice da letra
                }
            });
            return posicoes;
        } else {
            this.#letrasErradas.push(letra);
            this.#tentativasRestantes -= 1;
            return [];
        }
    }

    get tentativasRestantes() {
        return this.#tentativasRestantes;
    }

    get letrasErradas() {
        return this.#letrasErradas;
    }

    get totalDeLetrasDaPalavra() {
        return this.#palavra.length;
    }

    resetTudo() {
        this.#letrasErradas = [];
        this.#letrasCertas = [];
        this.#tentativasRestantes = 10;
    }

    palavraCorresponde(palavra) {
        return this.#palavra === palavra;
    }
}
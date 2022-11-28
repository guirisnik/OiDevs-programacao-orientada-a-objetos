export class Comentario {
    #autor;
    #texto;

    constructor({ autor, texto }) {
        this.#autor = autor;
        this.#texto = texto;
    }

    get autor() {
        return this.#autor;
    }

    renderizar(
        usuarioSessao,
        indicePostagem,
        indiceComentario
    ) {
        return `<li class="ms-3 border-start border-3 border-success ps-2">
        <h6 class="d-flex align-items-center">
            ${this.#autor.nomeCompleto}
            ${this.#autor === usuarioSessao
                ? `<button class="btn btn-link text-danger p-0 ms-1" onclick="apagarComentario(${indicePostagem}, ${indiceComentario})"><i class="bi bi-trash3-fill"></i></button>`
                : ""
            }
        </h6>
        <p class="fst-italic">${this.#texto}</p>
    </li>
        `
    }
}
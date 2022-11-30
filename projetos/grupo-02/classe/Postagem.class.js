/*
A entidade `Postagem` deve ser capaz de:

- Apagar comentários;
- Modificar o título
- Modificar a descrição;
*/

import { Comentario } from "./Comentario.class.js";

export class Postagem {
    #autor;
    #texto;
    #data;
    #comentarios = [];
    static listaPostagens = [];

    constructor({ autor, texto }) {
        this.#autor = autor;
        this.#texto = texto;
        this.#data = Date.now();

        Postagem.listaPostagens.push(this);
        Postagem.listaPostagens.sort((a, b) => { return b.data - a.data });
    }

    get data() {
        return this.#data
    }

    get comentarios() {
        return this.#comentarios
    }

    get dataFormatada() {
        const data = new Date(this.#data);
        return `${data.toLocaleString("pt-BR", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
        })} às ${data.toLocaleString("pt-BR", {
            hour: "numeric",
            minute: "numeric",
        })}`;
    }

    get texto() {
        return this.#texto;
    }

    get autor() {
        return this.#autor;
    }

    adicionarComentario(texto, autor) {
        this.#comentarios.push(new Comentario({
            texto,
            autor
        }))
    }

    removerComentario(comentario) {
        const index = this.#comentarios.indexOf(comentario);

        if (index !== -1) {
            this.#comentarios.splice(index, 1);
        }
    }

    modificarTexto(texto) {
        this.#texto = texto
    }

    renderizarCard(usuarioSessao, indicePostagem) {
        return `<div class="card w-100 mt-3 shadow-sm">
        <div class="card-body">
            <div class="d-flex align-items-center mb-3 justify-content-between">
                <div class="d-flex">
                    <img src="${this.#autor.imagemPerfil
            }" class="rounded-circle me-3" height="45" alt="">
                    <div>
                        <h6 class="card-title m-0">${this.#autor.nomeCompleto
            }</h6>
                        <span class="text-muted fst-italic">${this.dataFormatada
            }</span>
                    </div>
                </div>
                ${usuarioSessao === this.#autor
                ? `
                            <div class="dropdown">
                                <button class="btn btn-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-three-dots-vertical"></i>
                                </button>
                                <ul class="dropdown-menu p-0">
                                    <li class=" border-1 border-bottom">
                                        <button type="button" class="btn btn-light w-100 border-1 rounded-0 rounded-top text-start" data-bs-toggle="modal" data-bs-target="#modal-editar-postagem" data-bs-id="${indicePostagem}">
                                            <i class="bi bi-pencil-fill"></i> Editar
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" class="btn btn-light w-100 border-0 rounded-0 rounded-bottom text-start" onclick="apagarPostagem('${indicePostagem}')">
                                            <i class="bi bi-trash3-fill"></i> Excluir
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        `
                : ""
            }
            </div>
            <p class="card-text">${this.#texto}</p>
            <hr>
            <h6 class="mb-3">Comentários (${this.#comentarios.length
            })</h6>
            <ul class="list-unstyled">
                        ${this.#comentarios
                .map((comentario, indiceComentario) =>
                    comentario.renderizar(
                        usuarioSessao,
                        indicePostagem,
                        indiceComentario
                    )
                )
                .join("")}
                    </ul>
            <form onsubmit="adicionarComentario(event)" data-indicePostagem="${indicePostagem}">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Digite seu comentário">
                    <button class="btn btn-success btn-novo-comentario" type="submit">Comentar</button>
                </div>
            </form>
        </div>
    </div>`
    }
}
/**
A entidade `Usuario` deve ser capaz de:

- Autenticar um usuário (verificar se nome de usuário e senha estão corretos);
- Adicionar outro usuário à lista de amigos;
- Remover outro usuário da lista de amigos;
- Criar uma postagem;
- Comentar uma postagem;
 */

import md5 from "../libs/md5.js";
import { Postagem } from "./Postagem.class.js";

export class Usuario {
  #estaAutenticado = false;
  #nomeCompleto;
  #senha;
  #usuario;
  #github;
  #amigos = [];
  static listaUsuarios = [];

  constructor({ nomeCompleto, senha, usuario, github = "" }) {
    if (
      Usuario.listaUsuarios.findIndex((usuarioCadastrado) => {
        return usuarioCadastrado.usuario === usuario;
      }) !== -1
    ) {
      throw new Error("Usuário já cadastrado!");
    }

    this.#nomeCompleto = nomeCompleto;
    this.#senha = md5(senha); //biblioteca para fazer o rash da senha
    this.#usuario = usuario;
    this.#github = github;

    Usuario.listaUsuarios.push(this);
  }

  get usuario() {
    return this.#usuario;
  }
  get estaAutenticado() {
    return this.#estaAutenticado;
  }
  get nomeCompleto() {
    return this.#nomeCompleto;
  }
  get imagemPerfil(){
    if(this.#github !== '') {
      return `https://github.com/${this.#github}.png`;
    }
    return './assets/usuario-padrao.jpg';
  }
  get amigos() {
    return this.#amigos;
  }

  //verifica se o usuarios existe e chama para autenticar
  static logar(usuario, senha) {
    const index = Usuario.listaUsuarios.findIndex((usuarioCadastrado) => {
      return usuarioCadastrado.usuario === usuario;
    });

    if (index === -1) throw new Error("Usuário não encontrado");

    return Usuario.listaUsuarios[index].autenticar(usuario, senha);
  }

  //verifica usuario e senha se estão corretos
  autenticar(usuario, senha) {
    if (usuario !== this.#usuario || md5(senha) !== this.#senha) {
      throw new Error("Usuário e/ou senha inválidos");
    }

    this.#estaAutenticado = true;
    return this;
  }

  desconectar() {
    this.#estaAutenticado = false;
  }

  ehAmigo(usuario) {
    const index = this.#amigos.indexOf(usuario);
    return index !== -1
  }

  adicionarAmigo(usuario) {
    this.#amigos.push(usuario);
  }

  removerAmigo(usuario) {
    const index = this.#amigos.indexOf(usuario);
    this.#amigos.splice(index, 1);
  }

  criarPostagem(texto) {
    if (!this.#estaAutenticado) {
      throw new Error("Usuário não está autorizado");
    }
    new Postagem({
      autor: this,
      texto,
    });
  }

  removerPostagem(postagem) {
    if (!this.#estaAutenticado) {
      throw new Error("Usuário não está autorizado");
    }
    const index = Postagem.listaPostagens.indexOf(postagem);
    Postagem.listaPostagens.splice(index, 1);
  }

  comentarPostagem(postagem, texto) {
    if (!this.#estaAutenticado) {
      throw new Error("Usuário não autorizado");
    }
    postagem.adicionarComentario(texto, this);
  }

  renderizarItemModal(usuarioSessao, ehAdministrador = false) {
    return `
        <li class="d-flex justify-content-between align-items-center mt-3 border-bottom pb-3">
            <div class="d-flex align-items-center">
                <img src="${this.imagemPerfil}" class="rounded-circle me-3"
                    height="50" width="50" alt="">
                <h6>${this.#nomeCompleto}</h6>
            </div>
            <div>
                ${
                    usuarioSessao !== this
                        ? this.ehAmigo(usuarioSessao)
                            ? `<button type="button" class="btn btn-outline-danger" onclick="removerAmigo('${
                                  this.#usuario
                              }')"><i class="bi bi-trash3-fill"></i> Remover amigo</button>`
                            : `<button type="button" class="btn btn-success" onclick="adicionarAmigo('${
                                  this.#usuario
                              }')"><i class="bi bi-person-plus-fill"></i> Adicionar</button>`
                        : ""
                }
                ${
                    usuarioSessao !== this
                        ? ehAdministrador
                            ? `<button type="button" class="btn btn-danger" onclick="removerUsuario('${
                                  this.#usuario
                              }')"><i class="bi bi-trash3-fill"></i> Excluir</button>`
                            : ""
                        : ""
                }
            </div>
        </li>
    `;
  }
}


import { Usuario } from "./classe/Usuario.class.js";
import { Postagem } from "./classe/Postagem.class.js";
import { Administrador } from "./classe/Administrador.class.js";

new Usuario({
  nomeCompleto: "Aline Pereira",
  senha: "12345",
  usuario: "alinepereira",
  github: "pereiraaline",
});

new Usuario({
  nomeCompleto: "Paula Herbella",
  senha: "12345",
  usuario: "paulaherbella",
  github: "paulaherbella",
});

new Usuario({
  nomeCompleto: "Miquéias Bastos",
  senha: "12345",
  usuario: "miqueiasbastos",
  github: "miqueiasbastos",
});

new Usuario({
  nomeCompleto: "Jady Godoi",
  senha: "12345",
  usuario: "jadygodoi",
  github: "jady-sm-godoi",
});
new Usuario({
  nomeCompleto: "Julia Biondi",
  senha: "12345",
  usuario: "juliabiondi",
  github: "biondij",
});

new Administrador({
  nomeCompleto: "Administrador",
  senha: "12345",
  usuario: "admin",
  github: "",
});

let usuarioSessao;
let ehAdministrador;

//FUNÇÃO PRINCIPAL PARA ATUALIZER A PÁGINA
const renderizarFeed = () => {
  //navbar
  const saudacao = document.querySelector('#header-saudacao');
  saudacao.innerHTML = `Olá, ${usuarioSessao.nomeCompleto}`;

  //lista de campos de imagem de perfil - iteração para facilitar atualização
  const imagensPerfil = [
    document.querySelector('#postagem-imagem-perfil'),
    document.querySelector('#header-imagem-perfil')
  ];
  imagensPerfil.forEach((imagem) => {
    imagem.src = usuarioSessao.imagemPerfil
  })

  //lista de postagem
  const listaPostagens = document.querySelector('#postagens')
  const cardsPostagens = Postagem.listaPostagens.map((postagem, index) => {
    if(postagem.autor === usuarioSessao || usuarioSessao.ehAmigo(postagem.autor)){ //só mostra postagem de amigo
      return postagem.renderizarCard(usuarioSessao, index)
    }
  })
  //se não há postagem
  cardsPostagens.join('').length > 0
    ? listaPostagens.innerHTML = cardsPostagens.join('')
    : listaPostagens.innerHTML = '<div class="w-100 d-flex flex-grow-1 justify-content-center align-items-center">Nenhuma postagem, adicione amigos e veja aqui as atualizações</div>'

  //construção lista de usuários
  const listaUsuarios = document.querySelector('#lista-usuarios')
  const itensUsuarios = Usuario.listaUsuarios.map((usuario) => {
    return usuario.renderizarItemModal(usuarioSessao, ehAdministrador)
  })
  listaUsuarios.innerHTML = itensUsuarios.join('')
  //ajuste de css
  listaUsuarios.querySelector("li:first-child").classList.remove("mt-3");
  listaUsuarios
    .querySelector("li:last-child")
    .classList.remove("pb-3", "border-bottom");

  //construção lista de amigos
  const listaAmigos = document.querySelector('#lista-amigos')
  const itensAmigos = usuarioSessao.amigos.map((usuario) => {
    return usuario.renderizarItemModal(usuarioSessao)
  })
  listaAmigos.innerHTML = itensAmigos.join('')
  if (usuarioSessao.amigos.length === 0) {
    listaAmigos.innerHTML =
      '<li class="text-center p-3">Você ainda não tem ninguém na lista de amigos.</li>';
  }
  //ajuste de css
  listaAmigos.querySelector("li:first-child").classList.remove("mt-3");
  listaAmigos
    .querySelector("li:last-child")
    .classList.remove("pb-3", "border-bottom");
}

// PARA TROCAR DE TELA (LOGIN <--> FEED)
const mudarTela = (tela) => {
  //campos
  const telaLogin = document.querySelector('#tela-login');
  const telaFeed = document.querySelector('#tela-feed');

  //display: none para todos
  telaLogin.classList.replace('d-flex', 'd-none');
  telaFeed.classList.replace('d-flex', 'd-none');

  //display correto conforme navegação
  switch (tela) {
    case 'login':
      telaLogin.classList.replace('d-none', 'd-flex');
      break;

    case 'feed':
      telaFeed.classList.replace('d-none', 'd-flex');
      break;

    default:
      telaLogin.classList.replace('d-none', 'd-flex');
      break;
  }
}

//FORMULÁRIO DE LOGIN
const formLogin = document.querySelector("#form-login");
formLogin.onsubmit = (event) => {
  event.preventDefault();
  const form = new FormData(formLogin); // cria instancia de formulario a partir do elemento html
  const usuario = form.get("usuario"); //imput usuario
  const senha = form.get("senha"); //input senha

  try {
    usuarioSessao = Usuario.logar(usuario, senha); //tenta logar
    ehAdministrador = usuarioSessao instanceof Administrador; //verifica se é admin
    formLogin.reset();
    renderizarFeed();
    mudarTela('feed');

  } catch (error) {
    alert(error.message);
  }
};

//FORMULÁRIO DE CADASTRO
const formCadastro = document.querySelector("#form-cadastro");
formCadastro.onsubmit = (event) => {
  event.preventDefault();
  const form = new FormData(formCadastro); // cria instancia de formulario a partir do elemento html
  const nomeCompleto = form.get("nome-completo"); //input nome
  const usuario = form.get("usuario"); //input usuario
  const senha = form.get("senha"); //input senha
  const github = form.get("usuario-github"); //input github (para foto)

  try {
    usuarioSessao = new Usuario({ nomeCompleto: nomeCompleto, usuario: usuario, senha: senha, github: github });
    usuarioSessao.autenticar(usuario, senha);
    ehAdministrador = false;
    formCadastro.reset();

    //para fechar a modal(fonte Bootstrap)
    const modal = bootstrap.Modal.getInstance(document.querySelector("#modal-cadastro"));
    modal.hide();

    renderizarFeed();
    mudarTela('feed');
  } catch (error) {
    alert(error.message);
  }
}


//FUNÇÕES DE POSTAGEM
//create
const formPublicar = document.querySelector("#form-publicar");
formPublicar.onsubmit = (event) => {
  event.preventDefault();
  const form = new FormData(formPublicar); // cria instancia de formulario a partir do elemento html
  const descricao = form.get("descricao"); //input texto da postagem

  new Postagem({
    autor: usuarioSessao,
    texto: descricao,
  })

  formPublicar.reset();
  renderizarFeed();
}

//update (modal)
const modalEditarPostagem = document.querySelector("#modal-editar-postagem");
modalEditarPostagem.addEventListener("show.bs.modal", (event) => {
  const botaoModal = event.relatedTarget;
  const indicePostagem = botaoModal.getAttribute("data-bs-id");
  const postagem = Postagem.listaPostagens[indicePostagem];
  const inputDescricao = modalEditarPostagem.querySelector(".modal-body input"); 
  const botaoSalvar = modalEditarPostagem.querySelector(".modal-body  button"); 

  inputDescricao.value = postagem.texto;

  botaoSalvar.onclick = function (event) {
    event.preventDefault();
    postagem.modificarTexto(inputDescricao.value);

    //para fechar a modal(fonte Bootstrap)
    const modal = bootstrap.Modal.getInstance(modalEditarPostagem);
    modal.hide();
    renderizarFeed();
  };
});

//delete
function apagarPostagem(indicePostagem) {
  const postagem = Postagem.listaPostagens[indicePostagem]

  usuarioSessao.removerPostagem(postagem)
  renderizarFeed()
}


// FUNÇÕES DE COMENTÁRIOS
//create
function adicionarComentario(event) {
  event.preventDefault();
  const indicePostagem = event.target.getAttribute('data-indicePostagem')
  const input = event.target.querySelector('input')
  const postagem = Postagem.listaPostagens[indicePostagem]
  postagem.adicionarComentario(input.value, usuarioSessao)

  renderizarFeed()
}

//delete
function apagarComentario(indicePostagem, indiceComentario) {
  const postagem = Postagem.listaPostagens[indicePostagem]
  const comentario = postagem.comentarios[indiceComentario]
  postagem.removerComentario(comentario)

  renderizarFeed()
}



//FUNÇÕES DE AMIZADE
//create
function adicionarAmigo(nomeUsuario) {
  const index = Usuario.listaUsuarios.findIndex((usuarioCadastrado) => {
    return usuarioCadastrado.usuario === nomeUsuario
  })

  const usuarioEscolhido = Usuario.listaUsuarios[index]
  //se um adiciona amigo, para o outro também é adicionado
  usuarioSessao.adicionarAmigo(usuarioEscolhido)
  usuarioEscolhido.adicionarAmigo(usuarioSessao)

  renderizarFeed()
}

//delete
function removerAmigo(nomeUsuario) {
  const index = Usuario.listaUsuarios.findIndex((usuarioCadastrado) => {
    return usuarioCadastrado.usuario === nomeUsuario
  })

  const usuarioEscolhido = Usuario.listaUsuarios[index]
  //se um remove amigo, para o outro também é removido
  usuarioSessao.removerAmigo(usuarioEscolhido)
  usuarioEscolhido.removerAmigo(usuarioSessao)

  renderizarFeed()
}


// FUNÇÃO DO ADIMINISTRADOR
function removerUsuario(nomeUsuario) {
  if (ehAdministrador) {
    const index = Usuario.listaUsuarios.findIndex((usuarioCadastrado) => {
      return usuarioCadastrado.usuario === nomeUsuario
    })
    const usuarioEscolhido = Usuario.listaUsuarios[index];
    //removendo as postagens do usuário removido
    Postagem.listaPostagens.forEach((postagem) => {
      if (postagem.autor === usuarioEscolhido) {
        usuarioSessao.removerPostagem(postagem);
        return;
      } else {
        //se não tem postagem, verifica se tem comentarios para remover
        postagem.comentarios.forEach((comentario) => {
          if (comentario.autor === usuarioEscolhido) {
            postagem.removerComentario(comentario);
            return;
          }
        })
      }
    })
    //removendo da lista de amigos de todos os usuários (se for amigo) o usuario removido
    Usuario.listaUsuarios.forEach((usuario) => {
      usuario.amigos.forEach((amigo) => {
        if (amigo === usuarioEscolhido) {
          usuario.removerAmigo(usuarioEscolhido);
        }
      })
    })
    usuarioSessao.removerUsuario(usuarioEscolhido);
    renderizarFeed()
  }
}


//PARA SAIR DO SISTEMA
const botaoSair = document.querySelector('#btn-sair')
botaoSair.addEventListener('click', () => {
  usuarioSessao.desconectar();
  usuarioSessao = undefined;
  ehAdministrador = false;
  mudarTela('login');
})

window.adicionarComentario = adicionarComentario
window.apagarComentario = apagarComentario
window.apagarPostagem = apagarPostagem
window.adicionarAmigo = adicionarAmigo
window.removerAmigo = removerAmigo
window.removerUsuario = removerUsuario


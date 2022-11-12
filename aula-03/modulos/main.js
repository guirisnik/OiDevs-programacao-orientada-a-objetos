const Usuario = require("./Usuario.class");
const { Documento, Endereco } = require("./Endereco.class");

const usuario = new Usuario({
  nomeCompleto: "Guilherme Risnik",
  dataDeNascimento: Date.now(),
  documento: new Documento("CPF", "12345678900"),
});

console.log(usuario);

const endereco = new Endereco(
  "Rua de pedra",
  42,
  "12345678",
  "Minha Cidade",
  "PE"
);

usuario.inserirEndereco(endereco);

console.log(usuario);

endereco.complemento = "Ao lado de porto de galinhas"; // Altera tanto o complemento da instância 'endereco' quanto o atributo #endereco da instância 'usuario'

console.log(usuario);

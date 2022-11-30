/*
A entidade `Administrador` deve ser uma especialização de `Usuario`. 
Apenas um administrador deve ser capaz de excluir um usuário.
*/

import { Usuario } from "./Usuario.class.js";

export class Administrador extends Usuario{
    constructor({nomeCompleto, senha, usuario, github = ''}){
        super({nomeCompleto, senha, usuario, github})
    }

    removerUsuario(usuario){
        if(!super.estaAutenticado){
            throw new Error('Sem permissão para excluir')
        }
        const index = Usuario.listaUsuarios.indexOf(usuario)
        Usuario.listaUsuarios.splice(index, 1)
    }
}
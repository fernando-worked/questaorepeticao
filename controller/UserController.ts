import { Usuario } from '../model/UserModel'
import { saveUser } from '../model/repository//UserRepository'
import { v4 as uuidv4 } from 'uuid';
var crypto = require('crypto');


export class UserController {
    usuario: Usuario;

    constructor(usuario: Usuario) {
        this.usuario = usuario;
    }

    public setUser(usuario: Usuario) {
        this.usuario = usuario;
    }

    public salvarUsuario() {
        this.usuario.setId(uuidv4());

        var senhaHash = crypto.createHash('md5')
            .update(this.usuario.getEmail)
            .update(this.usuario.getSenha) 
            .update(process.env.PASSWORD_SECRET)
            .digest("hex"); 

        this.usuario.setSenha(senhaHash);
        saveUser(this.usuario);
    }  
} 

module.exports = { UserController }  
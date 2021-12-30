import { Usuario } from '../model/UserModel'
import { saveUser, findUserByCredentials } from '../model/repository//UserRepository'
import { v4 as uuidv4 } from 'uuid';
var crypto = require('crypto');


export class UserController {
    private usuario: Usuario;

    constructor(usuario: Usuario) {
        this.usuario = usuario;
    }

    setUser(usuario: Usuario) {
        this.usuario = usuario;
    }

    get getUser() {
        return this.usuario;
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

    public async findUserByCredentials(txemail: string, txsenha: string) {
        var senhaHash = crypto.createHash('md5')
            .update(txemail)
            .update(txsenha)
            .update(process.env.PASSWORD_SECRET)
            .digest("hex");

        var usuario = await findUserByCredentials(txemail, senhaHash);
        this.usuario = usuario;
    }
}

module.exports = { UserController }  
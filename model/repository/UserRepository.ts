import { Usuario } from '../../model/UserModel'
import { poolDB } from './dbConnection';


export async function saveUser(usuario: Usuario) {
    await poolDB.query("insert into usuario (idusuario, txemail, txsenha) values ($1, $2, $3)", [usuario.getId, usuario.getEmail, usuario.getSenha]);
}

export async function emailJaCadastrado(txemail: string): Promise<boolean> {
    var result = await poolDB.query('select txemail from usuario where txemail = $1', [txemail]);
    return result.rowCount == 0 ? false : true;
}

module.exports = { saveUser, emailJaCadastrado };    
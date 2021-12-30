import { Usuario } from '../../model/UserModel'
import { poolDB } from './dbConnection';


export async function saveUser(usuario: Usuario) {
    await poolDB.query("insert into usuario (idusuario, txemail, txsenha) values ($1, $2, $3)", [usuario.getId, usuario.getEmail, usuario.getSenha]);
}

export async function emailJaCadastrado(txemail: string): Promise<boolean> {
    var result = await poolDB.query('select txemail from usuario where txemail = $1', [txemail]);
    return result.rowCount == 0 ? false : true;
}

export async function findUserByCredentials(txemail: string, txsenha: string): Promise<Usuario> {
    var result = await poolDB.query('select idusuario from usuario where txemail = $1 and txsenha = $2', [txemail, txsenha]);
    console.log(result);

    var usuario = new Usuario();

    if (result.rowCount == 0) {
        return usuario; 
    }
 
    usuario.setId(result.rows[0].idusuario);
    usuario.setEmail(txemail);
    return usuario; 

}

module.exports = { saveUser, emailJaCadastrado, findUserByCredentials };    
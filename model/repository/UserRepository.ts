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
    var usuario = new Usuario();

    if (result.rowCount == 0) {
        return usuario;
    }

    usuario.setId(result.rows[0].idusuario);
    usuario.setEmail(txemail);
    return usuario;

}

export async function findUserById(uid: string): Promise<Usuario> {
    var result = await poolDB.query('select idusuario, txemail from usuario where idusuario = $1', [uid]);
    var usuario = new Usuario();



    if (result.rowCount == 0) {
        return usuario;
    }

    usuario.setId(result.rows[0].idusuario);
    usuario.setEmail(result.rows[0].txemail);
    return usuario;

}

export async function userJaMatriculado(idusuario: string, idcurso: string): Promise<Boolean> {
    var result = await poolDB.query('select idusuariocurso from usuario_curso where idusuario = $1 and idcurso = $2', [idusuario, idcurso]);

    if (result.rowCount == 0) {
        return false;
    }

    return true;

}

export async function matricular(idmatricula: string, idusuario: string, idcurso: string) {
    await poolDB.query("insert into usuario_curso (idusuariocurso, idcurso, idusuario) values ($1, $2, $3)", [idmatricula, idcurso, idusuario]);


}

module.exports = { saveUser, emailJaCadastrado, findUserByCredentials, findUserById, userJaMatriculado, matricular };    
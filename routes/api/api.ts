import { Router } from 'express';
import { emailJaCadastrado } from '../../model/repository/UserRepository';
import { Usuario } from '../../model/UserModel'
import { UserController, UsuarioJaMatriculado, matricula } from '../../controller/UserController';
import * as EmailValidator from 'email-validator';
import { Resposta, responseCode} from '../../model/RespostaModel';
import { usuarioAutenticado, assinar } from '../../controller/middleware/AuthController'
import { buscarCursoPorId } from '../../controller/CursoController';


const router = Router();

router.get('/', usuarioAutenticado, (req, res) => {
    res.status(200).send('API ON');
})

router.post('/novoUsuario', async (req, res) => {
    const resposta = new Resposta();

    //TODO: Verificar se o contrato do JSON foi seguido.

    if (!EmailValidator.validate(req.body.txemail)) {

        resposta.setError('E-mail inválido!');

        return res.status(406).json(resposta);
    }

    if (await emailJaCadastrado(req.body.txemail)) {

        resposta.setError('E-mail já cadastrado!');

        return res.status(406).json(resposta);

    }

    const usuario = new Usuario();
    usuario.setEmail(req.body.txemail);
    usuario.setSenha(req.body.txsenha);

    const usercontroler = new UserController(usuario);

    usercontroler.salvarUsuario();

    resposta.setOk(usuario.getId)

    res.clearCookie("TOKEN");

    return res.status(responseCode.CREATED).json(resposta);

})

router.post('/login', async (req, res) => {
    const resposta = new Resposta();
    if (!EmailValidator.validate(req.body.txemail)) {

        resposta.setError('E-mail inválido!');
        return res.status(responseCode.OK).json(resposta);
    }

    var usuario = new Usuario();
    const usercontroler = new UserController(usuario);

    await usercontroler.findUserByCredentials(req.body.txemail, req.body.txsenha);

    if (usercontroler.getUser.getEmail.length == 0) {
        resposta.setError('Credencial inválida!');
    } else {
        usuario = usercontroler.getUser;
        const token = assinar(usuario);
        resposta.setOk(token);
        res.cookie('TOKEN', token);
    }

    return res.status(responseCode.OK).json(resposta);

})

router.post('/logout', usuarioAutenticado, async (req, res) => {
    res.clearCookie('TOKEN').status(responseCode.OK);
    res.redirect('/');

})

router.post('/matricular', usuarioAutenticado, async (req, res) => {
    const resposta = new Resposta();
    var curso = await buscarCursoPorId(req.body.idcurso);


    if (curso) {
        if (!(await UsuarioJaMatriculado(res.locals.usuario.uid, req.body.idcurso))) {
            console.log('Pode se matricular!');
            matricula(res.locals.usuario.uid, req.body.idcurso);
            resposta.setOk({usuario: res.locals.usuario.uid, curso: req.body.idcurso});
        } else {
            resposta.setError('Usuário já matriculado!')
        }
    } else {
        resposta.setError('Curso inválido!')
    }

    return res.status(responseCode.OK).json(resposta);
}) 


export default router;    
import { Router } from 'express';
import { emailJaCadastrado } from '../../model/repository/UserRepository';
import { Usuario } from '../../model/UserModel'
import { UserController } from '../../controller/UserController';
import * as EmailValidator from 'email-validator';
import { Resposta } from '../../model/RespostaModel';
var jwt = require('jsonwebtoken');

const router = Router();

router.get('/', (req, res) => {
    res.status(200).send('API ON');
})

router.post('/novoUsuario', async (req, res) => {
    const resposta = new Resposta();

    //TODO: Verificar se o contrato do JSON foi seguido.

    if (!EmailValidator.validate(req.body.txemail)) {

        resposta.setSucess(false);
        resposta.setCode(406);
        resposta.setContent('E-mail inválido!');

        return res.status(406).json(resposta);
    }

    if (await emailJaCadastrado(req.body.txemail)) {

        resposta.setSucess(false);
        resposta.setCode(406);
        resposta.setContent('E-mail já cadastrado!');

        return res.status(406).json(resposta);

    }

    const usuario = new Usuario();
    usuario.setEmail(req.body.txemail);
    usuario.setSenha(req.body.txsenha);

    const usercontroler = new UserController(usuario);

    usercontroler.salvarUsuario();

    resposta.setSucess(true);
    resposta.setCode(201);
    resposta.setContent(usuario.getId);

    return res.status(201).json(resposta);

})

router.post('/login', async (req, res) => {
    const resposta = new Resposta();
    if (!EmailValidator.validate(req.body.txemail)) {

        resposta.setSucess(false);
        resposta.setCode(406);
        resposta.setContent('E-mail inválido!');

        return res.status(406).json(resposta);
    }

    var usuario = new Usuario();
    const usercontroler = new UserController(usuario);

    await usercontroler.findUserByCredentials(req.body.txemail, req.body.txsenha);

    if (usercontroler.getUser.getEmail.length == 0) {
        resposta.setSucess(false);
        resposta.setCode(200);
        resposta.setContent('Credencial inválida!');
    } else {
        usuario = usercontroler.getUser;
        const token = jwt.sign({ usuario }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 12 // expires in 12h 
        });

        resposta.setSucess(true);
        resposta.setCode(200);
        resposta.setContent(token);
        res.cookie('TOKEN', token); 
    } 

    return res.status(200).json(resposta); 

})

router.post('/cookie', async (req, res) => {
    res.cookie('cookieName', 'cookieValue').send();
})
router.get('/cookie', async (req, res) => {
    console.log(req.cookies);
    res.cookie('cookieName', 'Get pelo navegador!')
    res.status(200).send(req.cookies); 
})


export default router;    
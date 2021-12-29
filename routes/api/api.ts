import { Router } from 'express';
import { emailJaCadastrado } from '../../model/repository/UserRepository';
import { Usuario } from '../../model/UserModel'
import { UserController } from '../../controller/UserController';
import * as EmailValidator from 'email-validator';
import { Resposta } from '../../model/RespostaModel';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).send('API ON');
}) 

router.post('/novoUsuario', async (req, res) => {
    const resposta = new Resposta();
    if (!EmailValidator.validate(req.body.txemail)) { 
        resposta.setContent('E-mail inválido!');
        return res.status(406).send(resposta);
    } 

    if (await emailJaCadastrado(req.body.txemail)) {
        return res.status(406).send('E-mail já cadastrado!');
    }
 
    const usuario = new Usuario(req.body.txemail, req.body.txsenha);
    const usercontroler = new UserController(usuario);

    usercontroler.salvarUsuario();

    return res.status(201).send('API ON');

})


export default router;  

import { Router } from 'express';
import { emailJaCadastrado } from '../../model/repository/UserRepository';
import { Usuario } from '../../model/UserModel'
import { UserController } from '../../controller/UserController';
import * as EmailValidator from 'email-validator';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).send('API ON');
}) 


router.post('/novoUsuario', async (req, res) => {
    if (!EmailValidator.validate(req.body.txemail))
        return res.status(406).send('E-mail inválido!');
    if (await emailJaCadastrado(req.body.txemail)) {
<<<<<<< HEAD
        return res.status(406).send('E-mail já cadastrado!');  
=======
        return res.status(406).send('E-mail já cadastrado!!!'); 
>>>>>>> 70933e0a6515155abca8cc69e50d662bdbfde652
    }

    const usuario = new Usuario(req.body.txemail, req.body.txsenha);
    const usercontroler = new UserController(usuario);
    usercontroler.salvarUsuario();

    return res.status(201).send('API ON');

}) 


export default router;  

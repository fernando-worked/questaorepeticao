import { Router } from 'express';
import { usuarioAutenticado } from '../../controller/middleware/AuthController';

const router = Router();

router.get('/', usuarioAutenticado, (req, res) => {
    res.status(200).send('Olá mundo!');
})

router.get('/login', (req, res) => {
    res.status(200).send('Página de Login');
})

router.get('/mesadeestudo', usuarioAutenticado, (req, res) => {
    console.log(res.locals.usuario.uid);
    res.status(200).send('Mesa de Estudo');
    //res.status(200).send('Olá mundo!');
})

export default router;

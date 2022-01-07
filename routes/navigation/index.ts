import { Router } from 'express';
import { usuarioAutenticado } from '../../controller/middleware/AuthController';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).send('Home (não é necessário autenticação)');
})

router.get('/mesadeestudo', usuarioAutenticado, (req, res) => {
    console.log(res.locals.usuario.uid);
    res.status(200).send('Mesa de Estudo');
})

export default router; 

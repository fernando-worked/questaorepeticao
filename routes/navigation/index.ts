import { Router } from 'express';
import { usuarioAutenticado } from '../../controller/middleware/AuthController';
import { render as _render } from 'react-dom';

const router = Router();

router.get('/', (req, res) => {

    res.status(200).send('Home (não é necessário autenticação)');
})

router.get('/mesadeestudo', usuarioAutenticado, (req, res) => {
    res.status(200).send('Mesa de Estudo');
})

export default router; 

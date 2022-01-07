import { Router } from 'express';
import { verificarJWT, usuarioAutenticado } from '../../controller/middleware/AuthController';

const router = Router();

router.get('/login', (req, res) => {
    res.status(200).send('Página de Login');
})

export default router;    
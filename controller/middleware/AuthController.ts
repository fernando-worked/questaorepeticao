import { Usuario } from "../../model/UserModel";
import { UserController } from "../UserController";

export var jwt = require('jsonwebtoken');

export function verificarJWT(req: any, res: any, next: any) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.JWT_SECRET, function (err: any, decoded: any) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

        // se tudo estiver ok, salva no request para uso posterior
        res.locals.usuario = decoded.payload;
        console.log(req.cookies);
        next();
    });

}

export function assinar(payload: Usuario) {
    const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
        //expiresIn: 60 * 60 * 12 // expires in 12h  
        expiresIn: 10 // expires in 10s 
    });

    return token;

}

export function usuarioAutenticado(req: any, res: any, next: any) {
    const token = req.cookies['TOKEN'];

    if (token == null) {
        res.redirect('/login');
    } else {
        jwt.verify(token, process.env.JWT_SECRET, async function (err: any, decoded: any) {

            if (err) {
                if (err.name == 'TokenExpiredError') {
                    const payload = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });
                    var usuario = new Usuario();
                    const usercontroler = new UserController(usuario);
                    console.log(payload.email);
                    await usercontroler.findUserById(payload.uid);
                    res.locals.usuario = usercontroler.getUser;
                    next();
 
                } else { 
                    res.redirect('/login');
                    console.log(err.name);
                }

            } else {
                res.locals.usuario = decoded.payload;
                next();
            }

        });

    }

}



module.exports = { verificarJWT, assinar, usuarioAutenticado }
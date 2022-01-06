import { Usuario } from "../../model/UserModel";

export var jwt = require('jsonwebtoken');

export function verificarJWT(req: any, res: any, next: any) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.JWT_SECRET, function (err: any, decoded: any) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();
    });
   
}

export function assinar(payload: Usuario){
    const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 12 // expires in 12h 
    });

    return token;

}

export function usuarioAutenticado(req: any, res: any, next: any){
    res.cookie('cookieName', 'cookieValue');
    console.log('teste');
    console.log(req.cookies);
    next();

}



module.exports = { verificarJWT, assinar, usuarioAutenticado}
import { responseCode } from "../../model/RespostaModel";
import { Usuario } from "../../model/UserModel";
import { UserController } from "../UserController";

export var jwt = require('jsonwebtoken');



export function assinar(payload: Usuario) {
    const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
        //expiresIn: 60 * 60 * 12 // expires in 12h  
        expiresIn: 10 // expires in 10s 
    });

    return token;

}

export function usuarioAutenticado(req: any, res: any, next: any) {
    let token = req.cookies['TOKEN'];

    if (token == null) { /*caso não possua cookies de login, redireciona para login*/
        res.status(responseCode.UNAUTHORIZED).redirect('/');
    } else {
        jwt.verify(token, process.env.JWT_SECRET, async function (err: any, decoded: any) {

            if (err) {
                if (err.name == 'TokenExpiredError') {

                    jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true }, async function (err: any, decoded: any) {
                        var usuario = new Usuario();
                        const usercontroler = new UserController(usuario);
                        await usercontroler.findUserById(decoded.payload.uid);
                        token = assinar(usercontroler.getUser);
                        res.cookie('TOKEN', token);
                        res.locals.usuario = usercontroler.getUser;
                        next();

                    });


                } else { /* qualquer erro de token diferente de expirado */
                    res.status(responseCode.UNAUTHORIZED).redirect('/');

                }

            } else { /* caso token esteja ok */
                res.locals.usuario = decoded.payload;
                next();
            }

        });

    }

}



module.exports = { assinar, usuarioAutenticado }
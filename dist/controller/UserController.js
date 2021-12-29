"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserRepository_1 = require("../model/repository//UserRepository");
const uuid_1 = require("uuid");
var crypto = require('crypto');
class UserController {
    constructor(usuario) {
        this.usuario = usuario;
    }
    setUser(usuario) {
        this.usuario = usuario;
    }
    salvarUsuario() {
        this.usuario.setId((0, uuid_1.v4)());
        var senhaHash = crypto.createHash('md5')
            .update(this.usuario.getEmail)
            .update(this.usuario.getSenha)
            .update(process.env.PASSWORD_SECRET)
            .digest("hex");
        this.usuario.setSenha(senhaHash);
        (0, UserRepository_1.saveUser)(this.usuario);
    }
}
exports.UserController = UserController;
module.exports = { UserController };

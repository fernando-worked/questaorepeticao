"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
var crypto = require('crypto');
class Usuario {
    constructor(nome, senha) {
        this.email = nome;
        this.senha = senha;
    }
    get getEmail() {
        return this.email;
    }
    get getSenha() {
        return this.senha;
    }
    get getId() {
        return this.uid;
    }
    setId(uid) {
        this.uid = uid;
    }
    setSenha(senha) {
        this.senha = senha;
    }
}
exports.Usuario = Usuario;
module.exports = { Usuario };

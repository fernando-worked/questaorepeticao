import { v4 as uuidv4 } from 'uuid';
var crypto = require('crypto');

export class Usuario {
    private uid: string = '';
    private email: string = '';
    private senha: string = '';

    constructor() { 

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

    setId(uid: string): void {
        this.uid = uid;
    }

    setSenha(senha: string): void {
        this.senha = senha;
    }

    setEmail(txemail: string) {
        this.email = txemail;
    }


}

module.exports = { Usuario };
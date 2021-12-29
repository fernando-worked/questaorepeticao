"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resposta = void 0;
class Resposta {
    constructor() {
    }
    get getSucess() {
        return this.sucess;
    }
    get getCode() {
        return this.code;
    }
    get getContent() {
        return this.content;
    }
    set setContent(content) {
        this.content = content;
    }
    set setCode(code) {
        this.code = code;
    }
    set setSucess(sucess) {
        this.sucess = sucess;
    }
}
exports.Resposta = Resposta;
module.exports = { Resposta };

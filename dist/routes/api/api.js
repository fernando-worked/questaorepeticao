"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserRepository_1 = require("../../model/repository/UserRepository");
const UserModel_1 = require("../../model/UserModel");
const UserController_1 = require("../../controller/UserController");
const EmailValidator = __importStar(require("email-validator"));
const RespostaModel_1 = require("../../model/RespostaModel");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.status(200).send('API ON');
});
router.post('/novoUsuario', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resposta = new RespostaModel_1.Resposta();
    if (!EmailValidator.validate(req.body.txemail)) {
        resposta.setContent('E-mail inválido!');
        return res.status(406).send(resposta);
    }
    if (yield (0, UserRepository_1.emailJaCadastrado)(req.body.txemail)) {
        return res.status(406).send('E-mail já cadastrado!');
    }
    const usuario = new UserModel_1.Usuario(req.body.txemail, req.body.txsenha);
    const usercontroler = new UserController_1.UserController(usuario);
    usercontroler.salvarUsuario();
    return res.status(201).send('API ON');
}));
exports.default = router;

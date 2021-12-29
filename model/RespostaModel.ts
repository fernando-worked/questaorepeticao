export class Resposta {
    private sucess?: boolean;
    private code?: number;
    private content?: any;

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

    set setContent(content: any) {
        this.content = content;
    }

    set setCode(code: number) {
        this.code = code;
    }

    set setSucess(sucess: boolean) {
        this.sucess = sucess;
    }
}

module.exports = { Resposta };
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

    setContent(content: any) {
        this.content = content;
    }

    setCode(code: number) {
        this.code = code;
    }

    setSucess(sucess: boolean) {
        this.sucess = sucess;
    }

    setError(content: any) {
        this.sucess = false;
        this.content = content;
    }
}

module.exports = { Resposta };
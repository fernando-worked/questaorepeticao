export const responseCode = {
    OK: 200,
    CREATED: 201,
    UNAUTHORIZED: 401
};

export class Resposta {
    private sucess?: boolean;
    private content?: any;

  
    constructor() {

    }

    get getSucess() {
        return this.sucess;
    }


    get getContent() {
        return this.content;
    }
    setContent(content: any) {
        this.content = content;
    }
    setSucess(sucess: boolean) {
        this.sucess = sucess;
    }

    setError(content: any) {
        this.sucess = false;
        this.content = content;
    }
    setOk(content: any) {
        this.sucess = true;
        this.content = content;
    }
}

module.exports = { Resposta, responseCode };
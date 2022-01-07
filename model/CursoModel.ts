export class Curso {
    private id: string;
    private nome: string;

    constructor(id: string, nome: string) {
        this.id = id;
        this.nome = nome;
    }

    get getNome() {
        return this.nome;
    }

    get getId() {
        return this.id;
    }

}


module.exports = { Curso };
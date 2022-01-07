import { Curso } from "../CursoModel";
import { poolDB } from "./dbConnection";

export async function findCursoById(id: string): Promise<Curso> {
    var result = await poolDB.query('select idcurso, txcurso from curso where idcurso = $1', [id]);


    //TODO: Tratar rows = 0

    var curso = new Curso(result.rows[0].idcurso, result.rows[0].txcurso);

    return curso;

}
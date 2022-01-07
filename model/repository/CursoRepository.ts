import { Curso } from "../CursoModel";
import { poolDB } from "./dbConnection";

export async function findCursoById(id: string): Promise<Curso | null> {
    var result = await poolDB.query('select idcurso, txcurso from curso where idcurso = $1', [id]);

    if (result.rowCount == 0) {
        return null;
    }
    //TODO: Tratar rows = 0

    const curso = new Curso(result.rows[0].idcurso, result.rows[0].txcurso);

    return curso;

}

module.exports = { findCursoById }
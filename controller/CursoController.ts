import { Curso } from '../model/CursoModel';
import { findCursoById } from '../model/repository/CursoRepository';

export async function buscarCursoPorId(id: string): Promise<Curso> {
    return await findCursoById(id);
}

module.exports = { buscarCursoPorId };
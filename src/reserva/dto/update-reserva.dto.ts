export class UpdateReservaDto {
    id?: number;
    idCurso: number;
    idTurma: number;
    idSala: number;
    dataInicio: string;
    dataTermino: string;
    horaInicio: string;
    horaTermino: string;
    situacao: boolean;
}
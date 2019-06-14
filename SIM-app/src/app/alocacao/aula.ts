import {Monitor} from './monitor';
import { AnonymousSubject } from 'rxjs/internal/Subject';

export class Aula {
    hora: string;
    tipo: string;
    data: string;
    diaSemana: string;
    numAlocados: number;
    monitores: Monitor[];
    soChefe: boolean;

    constructor() { }
}
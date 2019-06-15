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

    constructor() {
        this.clean();
    }

    clean() : void {
        this.hora = "";
        this.tipo = "";
        this.data = "";
        this.diaSemana = "";
        this.numAlocados = 0;
        this.monitores = [];
        this.soChefe = false;
    }

    copyFrom(from: Aula): void {
        this.hora = from.hora;
        this.tipo = from.tipo;
        this.data = from.data;
        this.diaSemana = from.diaSemana;
        this.numAlocados = from.numAlocados;
        this.monitores = from.monitores;
        this.soChefe = from.soChefe;
    }
}
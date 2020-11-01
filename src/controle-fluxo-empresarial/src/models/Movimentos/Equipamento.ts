import { Marca } from './Marca';

export interface Equipamento {
    id?: number,
    nome: string,
    marcaId?: number | null;
    marca?: Marca | null;
}
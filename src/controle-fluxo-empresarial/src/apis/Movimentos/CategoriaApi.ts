import { Categoria } from '../../models/Movimentos/Categoria';
import { ApiBase } from '../Api';

export const endPoint: string = 'api/categoria';

class Api extends ApiBase<Categoria>{

    constructor() {
        super(endPoint);
    }
}
export const CategoriaApi = new Api();
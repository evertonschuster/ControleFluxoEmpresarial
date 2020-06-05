import { Produto } from '../../models/Movimentos/Produto';
import { ApiBase } from '../Api';

export const endPoint: string = 'api/produtos';

class Api extends ApiBase<Produto>{

    constructor() {
        super(endPoint);
    }
}
export const ProdutoApi = new Api();
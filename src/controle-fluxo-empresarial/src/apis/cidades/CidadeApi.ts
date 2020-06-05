import { Cidade } from '../../models/Cidades/Cidade';
import { ApiBase } from '../Api';

export const endPoint: string = 'api/Cidade';

class Api extends ApiBase<Cidade>{

    constructor() {
        super(endPoint);
    }
}
export const CidadeApi = new Api();
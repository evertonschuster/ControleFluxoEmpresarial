import { Cliente } from '../../models/Pessoas/Cliente';
import { ApiBase } from '../Api';

export const endPoint: string = 'api/clientes';

class Api extends ApiBase<Cliente>{

    constructor() {
        super(endPoint);
    }
}
export const ClienteApi = new Api();


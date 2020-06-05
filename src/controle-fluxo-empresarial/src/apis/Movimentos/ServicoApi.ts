import { Servico } from '../../models/Movimentos/Servico';
import { ApiBase } from '../Api';

export const endPoint: string = 'api/servicos';

class Api extends ApiBase<Servico>{

    constructor() {
        super(endPoint);
    }
}
export const ServicoApi = new Api();
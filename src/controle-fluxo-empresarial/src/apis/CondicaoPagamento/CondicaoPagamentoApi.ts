import { CondicaoPagamento } from '../../models/CondicaoPagamento/CondicaoPagamento';
import { ApiBase } from '../Api';

export const endPoint: string = 'api/condicao-pagamento';

class Api extends ApiBase<CondicaoPagamento>{

    constructor() {
        super(endPoint);
    }
}
export const CondicaoPagamentoApi = new Api();
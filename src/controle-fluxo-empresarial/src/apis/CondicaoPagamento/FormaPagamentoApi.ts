import { FormaPagamento } from '../../models/CondicaoPagamento/FormaPagamento';
import { ApiBase } from '../Api';

export const endPoint: string = 'api/forma-pagamento';

class Api extends ApiBase<FormaPagamento>{

    constructor() {
        super(endPoint);
    }
}
export const FormaPagamentoApi = new Api();
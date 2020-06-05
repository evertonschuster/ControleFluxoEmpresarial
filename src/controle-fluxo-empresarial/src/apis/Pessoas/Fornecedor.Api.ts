import { Fornecedor } from '../../models/Pessoas/Fornecedor';
import { ApiBase } from '../Api';

export const endPoint: string = 'api/condicao-pagamento';

class Api extends ApiBase<Fornecedor>{

    constructor() {
        super(endPoint);
    }
}
export const FornecedorApi = new Api();


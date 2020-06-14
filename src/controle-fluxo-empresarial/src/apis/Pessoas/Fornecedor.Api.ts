import { Fornecedor } from '../../models/Pessoas/Fornecedor';
import { ApiBase } from '../Api';

export const endPoint: string = 'api/fornecedores';

class Api extends ApiBase<Fornecedor>{

    constructor() {
        super(endPoint);
    }
}
export const FornecedorApi = new Api();


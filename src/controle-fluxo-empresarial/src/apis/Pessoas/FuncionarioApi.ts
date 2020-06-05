import { Funcionario } from '../../models/Pessoas/Funcionario';
import { ApiBase } from '../Api';

export const endPoint: string = 'api/condicao-pagamento';

class Api extends ApiBase<Funcionario>{

    constructor() {
        super(endPoint);
    }
}
export const FuncionarioApi = new Api();
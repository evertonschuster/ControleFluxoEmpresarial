import { FuncaoFuncionario } from '../../models/Pessoas/FuncaoFuncionario';
import { ApiBase } from '../Api';

export const endPoint: string = 'api/funcao-funcionario';

class Api extends ApiBase<FuncaoFuncionario>{

    constructor() {
        super(endPoint);
    }
}
export const FuncaoFuncionarioApi = new Api();
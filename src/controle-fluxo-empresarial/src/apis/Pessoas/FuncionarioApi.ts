import { Funcionario } from '../../models/Pessoas/Funcionario';
import { ApiBase } from '../Api';

export const endPoint: string = 'api/funcionarios';

class Api extends ApiBase<Funcionario>{

    constructor() {
        super(endPoint);
    }
}
export const FuncionarioApi = new Api();
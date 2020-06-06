import { UnidadeMedida } from '../../models/Movimentos/UnidadeMedida';
import { ApiBase } from '../Api';

export const endPoint: string = 'api/unidades-medida';

class Api extends ApiBase<UnidadeMedida>{

    constructor() {
        super(endPoint);
    }
}
export const UnidadeMedidaApi = new Api();
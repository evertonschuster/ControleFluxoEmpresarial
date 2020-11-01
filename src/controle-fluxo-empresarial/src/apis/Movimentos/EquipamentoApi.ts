import { Equipamento } from '../../models/Movimentos/Equipamento';
import { ApiBase } from '../Api';

export const endPoint: string = 'api/equipamentos';

class Api extends ApiBase<Equipamento>{

    constructor() {
        super(endPoint);
    }
}
export const EquipamentoApi = new Api();
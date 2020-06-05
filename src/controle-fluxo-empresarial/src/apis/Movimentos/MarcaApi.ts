import { Marca } from '../../models/Movimentos/Marca';
import { ApiBase } from '../Api';

export const endPoint: string = 'api/marcas';

class Api extends ApiBase<Marca>{

    constructor() {
        super(endPoint);
    }
}
export const MarcaApi = new Api();
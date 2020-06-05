import { Pais } from '../../models/Cidades/Pais';
import { ApiBase } from './../Api';

export const endPoint: string = 'api/pais';

class Api extends ApiBase<Pais>{

    constructor() {
        super(endPoint);
    }
}
export const PaisApi = new Api();
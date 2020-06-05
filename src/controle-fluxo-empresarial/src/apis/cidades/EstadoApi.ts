import { Estado } from '../../models/Cidades/Estado';
import { ApiBase } from '../Api';

export const endPoint: string = 'api/Estado';

class Api extends ApiBase<Estado>{

    constructor() {
        super(endPoint);
    }
}
export const EstadoApi = new Api();
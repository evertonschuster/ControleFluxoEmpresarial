import { ProblemaRelatado } from '../../models/Movimentos/ProblemaRelatado';
import { ApiBase } from '../Api';

export const endPoint: string = 'api/problemas-relatado';

class Api extends ApiBase<ProblemaRelatado>{

    constructor() {
        super(endPoint);
    }
}
export const ProblemaRelatadoApi = new Api();
import { Titular } from '../../models/Pessoas/Titular';
import { ApiBase } from '../Api';

export const endPoint: string = 'api/associados';

class Api extends ApiBase<Titular>{

    constructor() {
        super(endPoint);
    }
}
export const TitularApi = new Api();
import { CondicaoPagamento } from '../../models/CondicaoPagamento/CondicaoPagamento';
import { ApiBase } from '../Api';
import api from '../Api.configure';
import { AxiosResponse } from 'axios';
import { ParcelaPagamento } from '../../models/CondicaoPagamento/ParcelaPagamento';

export const endPoint: string = 'api/condicao-pagamento';

class Api extends ApiBase<CondicaoPagamento>{

    constructor() {
        super(endPoint);
    }

    CalculaParcela(condicaoPagamentoId: number, dataBase: Date, valor: number): Promise<AxiosResponse<ParcelaPagamento[]>> {
        let dataString = dataBase.toISOString().split('T')[0];

        return api.get(`${this.EndPoint}/calcula-parcela/${condicaoPagamentoId}/${dataString}/${valor}`);
    }
}
export const CondicaoPagamentoApi = new Api();
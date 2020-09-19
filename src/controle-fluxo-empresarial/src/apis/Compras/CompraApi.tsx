import { AxiosResponse } from 'axios';
import api from '../Api.configure';
import { PaginationQuery, PaginationResult } from '../../models/BaseEntity';
import { Compra } from '../../models/Compras/Compra';
import { CompraProduto } from '../../models/Compras/CompraProduto';
import { CancelarCompra } from '../../models/Compras/CancelarCompra';

class Api {

    EndPoint: string = "api/compras";

    Cancelar(compra: CancelarCompra): Promise<AxiosResponse<any>> {
        return api.post(`${this.EndPoint}/cancelar/(${compra.modelo}:${compra.serie}:${compra.numero}:${compra.fornecedorId})`, compra);
    }

    Save(t: Compra): Promise<AxiosResponse<any>> {
        return api.post(this.EndPoint, t);
    }

    Update(t: Compra): Promise<AxiosResponse<any>> {
        return api.put(`${this.EndPoint}/${t.numero}`, t);
    }

    GetById(modelo: string, serie: string, numero: string, fornecedorId: string): Promise<AxiosResponse<Compra>> {
        return api.get(`${this.EndPoint}/(${modelo}:${serie}:${numero}:${fornecedorId})`);
    }

    Excluir(id: number): Promise<AxiosResponse<any>> {
        return api.delete(`${this.EndPoint}/${id.toString()}`);
    }

    GetListPagined(query: PaginationQuery): Promise<AxiosResponse<PaginationResult<Compra>>> {
        return api.post(`${this.EndPoint}/list`, query);
    }

    Desativar(id: number): Promise<AxiosResponse<any>> {
        return api.put(`${this.EndPoint}/desativar/${id.toString()}`);
    }

    CalcularValorRatiado(produtos: CompraProduto[], frete?: number, seguro?: number, outrasDespesas?: number): Promise<AxiosResponse<CompraProduto[]>> {
        return api.post(`${this.EndPoint}/calcular-valor-ratiado`, { produtos, frete, seguro, outrasDespesas });
    }
}
export const CompraApi = new Api();
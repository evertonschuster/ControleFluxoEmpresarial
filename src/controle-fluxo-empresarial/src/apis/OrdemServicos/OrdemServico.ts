import { PaginationQuery, PaginationResult } from "../../models/BaseEntity";
import { AxiosResponse } from "axios";
import OrdemServico from "./../../models/OrdemServicos/OrdemServico"
import api from "../Api.configure";
import AberturaOrdemServico from "../../models/OrdemServicos/AberturaOrdemServico";
import AndamentoOrdemServico from "../../models/OrdemServicos/AndamentoOrdemServico";

class Api {
   
    EndPoint: string = "";

    GetListPagined(query: PaginationQuery): Promise<AxiosResponse<PaginationResult<OrdemServico>>> {
        return api.post(`${this.EndPoint}/list`, query);
    }

    New(os: AberturaOrdemServico): Promise<AxiosResponse<any>> {
        return api.post(`${this.EndPoint}/new`, os);
    }

    Andamento(os: AndamentoOrdemServico): Promise<AxiosResponse<any>> {
        return api.post(`${this.EndPoint}/andamento`, os);
    }

}
export const OrdemServicoApi = new Api();
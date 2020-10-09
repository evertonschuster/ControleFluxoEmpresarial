import api from "../Api.configure";
import { PaginationQuery, PaginationResult } from "../../models/BaseEntity";
import { AxiosResponse } from "axios";
import OrdemServico from "./../../models/OrdemServicos/OrdemServico"
import AberturaOrdemServico from "../../models/OrdemServicos/AberturaOrdemServico";
import AndamentoOrdemServico from "../../models/OrdemServicos/AndamentoOrdemServico";
import { CancelarOrdemServico } from "../../models/OrdemServicos/CancelarOrdemServico";

class Api {

    EndPoint: string = "api/ordem-servico";

    GetListPagined(query: PaginationQuery): Promise<AxiosResponse<PaginationResult<OrdemServico>>> {
        return api.post(`${this.EndPoint}/list`, query);
    }

    getById(id: string): Promise<AxiosResponse<OrdemServico>> {
        return api.get(`${this.EndPoint}/${id}`);

    }
    Cancelar(os: CancelarOrdemServico): Promise<AxiosResponse<any>> {
        return api.put(`${this.EndPoint}/cancelar/${os.id}`, os);
    }

    Iniciar(id: string): Promise<AxiosResponse<Date>> {
        return api.put(`${this.EndPoint}/iniciar/${id}`);
    }

    New(os: AberturaOrdemServico): Promise<AxiosResponse<any>> {
        return api.post(`${this.EndPoint}/new`, os);
    }

    Finalizar(os: AndamentoOrdemServico): Promise<AxiosResponse<any>> {
        return api.put(`${this.EndPoint}/finalizar/${os.id}`, os);
    }

    SalvarAndamento(os: OrdemServico) {
        return api.put(`${this.EndPoint}/salvar-andamento/${os.id}`, os);
    }

}
export const OrdemServicoApi = new Api();

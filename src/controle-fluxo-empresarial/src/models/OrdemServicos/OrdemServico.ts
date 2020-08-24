import OrdemServicoItem from "./OrdemServicoItem";

export default interface OrdemServico {
    id?: number | null;
    dataInicio?: Date | null;
    dataFinilizacao?: Date | null;
    items?: OrdemServicoItem[] | null
}
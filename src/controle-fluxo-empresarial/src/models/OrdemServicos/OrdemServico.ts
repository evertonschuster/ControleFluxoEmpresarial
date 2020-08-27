import OrdemServicoItem from "./OrdemServicoItem";
import { Cliente } from './../Pessoas/Cliente';

export default interface OrdemServico {
    id?: number | null;
    clienteId?: number | null;
    cliente?: Cliente | null;
    
    condicaoPagamentoId?: number | null;

    descricaoEquipamento?: string | null;
    descricaoProblemaRelatado?: string | null;

    dataAbertura?: Date | null;
    dataExecucao?: Date | null;
    dataExecucaoFim?: Date | null;
    dataAprovacao?: Date | null;
    dataRejeitado?: Date | null;
    dataDevolucaoCliente?: Date | null;

    items?: OrdemServicoItem[] | null
}
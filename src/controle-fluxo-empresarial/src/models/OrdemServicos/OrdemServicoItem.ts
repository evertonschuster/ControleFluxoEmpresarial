import { Funcionario } from './../Pessoas/Funcionario';
import { Servico } from './../Movimentos/Servico';
import { Produto } from './../Movimentos/Produto';

export enum OrdemServicoItemType {
    Produto,
    Servico
}

export default interface OrdemServicoItem {
    tipo?: OrdemServicoItemType | null;
    quantidade: number | null;

    funcionarioId?: number | null;
    funcionario?: Funcionario | null,

    servicoId?: number | null;
    servico?: Servico | null;

    produtoId?: number | null;
    produto?: Produto | null;
}
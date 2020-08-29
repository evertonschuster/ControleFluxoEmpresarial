import { Funcionario } from './../Pessoas/Funcionario';
import { Servico } from './../Movimentos/Servico';
import { Produto } from './../Movimentos/Produto';


export interface OrdemServicoServico {
    quantidade: number | null;

    funcionarioId?: number | null;
    funcionario?: Funcionario | null,

    servicoId?: number | null;
    servico?: Servico | null;
}


export interface OrdemServicoProduto {
    quantidade: number | null;

    produtoId?: number | null;
    produto?: Produto | null;
}
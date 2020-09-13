import { IBaseEntity2 } from './../BaseEntity';
import { Produto } from './../Movimentos/Produto';
import { UnidadeMedida } from './../Movimentos/UnidadeMedida';

export interface CompraProduto extends IBaseEntity2{

    produto?: Produto | null;
    produtoId?: number | null;

    unidadeMedida?: UnidadeMedida | null;
    unidadeMedidaId?: string | null;

    quantidade?: number | null;
    valorUnitario?: number | null;
    desconto?: number | null;
    ipi?: number | null;
    custoUnitario?: number | null;
}
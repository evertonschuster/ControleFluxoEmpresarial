import { IBaseEntity2 } from './../BaseEntity';
import { Produto } from './../Movimentos/Produto';
import { FormaPagamento } from './../CondicaoPagamento/FormaPagamento';
import { UnidadeMedida } from './../Movimentos/UnidadeMedida';

export interface CompraProduto extends IBaseEntity2{

    produto?: Produto | null;
    produtoId?: number | null;

    unidadeMedida?: UnidadeMedida | null;
    unidadeMedidaId?: string | null;

    quantidade?: number | null;
    valor?: number | null;
    desconto?: number | null;
    ipi?: number | null;
}
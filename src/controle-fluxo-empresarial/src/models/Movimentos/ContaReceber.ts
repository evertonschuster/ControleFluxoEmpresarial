import { BaseEntity } from "../BaseEntity";
import { FormaPagamento } from './../CondicaoPagamento/FormaPagamento';

export interface ContaReceber extends BaseEntity {
    valor: number;
    observacao:string;

    formaPagamentoId: number;
    formaPagamento: FormaPagamento

    dataLancamento:Date;
    dataVencimento:Date;
}
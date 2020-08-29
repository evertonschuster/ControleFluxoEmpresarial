import { IBaseEntity2 } from "../BaseEntity";
import { FormaPagamento } from '../CondicaoPagamento/FormaPagamento';
import { Cliente } from './../Pessoas/Cliente';

export default interface ContaReceber extends IBaseEntity2 {
    numero?: string | null;
    modelo?: string | null;
    serie?: string | null;
    dataEmissao?: Date | null;
    dataPagamento?: Date | null;
    dataVencimento?: Date | null;
    valor?: number | null;
    desconto?: number | null;
    multa?: number | null;
    juro?: number | null;
    parcela?: number | null;

    clienteId?: number | null;
    cliente?: Cliente | null;

    formaPagamentoId?: number | null;
    formaPagamento?: FormaPagamento | null;
}
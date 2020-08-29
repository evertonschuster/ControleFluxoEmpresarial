import { IBaseEntity2 } from "../BaseEntity";
import { Fornecedor } from "../Pessoas/Fornecedor";
import { FormaPagamento } from '../CondicaoPagamento/FormaPagamento';

export default interface ContaPagar extends IBaseEntity2 {
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

    fornecedorId?: number | null;
    fornecedor?: Fornecedor | null;

    formaPagamentoId?: number | null;
    formaPagamento?: FormaPagamento | null;
}
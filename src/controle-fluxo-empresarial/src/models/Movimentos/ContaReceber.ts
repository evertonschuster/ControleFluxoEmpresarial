import { IBaseEntity2 } from "../BaseEntity";
import { FormaPagamento } from '../CondicaoPagamento/FormaPagamento';
import { Cliente } from './../Pessoas/Cliente';

export default interface ContaReceber extends IBaseEntity2 {
    numero?: string | null;
    modelo?: string | null;
    serie?: string | null;
    
    valor?: number | null;
    desconto?: number | null;
    multa?: number | null;
    juro?: number | null;
    parcela?: number | null;
    
    descricao?: string | null;
    
    dataBaixa?: Date | null;
    dataEmissao?: Date | null;
    dataPagamento?: Date | null;
    dataCancelamento?: Date | null;
    dataVencimento?: Date | null;

    clienteId?: number | null;
    cliente?: Cliente | null;

    formaPagamentoId?: number | null;
    formaPagamento?: FormaPagamento | null;
}

export interface CancelarContaReceber {
    numero?: string | null;
    modelo?: string | null;
    serie?: string | null;
    parcela?: number | null;

    justificativa?: string | null;
    senha?: string | null;
}
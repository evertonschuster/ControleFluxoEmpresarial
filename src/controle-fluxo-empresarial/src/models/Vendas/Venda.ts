
import { Cliente } from '../Pessoas/Cliente';
import { VendaProduto } from './VendaProduto';
import { CondicaoPagamento } from "./../CondicaoPagamento/CondicaoPagamento"
import ContaReceber from './../Movimentos/ContaReceber';

export interface Venda {
    numero?: string | null;
    serie?: string | null;
    modelo?: string | null;
    cliente?: Cliente | null;
    clienteId?: number | null;

    descricao?: string | null;
    dataEmissao?: Date | null;
    dataCancelamento?: Date | null;
    condicaoPagamentoId?: number | null;
    condicaoPagamento?: CondicaoPagamento | null;
    ordemServicoId?: number | null;
    dataCriacao?: Date | null;
    dataAtualizacao?: Date | null;
    userCriacao?: string | null;
    userAtualizacao?: string | null;

    produtos?: VendaProduto[] | null;
    parcelas?: ContaReceber[] | null;
}
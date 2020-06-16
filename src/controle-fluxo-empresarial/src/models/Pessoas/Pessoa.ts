
import { BaseEntity } from './../BaseEntity';
export interface Pessoa extends BaseEntity {
    apelido?: string | null,
    bairro?: string | null,
    cep?: string | null,
    cidadeId?: number | null;
    complemento?: string | null,
    cpfcpnj?: string | null,
    email?: string | null,
    endereco?: string | null,
    nome?: string | null,
    numero?: string | null,
    observacao?: string | null,
    rgInscricaoEstadual?: string | null,
    telefone?: string | null,
}

export enum SEXO {
    Masculino = "Masculino",
    Feminino = "Feminino",
    Outros = "Outros",
}

export enum ESTADO_CIVIL {
    Casado = "Casado",
    Divorciado = "Divorciado",
    Separadoo = "Separadoo",
    Solteiro = "Solteiro",
    Viuvo = "Viuvo",
    Outros = "Outros",
}

export enum TIPO_PESSOA {
    Fisica = "Fisica",
    Juridica = "Juridica",
}
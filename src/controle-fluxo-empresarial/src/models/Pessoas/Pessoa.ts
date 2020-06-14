export interface Pessoa {
    id?: string,
    apelido?: string,
    bairro?: string,
    cep?: string,
    cidadeId?: number;
    complemento?: string,
    condicaoPagamentoId?: number
    cpfcpnj?: string,
    email?: string,
    endereco?: string,
    nome?: string,
    numero?: string,
    observacao?: string,
    rgInscricaoEstadual?: string,
    telefone?: string,
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
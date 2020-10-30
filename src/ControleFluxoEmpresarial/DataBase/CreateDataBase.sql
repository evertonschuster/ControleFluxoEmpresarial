﻿CREATE DATABASE GestaoPessoalPostgress;

CREATE TABLE "AspNetRoles" (
    "Id" text NOT NULL,
    "Name" character varying(256) NULL,
    "NormalizedName" character varying(256) NULL,
    "ConcurrencyStamp" text NULL,
    CONSTRAINT "PK_AspNetRoles" PRIMARY KEY ("Id")
);

CREATE TABLE "AspNetUsers" (
    "Id" text NOT NULL,
    "UserName" character varying(256) NULL,
    "Name" character varying(256) NULL,
    "NormalizedUserName" character varying(256) NULL,
    "Email" character varying(256) NULL,
    "NormalizedEmail" character varying(256) NULL,
    "EmailConfirmed" boolean NOT NULL,
    "PasswordHash" text NULL,
    "SecurityStamp" text NULL,
    "ConcurrencyStamp" text NULL,
    "PhoneNumber" text NULL,
    "PhoneNumberConfirmed" boolean NOT NULL,
    "TwoFactorEnabled" boolean NOT NULL,
    "LockoutEnd" TIMESTAMP WITH TIME ZONE NULL,
    "LockoutEnabled" boolean NOT NULL,
    "AccessFailedCount" INTEGER NOT NULL,
    CONSTRAINT "PK_AspNetUsers" PRIMARY KEY ("Id")
);

CREATE TABLE "AspNetRoleClaims" (
    "Id" INTEGER NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "RoleId" text NOT NULL,
    "ClaimType" text NULL,
    "ClaimValue" text NULL,
    CONSTRAINT "PK_AspNetRoleClaims" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_AspNetRoleClaims_AspNetRoles_RoleId" FOREIGN KEY ("RoleId") REFERENCES "AspNetRoles" ("Id") 
);

CREATE TABLE "AspNetUserClaims" (
    "Id" INTEGER NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "UserId" text NOT NULL,
    "ClaimType" text NULL,
    "ClaimValue" text NULL,
    CONSTRAINT "PK_AspNetUserClaims" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_AspNetUserClaims_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") 
);

CREATE TABLE "AspNetUserLogins" (
    "LoginProvider" text NOT NULL,
    "ProviderKey" text NOT NULL,
    "ProviderDisplayName" text NULL,
    "UserId" text NOT NULL,
    CONSTRAINT "PK_AspNetUserLogins" PRIMARY KEY ("LoginProvider", "ProviderKey"),
    CONSTRAINT "FK_AspNetUserLogins_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") 
);

CREATE TABLE "AspNetUserRoles" (
    "UserId" text NOT NULL,
    "RoleId" text NOT NULL,
    CONSTRAINT "PK_AspNetUserRoles" PRIMARY KEY ("UserId", "RoleId"),
    CONSTRAINT "FK_AspNetUserRoles_AspNetRoles_RoleId" FOREIGN KEY ("RoleId") REFERENCES "AspNetRoles" ("Id") ,
    CONSTRAINT "FK_AspNetUserRoles_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") 
);

CREATE TABLE "AspNetUserTokens" (
    "UserId" text NOT NULL,
    "LoginProvider" text NOT NULL,
    "Name" text NOT NULL,
    "Value" text NULL,
    CONSTRAINT "PK_AspNetUserTokens" PRIMARY KEY ("UserId", "LoginProvider", "Name"),
    CONSTRAINT "FK_AspNetUserTokens_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") 
);

CREATE TABLE Paises (
    Id INTEGER NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    Nome VARCHAR(50) NOT NULL,
    Sigla VARCHAR(5) NOT NULL,
    DDI VARCHAR(5) NOT NULL,
    Situacao TIMESTAMP WITH TIME ZONE,

    DataCriacao  TIMESTAMP WITH TIME ZONE,
    DataAtualizacao TIMESTAMP WITH TIME ZONE,
    UserCriacao text NOT NULL,
    UserAtualizacao text NULL,

    CONSTRAINT FK_Paises_AspNetUsers_UserCriacao FOREIGN KEY (UserCriacao) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT FK_Paises_AspNetUsers_UserAtualizacao FOREIGN KEY (UserAtualizacao) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT PK_Paises PRIMARY KEY (Id)
);

CREATE TABLE Estados (
    Id INTEGER NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    Nome VARCHAR(50) NOT NULL,
    UF VARCHAR(5) NOT NULL,
    Situacao TIMESTAMP WITH TIME ZONE,
    PaisId INTEGER NOT NULL,
    
    DataCriacao  TIMESTAMP WITH TIME ZONE,
    DataAtualizacao TIMESTAMP WITH TIME ZONE,
    UserCriacao text NOT NULL,
    UserAtualizacao text NULL,


    CONSTRAINT FK_Estados_AspNetUsers_UserCriacao FOREIGN KEY (UserCriacao) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT FK_Estados_AspNetUsers_UserAtualizacao FOREIGN KEY (UserAtualizacao) REFERENCES "AspNetUsers" ("Id"),

    CONSTRAINT PK_Estados PRIMARY KEY (Id),
    CONSTRAINT FK_Estados_Paises_PaisId FOREIGN KEY (PaisId) REFERENCES Paises (Id)
);

CREATE TABLE Cidades (
    Id INTEGER NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    Nome  VARCHAR(50) NOT NULL,
    DDD  VARCHAR(5) NOT NULL,
    Situacao TIMESTAMP WITH TIME ZONE,
    EstadoId INTEGER NOT NULL,

    DataCriacao  TIMESTAMP WITH TIME ZONE,
    DataAtualizacao TIMESTAMP WITH TIME ZONE,
    UserCriacao text NOT NULL,
    UserAtualizacao text NULL,

    CONSTRAINT PK_Cidades PRIMARY KEY (Id),
    CONSTRAINT FK_Cidades_Estados_EstadoId FOREIGN KEY (EstadoId) REFERENCES Estados (Id) ,
    CONSTRAINT FK_Cidades_AspNetUsers_UserCriacao FOREIGN KEY (UserCriacao) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT FK_Cidades_AspNetUsers_UserAtualizacao FOREIGN KEY (UserAtualizacao) REFERENCES "AspNetUsers" ("Id")
);

CREATE TABLE FormaPagamentos (
    Id INTEGER NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    Nome  VARCHAR(50) NOT NULL,
    Situacao TIMESTAMP WITH TIME ZONE,

    DataCriacao  TIMESTAMP WITH TIME ZONE,
    DataAtualizacao TIMESTAMP WITH TIME ZONE,
    UserCriacao text NOT NULL,
    UserAtualizacao text NULL,

    CONSTRAINT PK_Forma_Pagamentos PRIMARY KEY (Id),
    CONSTRAINT FK_FormaPagamentos_AspNetUsers_UserCriacao FOREIGN KEY (UserCriacao) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT FK_FormaPagamentos_AspNetUsers_UserAtualizacao FOREIGN KEY (UserAtualizacao) REFERENCES "AspNetUsers" ("Id")
);

CREATE TABLE CondicaoPagamentos (
    Id INTEGER NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    Nome text NULL,
	Juro DECIMAL NOT NULL,
	Multa DECIMAL NOT NULL,
	Desconto DECIMAL NOT NULL,
    Situacao TIMESTAMP WITH TIME ZONE,

	DataCriacao  TIMESTAMP WITH TIME ZONE,
    DataAtualizacao TIMESTAMP WITH TIME ZONE,
    UserCriacao text NOT NULL,
    UserAtualizacao text NULL,

    CONSTRAINT FK_CondicaoPagamentos_AspNetUsers_UserCriacao FOREIGN KEY (UserCriacao) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT FK_CondicaoPagamentos_AspNetUsers_UserAtualizacao FOREIGN KEY (UserAtualizacao) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT PK_Condicao_Pagamentos PRIMARY KEY (Id)
);

CREATE TABLE CondicaoPagamentoParcelas (
    Id INTEGER NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	NumeroDias INTEGER NOT NULL,
	Percentual DECIMAL NOT NULL,
	CondicaoPagamentosId INTEGER NOT NULL,
	FormaPagamentoId INTEGER NOT NULL,

    DataCriacao  TIMESTAMP WITH TIME ZONE,
    DataAtualizacao TIMESTAMP WITH TIME ZONE,
    UserCriacao text NOT NULL,
    UserAtualizacao text NULL,

    CONSTRAINT PK_Condicao_Pagamento_Parcelas PRIMARY KEY (Id),
    CONSTRAINT FK_Parcelas_FormaPagamentos_FormaPagamentoId FOREIGN KEY (FormaPagamentoId) REFERENCES FormaPagamentos (Id),
    CONSTRAINT FK_Parcelas_FormaPagamentos_CondicaoPagamentosId FOREIGN KEY (CondicaoPagamentosId) REFERENCES CondicaoPagamentos (Id),
    CONSTRAINT FK_CondicaoPagamentoParcelas_AspNetUsers_UserCriacao FOREIGN KEY (UserCriacao) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT FK_CondicaoPagamentoParcelas_AspNetUsers_UserAtualizacao FOREIGN KEY (UserAtualizacao) REFERENCES "AspNetUsers" ("Id")
);

CREATE TABLE Categorias (
    Id INTEGER NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    Nome  VARCHAR(50) NOT NULL,
    Situacao TIMESTAMP WITH TIME ZONE,

    DataCriacao  TIMESTAMP WITH TIME ZONE,
    DataAtualizacao TIMESTAMP WITH TIME ZONE,
    UserCriacao text NOT NULL,
    UserAtualizacao text NULL,

    CONSTRAINT PK_Categorias PRIMARY KEY (Id),
    CONSTRAINT FK_Categorias_AspNetUsers_UserCriacao FOREIGN KEY (UserCriacao) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT FK_Categorias_AspNetUsers_UserAtualizacao FOREIGN KEY (UserAtualizacao) REFERENCES "AspNetUsers" ("Id")
);

CREATE TABLE FuncaoFuncionarios (
    Id INTEGER NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    Nome VARCHAR(50) NOT NULL,
    CargaHoraria DECIMAL NOT NULL,
    RequerCNH boolean NOT NULL,
    Descricao VARCHAR(255) NULL,
    Observacao VARCHAR(255) NULL,
    Situacao TIMESTAMP WITH TIME ZONE,

    DataCriacao  TIMESTAMP WITH TIME ZONE,
    DataAtualizacao TIMESTAMP WITH TIME ZONE,
    UserCriacao text NOT NULL,
    UserAtualizacao text NULL,

    CONSTRAINT PK_FuncaoFuncionarios PRIMARY KEY (Id),
    CONSTRAINT FK_FuncaoFuncionarios_AspNetUsers_UserCriacao FOREIGN KEY (UserCriacao) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT FK_FuncaoFuncionarios_AspNetUsers_UserAtualizacao FOREIGN KEY (UserAtualizacao) REFERENCES "AspNetUsers" ("Id")
);

CREATE TABLE Marcas (
    Id INTEGER NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    Nome VARCHAR(50) NOT NULL,
	Situacao TIMESTAMP WITH TIME ZONE,
    
    DataCriacao  TIMESTAMP WITH TIME ZONE ,
    DataAtualizacao TIMESTAMP WITH TIME ZONE,
    UserCriacao text NOT NULL,
    UserAtualizacao text NULL,

    CONSTRAINT PK_Marcas PRIMARY KEY (Id),
    CONSTRAINT FK_Marcas_AspNetUsers_UserCriacao FOREIGN KEY (UserCriacao) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT FK_Marcas_AspNetUsers_UserAtualizacao FOREIGN KEY (UserAtualizacao) REFERENCES "AspNetUsers" ("Id")
);

CREATE TABLE UnidadesMedida (
    Id  VARCHAR(3) NOT NULL,
    Nome VARCHAR(50) NOT NULL,
	Situacao TIMESTAMP WITH TIME ZONE,

    DataCriacao  TIMESTAMP WITH TIME ZONE ,
    DataAtualizacao TIMESTAMP WITH TIME ZONE,
    UserCriacao text NOT NULL,
    UserAtualizacao text NULL,

    CONSTRAINT PK_UnidadesMedida PRIMARY KEY (Id),
    CONSTRAINT FK_UnidadesMedida_AspNetUsers_UserCriacao FOREIGN KEY (UserCriacao) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT FK_UnidadesMedida_AspNetUsers_UserAtualizacao FOREIGN KEY (UserAtualizacao) REFERENCES "AspNetUsers" ("Id")
);

CREATE TABLE Clientes (
    Id INTEGER NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    Nome VARCHAR(60) NOT NULL,
    Apelido VARCHAR(60) NULL,

    Bairro VARCHAR(60) NOT NULL,
    Cep VARCHAR(9) NOT NULL,
    Numero VARCHAR(10) NOT NULL,
    Endereco VARCHAR(60) NOT NULL,
    CidadeId INTEGER NOT NULL,
    Complemento VARCHAR(255) NULL,
	
    IsBrasileiro boolean NOT NULL,
    Nacionalidade VARCHAR(20) NOT NULL,

    CPFCPNJ VARCHAR(18) NULL,
    RgInscricaoEstadual VARCHAR(19) NULL,
    DataNascimento TIMESTAMP WITH TIME ZONE NULL,

    Email VARCHAR(60) NOT NULL,
    Telefone VARCHAR(30) NOT NULL,
    EstadoCivil VARCHAR(20) NULL,
    Tipo VARCHAR(10) NOT NULL,
    Sexo VARCHAR(10) NULL,

    CondicaoPagamentoId  INTEGER NOT NULL,
    LimiteCredito DECIMAL(10,2),
	
    Observacao VARCHAR(255) NULL,
	Situacao TIMESTAMP WITH TIME ZONE,

    DataCriacao  TIMESTAMP WITH TIME ZONE ,
    DataAtualizacao TIMESTAMP WITH TIME ZONE,
    UserCriacao text NOT NULL,
    UserAtualizacao text NULL,

    CONSTRAINT PK_Clientes PRIMARY KEY (Id),
    FOREIGN KEY (CidadeId) REFERENCES Cidades (Id) ,
	FOREIGN KEY (CondicaoPagamentoId) REFERENCES CondicaoPagamentos (Id) ,
    CONSTRAINT FK_Clientes_AspNetUsers_UserCriacao FOREIGN KEY (UserCriacao) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT FK_Clientes_AspNetUsers_UserAtualizacao FOREIGN KEY (UserAtualizacao) REFERENCES "AspNetUsers" ("Id")
);

CREATE TABLE Fornecedores (
    Id INTEGER NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    Nome VARCHAR(60) NOT NULL,
    Apelido VARCHAR(60) NULL,

    Bairro VARCHAR(60) NOT NULL,
    Cep VARCHAR(9) NOT NULL,
    Complemento VARCHAR(255) NULL,
    Endereco VARCHAR(60) NOT NULL,
    Numero VARCHAR(10) NOT NULL,
    CidadeId INTEGER NOT NULL,

    RgInscricaoEstadual VARCHAR(19) NOT NULL,
    CPFCPNJ VARCHAR(18) NOT NULL,
    Email VARCHAR(60) NOT NULL,
	Contato VARCHAR(60) NOT NULL,
    Telefone VARCHAR(30) NOT NULL,
	Tipo VARCHAR(10) NOT NULL,
	Observacao VARCHAR(255) NULL,

    CondicaoPagamentoId  INTEGER NOT NULL,
    LimiteCredito DECIMAL(10,2),
	Situacao TIMESTAMP WITH TIME ZONE,
   
    DataCriacao  TIMESTAMP WITH TIME ZONE ,
    DataAtualizacao TIMESTAMP WITH TIME ZONE,
    UserCriacao text NOT NULL,
    UserAtualizacao text NULL,

    CONSTRAINT PK_Fornecedores PRIMARY KEY (Id),
    FOREIGN KEY (CidadeId) REFERENCES Cidades (Id) ,
	FOREIGN KEY (CondicaoPagamentoId) REFERENCES CondicaoPagamentos (Id) ,
    CONSTRAINT FK_Fornecedores_AspNetUsers_UserCriacao FOREIGN KEY (UserCriacao) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT FK_Fornecedores_AspNetUsers_UserAtualizacao FOREIGN KEY (UserAtualizacao) REFERENCES "AspNetUsers" ("Id")
);

CREATE TABLE Produtos (
    Id INTEGER NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    Nome VARCHAR(60) NOT NULL,
	UnidadeMedidaId VARCHAR(3) NOT NULL,
	CodigoBarras VARCHAR(20) NULL,
	Referencia VARCHAR(60) NULL,
	MarcaId INTEGER NOT NULL,
	CategoriaId INTEGER NOT NULL,
	QuantidadeMinima DECIMAL(10,2) NOT NULL,
	ValorCompra  DECIMAL(10,2) NOT NULL,
	ValorVenda  DECIMAL(10,2) NOT NULL,
	Quantidade  DECIMAL(10,2) NOT NULL,
	PercentualLucro  DECIMAL(10,2) NOT NULL,
	Observacao VARCHAR(255) NULL,
	Descricao VARCHAR(255) NULL,
	Situacao TIMESTAMP WITH TIME ZONE,

	DataCriacao  TIMESTAMP WITH TIME ZONE ,
    DataAtualizacao TIMESTAMP WITH TIME ZONE,
    UserCriacao text NOT NULL,
    UserAtualizacao text NULL,

    CONSTRAINT PK_Produtos PRIMARY KEY (Id),
    FOREIGN KEY (UnidadeMedidaId) REFERENCES UnidadesMedida (Id),
	FOREIGN KEY (MarcaId) REFERENCES Marcas (Id),
	FOREIGN KEY (CategoriaId) REFERENCES Categorias (Id) ,
    CONSTRAINT FK_Produtos_AspNetUsers_UserCriacao FOREIGN KEY (UserCriacao) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT FK_Produtos_AspNetUsers_UserAtualizacao FOREIGN KEY (UserAtualizacao) REFERENCES "AspNetUsers" ("Id")
);

CREATE TABLE Funcionarios (
    Id INTEGER NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    Nome VARCHAR(60) NOT NULL,
    Apelido VARCHAR(60) NULL,

    Bairro VARCHAR(60) NOT NULL,
    Cep VARCHAR(9) NOT NULL,
    Endereco VARCHAR(60) NOT NULL,
    Numero VARCHAR(10) NOT NULL,
    CidadeId INTEGER NOT NULL,
    Complemento VARCHAR(255) NULL,
    
    CPFCPNJ VARCHAR(18) NOT NULL,
    RgInscricaoEstadual VARCHAR(19) NOT NULL,
	cnh VARCHAR(14) NULL,
	DataValidadeCNH TIMESTAMP WITH TIME ZONE NULL,
    Sexo VARCHAR(10) NOT NULL,
    Email VARCHAR(60) NOT NULL,
    Telefone VARCHAR(30) NOT NULL,
	Observacao VARCHAR(255) NULL,
  	EstadoCivil VARCHAR(20) NULL,
	
	IsBrasileiro boolean NOT NULL,
    Salario DECIMAL(10,2) NOT NULL,
    DataDemissao TIMESTAMP WITH TIME ZONE NULL,
    DataAdmissao TIMESTAMP WITH TIME ZONE NOT NULL,
	Situacao TIMESTAMP WITH TIME ZONE,
    
	Nacionalidade VARCHAR(20) NOT NULL,
	DataNascimento TIMESTAMP WITH TIME ZONE NOT NULL,
	FuncaoFuncionarioId int NOT NULL,
	
  	DataCriacao TIMESTAMP WITH TIME ZONE ,
    DataAtualizacao TIMESTAMP WITH TIME ZONE,
    UserCriacao text NOT NULL,
    UserAtualizacao text NULL,
	
    CONSTRAINT PK_Funcionarios PRIMARY KEY (Id),
    FOREIGN KEY (CidadeId) REFERENCES Cidades (Id),
	FOREIGN KEY (FuncaoFuncionarioId) REFERENCES FuncaoFuncionarios (Id),


    CONSTRAINT FK_Funcionarios_AspNetUsers_UserCriacao FOREIGN KEY (UserCriacao) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT FK_Funcionarios_AspNetUsers_UserAtualizacao FOREIGN KEY (UserAtualizacao) REFERENCES "AspNetUsers" ("Id")
);


CREATE TABLE Servicos (
    Id INTEGER NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    Nome VARCHAR(60) NOT NULL,
	CategoriaId INTEGER NOT NULL,
	Valor DECIMAL(10,2) NOT NULL,
	Observacao VARCHAR(255) NULL,
	Descricao VARCHAR(255) NULL,
	Situacao TIMESTAMP WITH TIME ZONE,

	DataCriacao  TIMESTAMP WITH TIME ZONE ,
    DataAtualizacao TIMESTAMP WITH TIME ZONE,
    UserCriacao text NOT NULL,
    UserAtualizacao text NULL,

    CONSTRAINT PK_Servicos PRIMARY KEY (Id),
	FOREIGN KEY (CategoriaId) REFERENCES Categorias (Id) ,
    CONSTRAINT FK_Servicos_AspNetUsers_UserCriacao FOREIGN KEY (UserCriacao) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT FK_Servicos_AspNetUsers_UserAtualizacao FOREIGN KEY (UserAtualizacao) REFERENCES "AspNetUsers" ("Id")
);

CREATE TABLE FuncionarioServicos(
    ServicoId  INTEGER NOT NULL,
    FuncionarioId  INTEGER NOT NULL,

    CONSTRAINT PK_FuncionarioServicos PRIMARY KEY (FuncionarioId,ServicoId),
	FOREIGN KEY (ServicoId) REFERENCES Servicos (Id),
	FOREIGN KEY (FuncionarioId) REFERENCES Funcionarios (Id)
);


CREATE TABLE ContasPagar (
    Numero VARCHAR(20) NOT NULL,
    Modelo VARCHAR(2) NOT NULL,
    Serie VARCHAR(2) NOT NULL,
    FornecedorId INTEGER NOT NULL,
    Parcela INTEGER NOT NULL,
    Valor DECIMAL(10,2) NOT NULL,
    Desconto DECIMAL(10,2) NULL,
    Multa DECIMAL(10,2) NULL,
    Juro DECIMAL(10,2) NULL,
    ValorBaixa DECIMAL(10,2) NULL,
    FormaPagamentoId INTEGER NOT NULL,
    DataVencimento TIMESTAMP WITH TIME ZONE,
    DataEmissao TIMESTAMP WITH TIME ZONE,
    Descricao VARCHAR(255) NULL,

    DataBaixa TIMESTAMP WITH TIME ZONE,
    DataPagamento TIMESTAMP WITH TIME ZONE,
    UserBaixa text NULL,

    DataCancelamento TIMESTAMP WITH TIME ZONE,
    UserCancelamento text NULL,
    JustificativaCancelamento VARCHAR(255) NULL,

    DataCriacao  TIMESTAMP WITH TIME ZONE,
    DataAtualizacao TIMESTAMP WITH TIME ZONE,
    UserCriacao text NOT NULL,
    UserAtualizacao text NULL,

    CONSTRAINT FK_ContasPagar_Fornecedores_FornecedorId FOREIGN KEY (FornecedorId) REFERENCES Fornecedores(Id),
    CONSTRAINT FK_ContasPagar_FormaPagamentos_FormaPagamentoId FOREIGN KEY (FormaPagamentoId) REFERENCES FormaPagamentos(Id),
    CONSTRAINT FK_ContasPagar_AspNetUsers_UserCriacao FOREIGN KEY (UserCriacao) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT FK_ContasPagar_AspNetUsers_UserBaixa FOREIGN KEY (UserBaixa) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT FK_ContasPagar_AspNetUsers_UserAtualizacao FOREIGN KEY (UserAtualizacao) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT FK_ContasPagar_AspNetUsers_UserCancelamento FOREIGN KEY (UserCancelamento) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT PK_ContasPagar PRIMARY KEY (Numero, Modelo, Serie, FornecedorId, Parcela)
);


CREATE TABLE Compras (
    Numero VARCHAR(20) NOT NULL,
    Modelo VARCHAR(2) NOT NULL,
    Serie VARCHAR(2) NOT NULL,
    FornecedorId INTEGER NOT NULL,

    DataEmissao TIMESTAMP WITH TIME ZONE NOT NULL,
    DataChegada TIMESTAMP WITH TIME ZONE NOT NULL,

    CondicaoPagamentoId INTEGER NOT NULL,
    Frete DECIMAL(10,2) NULL,
    Seguro DECIMAL(10,2) NULL,
    OutrasDespesas DECIMAL(10,2) NULL,
    Observacoes VARCHAR(255) NULL,
    ConhecimentoFrete BOOLEAN NOT NULL,
   
    DataCancelamento TIMESTAMP WITH TIME ZONE,
    UserCancelamento text NULL,
    JustificativaCancelamento VARCHAR(255) NULL,

    DataCancelamentoBaixa TIMESTAMP WITH TIME ZONE,
    UserCancelamentoBaixa text NULL,
    JustificativaCancelamentoBaixa VARCHAR(255) NULL,

    DataCriacao  TIMESTAMP WITH TIME ZONE,
    DataAtualizacao TIMESTAMP WITH TIME ZONE,
    UserCriacao text NOT NULL,
    UserAtualizacao text NULL,

    CONSTRAINT FK_Compra_Fornecedores_FornecedorId FOREIGN KEY (FornecedorId) REFERENCES Fornecedores(Id),
    CONSTRAINT FK_Compra_AspNetUsers_UserCriacao FOREIGN KEY (UserCriacao) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT FK_Compra_AspNetUsers_UserAtualizacao FOREIGN KEY (UserAtualizacao) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT FK_Compra_AspNetUsers_UserCancelamento FOREIGN KEY (UserCancelamento) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT FK_Compra_CondicaoPagamento_CondicaoPagamentoId FOREIGN KEY (CondicaoPagamentoId) REFERENCES CondicaoPagamentos (Id),
    CONSTRAINT PK_Compra PRIMARY KEY (Numero, Modelo, Serie, FornecedorId)
);


CREATE TABLE CompraProdutos (
    Numero VARCHAR(20) NOT NULL,
    Modelo VARCHAR(2) NOT NULL,
    Serie VARCHAR(2) NOT NULL,
    FornecedorId INTEGER NOT NULL,

	ProdutoId INTEGER NOT NULL,
   
	Quantidade DECIMAL(10,2) NOT NULL,
	ValorUnitario DECIMAL(10,2) NOT NULL,
	Desconto DECIMAL(10,2) NULL,
	IPI DECIMAL(10,2) NULL,
	CustoUnitario DECIMAL(10,2) NOT NULL,

    CONSTRAINT FK_CompraProduto_compra FOREIGN KEY (Numero, Modelo, Serie, FornecedorId) REFERENCES Compras(Numero, Modelo, Serie, FornecedorId),
	CONSTRAINT FK_CompraProduto_Produtos_ProdutoId FOREIGN KEY (ProdutoId) REFERENCES Produtos (Id),
    CONSTRAINT PK_CompraProduto PRIMARY KEY (Numero, Modelo, Serie, FornecedorId, ProdutoId)
)



CREATE TABLE OrdensServico (
    Id INTEGER NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    ClienteId INTEGER NOT NULL,
    DescricaoEquipamento VARCHAR(255) NOT NULL,
    DescricaoProblemaRelatado VARCHAR(255) NOT NULL,
    DescricaoAcessorio VARCHAR(255) NOT NULL,
    DescricaoObservacao VARCHAR(255) NULL,
    DescricaoTecnico VARCHAR(255) NULL,
    DescricaoObservacaoTecnico VARCHAR(255) NULL,
    NumeroSerie VARCHAR(50) NULL,
    CondicaoPagamentoId INTEGER NULL,
    
    DataAbertura TIMESTAMP WITH TIME ZONE NOT NULL,
    DataExecucao TIMESTAMP WITH TIME ZONE NULL,
    DataDevolucaoCliente TIMESTAMP WITH TIME ZONE NULL,
    
    DataCancelamento TIMESTAMP WITH TIME ZONE NULL,
    JustificativaCancelamento VARCHAR(255) NULL,
    UserCancelamento text NULL,

    DataCriacao  TIMESTAMP WITH TIME ZONE ,
    DataAtualizacao TIMESTAMP WITH TIME ZONE,
    UserCriacao text NOT NULL,
    UserAtualizacao text NULL,

    CONSTRAINT PK_OrdensServico PRIMARY KEY (Id),
	FOREIGN KEY (ClienteId) REFERENCES Clientes (Id) ,
	FOREIGN KEY (CondicaoPagamentoId) REFERENCES CondicaoPagamentos (Id) ,
    CONSTRAINT FK_OrdensServico_AspNetUsers_UserCriacao FOREIGN KEY (UserCriacao) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT FK_OrdensServico_AspNetUsers_UserAtualizacao FOREIGN KEY (UserAtualizacao) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT FK_OrdensServico_AspNetUsers_UserCancelamento FOREIGN KEY (UserCancelamento) REFERENCES "AspNetUsers" ("Id")
)


CREATE TABLE OrdemServicoServicos (
    OrdemServicoId INTEGER NOT NULL,
    ServicoId INTEGER NOT NULL,
    FuncionarioId INTEGER NOT NULL,
    Quantidade DECIMAL NOT NULL,
    Valor DECIMAL NOT NULL,

    DataCriacao  TIMESTAMP WITH TIME ZONE ,
    DataAtualizacao TIMESTAMP WITH TIME ZONE,
    UserCriacao text NOT NULL,
    UserAtualizacao text NULL,

    CONSTRAINT PK_OrdemServicoServicos PRIMARY KEY (OrdemServicoId, ServicoId),
	FOREIGN KEY (ServicoId) REFERENCES Servicos (Id) ,
	FOREIGN KEY (FuncionarioId) REFERENCES Funcionarios (Id) ,
	FOREIGN KEY (OrdemServicoId) REFERENCES OrdensServico (Id) ,

    CONSTRAINT FK_OrdensServico_AspNetUsers_UserCriacao FOREIGN KEY (UserCriacao) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT FK_OrdensServico_AspNetUsers_UserAtualizacao FOREIGN KEY (UserAtualizacao) REFERENCES "AspNetUsers" ("Id")
)


CREATE TABLE OrdemServicoProdutos (
    OrdemServicoId INTEGER NOT NULL,
    ProdutoId INTEGER NOT NULL,
    Quantidade DECIMAL NOT NULL,
    Valor DECIMAL NOT NULL,

    DataCriacao  TIMESTAMP WITH TIME ZONE ,
    DataAtualizacao TIMESTAMP WITH TIME ZONE,
    UserCriacao text NOT NULL,
    UserAtualizacao text NULL,

    CONSTRAINT PK_OrdemServicoProdutos PRIMARY KEY (OrdemServicoId, ProdutoId),
	FOREIGN KEY (OrdemServicoId) REFERENCES OrdensServico (Id) ,
	FOREIGN KEY (ProdutoId) REFERENCES Produtos (Id) ,

	CONSTRAINT FK_OrdemServicoProdutos_AspNetUsers_UserCriacao FOREIGN KEY (UserCriacao) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT FK_OrdemServicoProdutos_AspNetUsers_UserAtualizacao FOREIGN KEY (UserAtualizacao) REFERENCES "AspNetUsers" ("Id")
)




CREATE TABLE Vendas (
    Numero VARCHAR(20) NOT NULL,
    Modelo VARCHAR(2) NOT NULL,
    Serie VARCHAR(2) NOT NULL,
    Descricao  VARCHAR(255) NULL,
    DataEmissao TIMESTAMP WITH TIME ZONE NOT NULL,

    DataCancelamento TIMESTAMP WITH TIME ZONE NULL,
    UserCancelamento text NULL,
    JustificativaCancelamento VARCHAR(255) NULL,

    ClienteId INTEGER NOT NULL,
    CondicaoPagamentoId INTEGER NOT NULL,
    OrdemServicoId INTEGER NULL,

    DataCriacao  TIMESTAMP WITH TIME ZONE ,
    DataAtualizacao TIMESTAMP WITH TIME ZONE,
    UserCriacao text NOT NULL,
    UserAtualizacao text NULL,

    CONSTRAINT PK_Vendas PRIMARY KEY (Numero, Modelo, Serie),
	FOREIGN KEY (ClienteId) REFERENCES Clientes (Id) ,
	FOREIGN KEY (OrdemServicoId) REFERENCES OrdensServico (Id) ,
	FOREIGN KEY (CondicaoPagamentoId) REFERENCES CondicaoPagamentos (Id) ,

	CONSTRAINT FK_Vendas_AspNetUsers_UserCriacao FOREIGN KEY (UserCriacao) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT FK_Vendas_AspNetUsers_UserAtualizacao FOREIGN KEY (UserAtualizacao) REFERENCES "AspNetUsers" ("Id")
)

CREATE TABLE VendaServicos (

    VendaNumero VARCHAR(20) NOT NULL,
    VendaModelo VARCHAR(2) NOT NULL,
    VendaSerie VARCHAR(2) NOT NULL,

    ServicoId INTEGER NOT NULL,
    FuncionarioId INTEGER NOT NULL,
    Quantidade DECIMAL NOT NULL,
    Valor DECIMAL NOT NULL,
    
    DataCriacao  TIMESTAMP WITH TIME ZONE ,
    DataAtualizacao TIMESTAMP WITH TIME ZONE,
    UserCriacao text NOT NULL,
    UserAtualizacao text NULL,

    CONSTRAINT PK_VendaServicos PRIMARY KEY (VendaNumero, VendaModelo, VendaSerie, ServicoId),
	FOREIGN KEY (ServicoId) REFERENCES Servicos (Id) ,
    FOREIGN KEY (FuncionarioId) REFERENCES Funcionarios (Id),
	FOREIGN KEY (VendaNumero, VendaModelo, VendaSerie) REFERENCES Vendas (Numero, Modelo, Serie) ,

	CONSTRAINT FK_VendaServicos_AspNetUsers_UserCriacao FOREIGN KEY (UserCriacao) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT FK_VendaServicos_AspNetUsers_UserAtualizacao FOREIGN KEY (UserAtualizacao) REFERENCES "AspNetUsers" ("Id")
)

CREATE TABLE VendaProdutos (

    VendaNumero VARCHAR(20) NOT NULL,
    VendaModelo VARCHAR(2) NOT NULL,
    VendaSerie VARCHAR(2) NOT NULL,

    ProdutoId INTEGER NOT NULL,
    Quantidade DECIMAL NOT NULL,
    Valor DECIMAL NOT NULL,
    
    DataCriacao  TIMESTAMP WITH TIME ZONE ,
    DataAtualizacao TIMESTAMP WITH TIME ZONE,
    UserCriacao text NOT NULL,
    UserAtualizacao text NULL,

    CONSTRAINT PK_VendaProdutos PRIMARY KEY (VendaNumero, VendaModelo, VendaSerie, ProdutoId),
	FOREIGN KEY (ProdutoId) REFERENCES Produtos (Id) ,
	FOREIGN KEY (VendaNumero, VendaModelo, VendaSerie) REFERENCES Vendas (Numero, Modelo, Serie) ,

	CONSTRAINT FK_VendaProdutos_AspNetUsers_UserCriacao FOREIGN KEY (UserCriacao) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT FK_VendaProdutos_AspNetUsers_UserAtualizacao FOREIGN KEY (UserAtualizacao) REFERENCES "AspNetUsers" ("Id")
)


CREATE TABLE ContasReceber (
    Numero VARCHAR(20) NOT NULL,
    Modelo VARCHAR(2) NOT NULL,
    Serie VARCHAR(2) NOT NULL,
    Parcela INTEGER NOT NULL,
    
    ClienteId INTEGER NOT NULL,
    Valor DECIMAL(10,2) NOT NULL,
    Desconto DECIMAL(10,2) NULL,
    Multa DECIMAL(10,2) NULL,
    Juro DECIMAL(10,2) NULL,
    ValorBaixa DECIMAL(10,2) NULL,
    FormaPagamentoId INTEGER NOT NULL,
    DataVencimento TIMESTAMP WITH TIME ZONE,
    DataEmissao TIMESTAMP WITH TIME ZONE,
    Descricao VARCHAR(255) NULL,

    DataBaixa TIMESTAMP WITH TIME ZONE,
    DataPagamento TIMESTAMP WITH TIME ZONE,
    UserBaixa text NULL,

    DataCancelamento TIMESTAMP WITH TIME ZONE,
    UserCancelamento text NULL,
    JustificativaCancelamento VARCHAR(255) NULL,

    DataCancelamentoBaixa TIMESTAMP WITH TIME ZONE,
    UserCancelamentoBaixa text NULL,
    JustificativaCancelamentoBaixa VARCHAR(255) NULL,

    DataCriacao  TIMESTAMP WITH TIME ZONE,
    DataAtualizacao TIMESTAMP WITH TIME ZONE,
    UserCriacao text NOT NULL,
    UserAtualizacao text NULL,

    CONSTRAINT FK_ContasReceber_Clientes_ClienteId FOREIGN KEY (ClienteId) REFERENCES Clientes(Id),
    CONSTRAINT FK_ContasReceber_FormaPagamentos_FormaPagamentoId FOREIGN KEY (FormaPagamentoId) REFERENCES FormaPagamentos(Id),
    CONSTRAINT FK_ContasReceber_AspNetUsers_UserCriacao FOREIGN KEY (UserCriacao) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT FK_ContasReceber_AspNetUsers_UserBaixa FOREIGN KEY (UserBaixa) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT FK_ContasReceber_AspNetUsers_UserAtualizacao FOREIGN KEY (UserAtualizacao) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT FK_ContasReceber_AspNetUsers_UserCancelamento FOREIGN KEY (UserCancelamento) REFERENCES "AspNetUsers" ("Id"),
    CONSTRAINT PK_ContasReceber PRIMARY KEY (Numero, Modelo, Serie, Parcela)
)
using ControleFluxoEmpresarial.DAOs.compose;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.DTO.Compras;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Compras;
using System;

namespace ControleFluxoEmpresarial.DAOs.Compras
{
    public class CompraDAO : DAO<Compra, CompraId>
    {
        public CompraDAO(DataBaseConnection context) : base(context, "Compras", new[] { "Modelo", "Serie", "Numero", "FornecedorId" })
        {
        }

        public override PaginationResult<Compra> GetPagined(PaginationQuery filter)
        {
            var sql = $@"SELECT compras.numero, compras.modelo, compras.serie, compras.fornecedorid, compras.dataemissao, compras.datachegada, compras.frete, compras.seguro, 
		                    compras.outrasdespesas, compras.observacoes, compras.datacancelamento, compras.usercancelamento, compras.justificativacancelamento, 
	                        compras.datacriacao, compras.dataatualizacao, compras.usercriacao, compras.useratualizacao,
		
	                        fornecedores.id as ""fornecedor.id"", fornecedores.nome as ""fornecedor.nome"", fornecedores.apelido as ""fornecedor.apelido"", 
                            fornecedores.bairro as ""fornecedor.bairro"", fornecedores.cep as ""fornecedor.cep"", fornecedores.cidadeid as ""fornecedor.cidadeid"", 
	                        fornecedores.complemento as ""fornecedor.complemento"", fornecedores.contato as ""fornecedor.contato"", 
	                        fornecedores.condicaopagamentoid as ""fornecedor.condicaopagamentoid"", fornecedores.cpfcpnj as ""fornecedor.cpfcpnj"", 
	                        fornecedores.email as ""fornecedor.email"", fornecedores.endereco as ""fornecedor.endereco"", fornecedores.numero as ""fornecedor.numero"", 
	                        fornecedores.rginscricaoestadual as ""fornecedor.rginscricaoestadual"", fornecedores.telefone as ""fornecedor.telefone"", 
	                        fornecedores.tipo as ""fornecedor.tipo"", fornecedores.limitecredito as ""fornecedor.limitecredito"", fornecedores.observacao as ""fornecedor.observacao"", 
	                        fornecedores.situacao as ""fornecedor.situacao"" , fornecedores.datacriacao as ""fornecedor.datacriacao"", 
	                        fornecedores.dataatualizacao as ""fornecedor.dataatualizacao"", fornecedores.usercriacao as ""fornecedor.usercriacao"", 
	                        fornecedores.useratualizacao as ""fornecedor.useratualizacao""


                    FROM compras
                        INNER JOIN fornecedores ON fornecedores.id = compras.fornecedorid";

            return this.ExecuteGetPaginated(sql, "SELECT  COUNT(*) AS TotalItem FROM compras", filter, filter);
        }

        public override void VerifyRelationshipDependence(object ids)
        {

        }
    }
}

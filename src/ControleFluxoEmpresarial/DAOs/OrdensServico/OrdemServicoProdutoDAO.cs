using ControleFluxoEmpresarial.DAOs.compose;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.OrdensServico;
using System;
using System.Collections.Generic;

namespace ControleFluxoEmpresarial.DAOs.OrdensServico
{
    public class OrdemServicoProdutoId
    {
        public int ProdutoId { get; set; }
        public int OrdemServicoId { get; set; }
    }

    public class OrdemServicoProdutoDAO : DAO<OrdemServicoProduto, OrdemServicoProdutoId>
    {
        public OrdemServicoProdutoDAO(DataBaseConnection context) : base(context, "OrdemServicoProdutos", new[] { "ProdutoId", "OrdemServicoId" })
        {
        }

        public override PaginationResult<OrdemServicoProduto> GetPagined(IPaginationQuery filter)
        {
            throw new NotImplementedException();
        }

        public override void VerifyRelationshipDependence(object ids)
        {
            throw new NotImplementedException();
        }

        public List<OrdemServicoProduto> GetInOrdemServico(int id)
        {
            var sql = @"SELECT ordemservicoprodutos.ordemservicoid, ordemservicoprodutos.produtoid, ordemservicoprodutos.quantidade, ordemservicoprodutos.valor, 
                                ordemservicoprodutos.datacriacao, ordemservicoprodutos.dataatualizacao, ordemservicoprodutos.usercriacao, ordemservicoprodutos.useratualizacao,
                            
	                            produtos.id as ""produto.id"", produtos.nome as ""produto.nome"", produtos.unidademedidaid as ""produto.unidademedidaid"", 
                                produtos.codigobarras as ""produto.codigobarras"", produtos.referencia as ""produto.referencia"", 
	                            produtos.marcaid as ""produto.marcaid"", produtos.categoriaid as ""produto.categoriaid"", 
	                            produtos.quantidademinima as ""produto.quantidademinima"", produtos.valorcompra as ""produto.valorcompra"", 
	                            produtos.valorvenda as ""produto.valorvenda"", produtos.quantidade as ""produto.quantidade"", 
	                            produtos.percentuallucro as ""produto.percentuallucro""

                        FROM public.ordemservicoprodutos
                            INNER JOIN public.produtos ON produtos.id = ordemservicoprodutos.produtoid
                        WHERE ordemservicoprodutos.ordemservicoid = @id ";

            return base.ExecuteGetAll(sql, new { id });
        }
    }
}

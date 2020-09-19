using ControleFluxoEmpresarial.DAOs.compose;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.DTO.Compras;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Compras;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.Compras
{
    public class CompraProdutoDAO : DAO<CompraProduto, ProdutoCompraId>
    {
        public CompraProdutoDAO(DataBaseConnection context) : base(context, "CompraProdutos", new[] { "Modelo", "Serie", "Numero", "FornecedorId", "ProdutoId" })
        {
        }

        public override PaginationResult<CompraProduto> GetPagined(PaginationQuery filter)
        {
            throw new NotImplementedException();
        }

        public override void VerifyRelationshipDependence(object ids)
        {
            throw new NotImplementedException();
        }

        internal List<CompraProduto> ListByCompraId(CompraId compraId)
        {
            var sql = $@"SELECT compraprodutos.numero, compraprodutos.modelo, compraprodutos.serie, compraprodutos.fornecedorid, compraprodutos.produtoid, 
		                        compraprodutos.unidademedidaid, compraprodutos.quantidade, compraprodutos.valorunitario, compraprodutos.desconto, 
		                        compraprodutos.ipi, compraprodutos.custounitario,
		
		                        produtos.id as ""produto.id"", produtos.nome as ""produto.nome"", produtos.unidademedidaid as ""produto.unidademedidaid"", 

                                produtos.referencia as ""produto.referencia"", produtos.marcaid as ""produto.marcaid"", produtos.categoriaid as ""produto.categoriaid"", 
		                        produtos.quantidademinima as ""produto.quantidademinima"", produtos.valorcompra as ""produto.valorcompra"", 
		                        produtos.quantidade as ""produto.quantidade"", produtos.observacao as ""produto.observacao"", produtos.descricao as ""produto.descricao"", 
		                        produtos.situacao as ""produto.situacao"", produtos.datacriacao as ""produto.datacriacao"", produtos.dataatualizacao as ""produto.dataatualizacao"", 
		                        produtos.usercriacao as ""produto.usercriacao"", produtos.useratualizacao as ""produto.useratualizacao"", 
		                        produtos.codigobarras as ""produto.codigobarras"", produtos.valorvenda as ""produto.valorvenda"",
		
		                        unidadesmedida.id as ""unidadeMedida.id"", unidadesmedida.nome as ""unidadeMedida.nome"", unidadesmedida.situacao as ""unidadeMedida.situacao"", 
		                        unidadesmedida.datacriacao as ""unidadeMedida.datacriacao"", unidadesmedida.dataatualizacao as ""unidadeMedida.dataatualizacao"", 
		                        unidadesmedida.usercriacao as ""unidadeMedida.usercriacao"", unidadesmedida.useratualizacao as ""unidadeMedida.useratualizacao""

                        FROM public.compraprodutos
                            INNER JOIN public.produtos ON produtos.id = compraprodutos.produtoid
                            INNER JOIN public.unidadesmedida ON unidadesmedida.id = compraprodutos.unidademedidaid

                        WHERE Modelo = @Modelo and Serie = @Serie and Numero = @Numero and FornecedorId = @FornecedorId";

            return this.ExecuteGetAll(sql, compraId);
        }
    }
}

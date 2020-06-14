using ControleFluxoEmpresarial.Models.Movimentos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.Movimentos
{
    public class ProdutoDAO : DAOReflection<Produto>
    {
        protected override string SqlListPagined { get; set; } = @"
        SELECT Produtos.Id, Produtos.Nome, Produtos.UnidadeMedidaId, Produtos.CodigoBarras, Produtos.Referencia, Produtos.Descricao, 
                Produtos.Observacao, Produtos.MarcaId, Produtos.CategoriaId, Produtos.QuantidadeMinima, Produtos.ValorCompra, Produtos.ValorVenda, 
                Produtos.Quantidade, Produtos.DataCriacao, Produtos.DataAtualizacao,
		
		        categorias.id AS ""categoria.id"", categorias.nome AS ""categoria.nome"", categorias.datacriacao AS ""categoria.datacriacao"", 
		        categorias.dataatualizacao AS ""categorias.dataatualizacao"",

                marcas.id AS ""marca.id"", marcas.nome AS ""marca.nome"", marcas.datacriacao AS ""marca.datacriacao"", marcas.dataatualizacao AS ""marca.dataatualizacao""

        FROM Produtos
            INNER JOIN categorias ON categorias.id = Produtos.CategoriaId
            INNER JOIN marcas ON marcas.id = Produtos.marcaId
	
	";

        public ProdutoDAO(ApplicationContext context) : base(context, "Produtos")
        {
        }

        public override void VerifyRelationshipDependence(int id)
        {
        }
    }
}

using ControleFluxoEmpresarial.Architectures.Helper;
using ControleFluxoEmpresarial.DAOs.simple;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Movimentos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.Movimentos
{
    public class ProdutoDAO : DAO<Produto>
    {
        public ProdutoDAO(DataBaseConnection context) : base(context, "Produtos")
        {
        }

        public override void VerifyRelationshipDependence(int id)
        {
        }

        public override (string query, object @params) GetQueryListPagined(PaginationQuery filter)
        {
            var sql = $@"SELECT Produtos.Id, Produtos.Nome, Produtos.UnidadeMedidaId, Produtos.CodigoBarras, Produtos.Referencia, Produtos.Descricao, 
                                Produtos.Observacao, Produtos.MarcaId, Produtos.CategoriaId, Produtos.QuantidadeMinima, Produtos.ValorCompra, Produtos.ValorVenda, 
                                Produtos.Quantidade, Produtos.DataCriacao, Produtos.DataAtualizacao,
		
		                        categorias.id AS ""categoria.id"", categorias.nome AS ""categoria.nome"", categorias.datacriacao AS ""categoria.datacriacao"", 
		                        categorias.dataatualizacao AS ""categorias.dataatualizacao"",

                                marcas.id AS ""marca.id"", marcas.nome AS ""marca.nome"", marcas.datacriacao AS ""marca.datacriacao"", marcas.dataatualizacao AS ""marca.dataatualizacao""

                        FROM Produtos
                            INNER JOIN categorias ON categorias.id = Produtos.CategoriaId
                            INNER JOIN marcas ON marcas.id = Produtos.marcaId";

            int? byId = default;
            if (!string.IsNullOrEmpty(filter.Filter))
            {
                var sqlId = "";
                byId = filter.Filter.ConvertValue<int>();

                if (byId != null)
                {
                    sqlId += $" OR {this.TableName}.id = @id ";
                }

                filter.Filter = $"%{filter.Filter.Replace(" ", "%")}%";
                sql += $" WHERE {this.TableName}.Nome ilike @Filter {sqlId} ";
            }

            return (sql, new { id = byId, filter.Filter });
        }
    }
}

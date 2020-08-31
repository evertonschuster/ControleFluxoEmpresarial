using ControleFluxoEmpresarial.Architectures.Helper;
using ControleFluxoEmpresarial.DAOs.simple;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Movimentos;

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
                                Produtos.Quantidade, Produtos.DataCriacao, Produtos.DataAtualizacao, Produtos.Situacao,
		
		                        categorias.id AS ""categoria.id"", categorias.nome AS ""categoria.nome"", categorias.datacriacao AS ""categoria.datacriacao"", 
		                        categorias.dataatualizacao AS ""categorias.dataatualizacao"", categorias.Situacao AS ""categoria.Situacao"",

                                marcas.id AS ""marca.id"", marcas.nome AS ""marca.nome"", marcas.datacriacao AS ""marca.datacriacao"", 
                                marcas.dataatualizacao AS ""marca.dataatualizacao"", marcas.Situacao AS ""marca.Situacao""

                        FROM Produtos
                            INNER JOIN categorias ON categorias.id = Produtos.CategoriaId
                            INNER JOIN marcas ON marcas.id = Produtos.marcaId
                        WHERE 1=1 ";

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
                sql += $" AND ({this.TableName}.Nome ilike @Filter {sqlId}) ";
            }

            if (filter.Situacao == DTO.Filters.SituacaoType.Habilitado)
            {
                sql += " AND Produtos.situacao is null";
            }
            if (filter.Situacao == DTO.Filters.SituacaoType.Desabilitado)
            {
                sql += " AND Produtos.situacao is not null";
            }

            return (sql, new { id = byId, filter.Filter });
        }
    }
}

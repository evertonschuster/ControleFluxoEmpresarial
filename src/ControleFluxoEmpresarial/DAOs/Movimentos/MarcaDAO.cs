﻿using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.DAOs.simple;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.Models.Movimentos;

namespace ControleFluxoEmpresarial.DAOs.Movimentos
{
    public class MarcaDAO : DAO<Marca>
    {
        public MarcaDAO(DataBaseConnection context) : base(context, "Marcas")
        {
        }

        public override void VerifyRelationshipDependence(int id)
        {
            var sql = @"SELECT 1 FROM Produtos
                            WHERE marcaId = @id 
                        UNION
                        SELECT 1 FROM Equipamentos
                            WHERE marcaId = @id ";

            if (this.ExecuteExist(sql, new { id }))
            {
                throw new BusinessRelationshipException(null, "Marca não pode ser excluida!");
            }
        }

        internal Marca GetByNome(string nome)
        {

            var sql = $@"SELECT *
                            FROM Marcas
                         WHERE nome = @nome";

            return base.ExecuteGetFirstOrDefault(sql, new { nome });
        }
    }
}

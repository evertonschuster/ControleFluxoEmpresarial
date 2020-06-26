using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.DAOs;
using ControleFluxoEmpresarial.DAOs.simple;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Cidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.Cidades
{
    public class PaisDAO : DAO<Pais>
    {
        public PaisDAO(ApplicationContext context) : base(context, "paises")
        {
        }

        public Pais GetByNome(string nome)
        {
            var sql = $@"SELECT Id, Nome, Sigla, DDI
                          FROM Paises
                        WHERE Nome = @nome ";

            return base.ExecuteGetFirstOrDefault(sql, new { nome });
        }

        public override void VerifyRelationshipDependence(int id)
        {
            var sql = @"SELECT 1 FROM estados
                        WHERE paisId = @id ";

            if (this.ExecuteExist(sql, new { id }))
            {
                throw new BusinessException(null, "Pais não pode ser excluido");
            }
        }
    }
}

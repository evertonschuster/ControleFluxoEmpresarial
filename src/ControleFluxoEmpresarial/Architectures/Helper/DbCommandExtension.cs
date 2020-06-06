using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Architectures.Helper
{
    public static class DbCommandExtension
    {



        public static void AddParameterValues<TId>(this DbCommand command, object @params)
        {
            if (@params == null || command == null)
            {
                return;
            }

            var properties = @params.GetType().GetProperties();

            foreach (var property in properties)
            {
                if (property.GetValue(@params) == null || property.GetValue(@params) is IBaseEntity<TId>)
                {
                    continue;
                }
                DbParameter dbParameter = command.CreateParameter();
                dbParameter.ParameterName = property.Name;
                dbParameter.Value = property.GetValue(@params);
                command.Parameters.Add(dbParameter);
            }
        }

        public static bool HasColumn(this IDataRecord r, string columnName)
        {
            try
            {
                return r.GetOrdinal(columnName) >= 0;
            }
            catch (IndexOutOfRangeException)
            {
                return false;
            }
        }

    }
}

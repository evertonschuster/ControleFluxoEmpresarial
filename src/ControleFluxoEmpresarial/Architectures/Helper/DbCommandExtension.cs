using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Architectures.Helper
{
    public static class DbCommandExtension
    {

        public static void AddParameterValues(this DbCommand command, object @params)
        {
            if (@params == null || command == null)
            {
                return;
            }

            var properties = @params.GetType().GetProperties();

            foreach (var property in properties)
            {
                if (property.GetValue(@params) == null)
                {
                    continue;
                }
                DbParameter dbParameter = command.CreateParameter();
                dbParameter.ParameterName = property.Name;
                dbParameter.Value = property.GetValue(@params);
                command.Parameters.Add(dbParameter);
            }
        }
    }
}

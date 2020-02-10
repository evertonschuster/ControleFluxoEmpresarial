using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DataBase
{
    public interface ISeedDataBase
    {
        void Execute(IServiceProvider serviceProvider);
    }
}

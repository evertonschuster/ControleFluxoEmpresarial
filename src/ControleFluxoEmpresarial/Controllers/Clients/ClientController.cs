﻿using ControleFluxoEmpresarial.DAOs.Clients;
using ControleFluxoEmpresarial.Filters.ModelView;
using ControleFluxoEmpresarial.Models.Clients;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Controllers.Clients
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase<Client, PaginationQuery>
    {
        public ClientController(ClientDAO dAO) : base(dAO)
        {
        }

    }
}

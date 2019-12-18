using ControleFluxoEmpresarial.Filters.ModelView;
using ControleFluxoEmpresarial.Models.Cidades;
using ControleFluxoEmpresarial.Models.Clients;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using Xunit;

namespace ControleFluxoEmpresarial.teste.Clients
{
    public class ClientsControllerTest : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        public CustomWebApplicationFactory<Startup> _factory;
        private readonly HttpClient _client;
        public int CidadeId { get; set; }

        public ClientsControllerTest(CustomWebApplicationFactory<Startup> factory)
        {
            _factory = factory;
            _client = factory.CreateClient();

            var paginationQuery = new PaginationQuery()
            {
                CurrentPage =1,
                PageSize = 1,
            };
            var json = JsonConvert.SerializeObject(paginationQuery);
            var data = new StringContent(json, Encoding.UTF8, "application/json");
            var httpResponse = _client.PostAsync("/api/Cidade/list", data).Result;
            var stringResponse = httpResponse.Content.ReadAsStringAsync().Result;
            var createResult = JsonConvert.DeserializeObject<PaginationResult<Cidade>>(stringResponse);

            this.CidadeId = createResult.Result[0].Id;
        }

        [Fact]
        public void Create_Invalid_Address_Client_ClientController()
        {
            var pais = new Client()
            {
                Nome = "Everton Schuster",
                CPF = "09088634971",
                Telephone = "988293328",
                CellPhone = "",
                Email = "Everton.schuster98@gmail.com",
                CidadeId = this.CidadeId
            };

            var json = JsonConvert.SerializeObject(pais);
            var data = new StringContent(json, Encoding.UTF8, "application/json");
            var httpResponse = _client.PostAsync("/api/Client", data).Result;
            var stringResponse = httpResponse.Content.ReadAsStringAsync().Result;

            Assert.True(httpResponse.StatusCode == System.Net.HttpStatusCode.OK, stringResponse);
        }
    }
}

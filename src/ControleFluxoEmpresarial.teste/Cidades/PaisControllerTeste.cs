using ControleFluxoEmpresarial.Models.Cidades;
using ControleFluxoEmpresarial.ModelView.Filters.Queries;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Text;
using Xunit;

namespace ControleFluxoEmpresarial.teste.Cidades
{
    public class PaisControllerTeste : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        public CustomWebApplicationFactory<Startup> _factory;
        private readonly HttpClient _client;

        public PaisControllerTeste(CustomWebApplicationFactory<Startup> factory)
        {
            _factory = factory;
            _client = factory.CreateClient();
        }

        [Fact]
        public void Create_Invalid_Pais_PaisController()
        {
            var pais = new Pais()
            {
                Nome = $"",
                DDI = "",
                Sigla = ""
            };

            var json = JsonConvert.SerializeObject(pais);
            var data = new StringContent(json, Encoding.UTF8, "application/json");
            var httpResponse = _client.PostAsync("/api/Pais", data).Result;

            Assert.True(httpResponse.StatusCode != System.Net.HttpStatusCode.OK);


            pais = new Pais()
            {
                Nome = $"Brasil_test_{DateTime.Now}",
                DDI = "",
                Sigla = ""
            };

            json = JsonConvert.SerializeObject(pais);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Pais", data).Result;

            Assert.True(httpResponse.StatusCode != System.Net.HttpStatusCode.OK);

            pais = new Pais()
            {
                Nome = $"",
                DDI = "455",
                Sigla = ""
            };

            json = JsonConvert.SerializeObject(pais);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Pais", data).Result;

            Assert.True(httpResponse.StatusCode != System.Net.HttpStatusCode.OK);


            pais = new Pais()
            {
                Nome = $"",
                DDI = "",
                Sigla = "BR"
            };

            json = JsonConvert.SerializeObject(pais);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Pais", data).Result;

            Assert.True(httpResponse.StatusCode != System.Net.HttpStatusCode.OK);

            pais = new Pais()
            {
                Nome = $"",
                DDI = "55",
                Sigla = "BR"
            };


            json = JsonConvert.SerializeObject(pais);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Pais", data).Result;

            Assert.True(httpResponse.StatusCode != System.Net.HttpStatusCode.OK);

            pais = new Pais()
            {
                Nome = $"Brasil_test_{DateTime.Now}",
                DDI = "",
                Sigla = "BR"
            };

            json = JsonConvert.SerializeObject(pais);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Pais", data).Result;

            Assert.True(httpResponse.StatusCode != System.Net.HttpStatusCode.OK);


            pais = new Pais()
            {
                Nome = $"Brasil_test_{DateTime.Now}",
                DDI = "555",
                Sigla = ""
            };

            json = JsonConvert.SerializeObject(pais);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Pais", data).Result;

            Assert.True(httpResponse.StatusCode != System.Net.HttpStatusCode.OK);

            pais = new Pais()
            {
                Nome = $"Brasil_test_{DateTime.Now}",
                DDI = "46464654654",
                Sigla = "BR"
            };

            json = JsonConvert.SerializeObject(pais);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Pais", data).Result;

            Assert.True(httpResponse.StatusCode != System.Net.HttpStatusCode.OK);


            pais = new Pais()
            {
                Nome = $"Brasil_test_Brasil_test_Brasil_test_Brasil_test_Brasil_test_Brasil_test_Brasil_test_Brasil_test_Brasil_test_Brasil_test_Brasil_test_Brasil_test_Brasil_test_Brasil_test_Brasil_test_Brasil_test_Brasil_test_Brasil_test_Brasil_test_Brasil_test_Brasil_test_Brasil_test_Brasil_test_Brasil_test_Brasil_test_Brasil_test_Brasil_test_",
                DDI = "55",
                Sigla = "BRASILLLLL"
            };

            json = JsonConvert.SerializeObject(pais);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Pais", data).Result;

            Assert.True(httpResponse.StatusCode != System.Net.HttpStatusCode.OK);



            pais = new Pais()
            {
                Nome = $"Brasil_test_{DateTime.Now}",
                DDI = "+55",
                Sigla = "BR"
            };

            json = JsonConvert.SerializeObject(pais);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Pais", data).Result;


            json = JsonConvert.SerializeObject(pais);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Pais", data).Result;

            Assert.True(httpResponse.StatusCode != System.Net.HttpStatusCode.OK, "Pais repetido");
        }

        [Fact]
        public void Create_Update_Delete_Pais_PaisController()
        {
            var pais = new Pais()
            {
                Nome = $"Brasil_test_{DateTime.Now}",
                DDI = "+55",
                Sigla = "BR"
            };

            var json = JsonConvert.SerializeObject(pais);
            var data = new StringContent(json, Encoding.UTF8, "application/json");
            var httpResponse = _client.PostAsync("/api/Pais", data).Result;

            Assert.True(httpResponse.StatusCode == System.Net.HttpStatusCode.OK);

            // Must be successful.
            var stringResponse = httpResponse.Content.ReadAsStringAsync().Result;
            var createResult = JsonConvert.DeserializeObject<CreateResult>(stringResponse);

            Assert.True(createResult.Id > 0);


            pais.Id = createResult.Id;
            pais.Nome = "Novo Nome";
            pais.Sigla = "Sigl";
            pais.DDI = "DDI";
            json = JsonConvert.SerializeObject(pais);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PutAsync("/api/Pais", data).Result;
            Assert.True(httpResponse.StatusCode == System.Net.HttpStatusCode.OK);


            httpResponse = _client.GetAsync($"/api/Pais/{createResult.Id}").Result;
            httpResponse.EnsureSuccessStatusCode();
            stringResponse = httpResponse.Content.ReadAsStringAsync().Result;
            var paisDb = JsonConvert.DeserializeObject<Pais>(stringResponse);

            Assert.True(pais.Nome == paisDb.Nome);

            httpResponse = _client.DeleteAsync($"/api/Pais/{createResult.Id}").Result;
            Assert.True(httpResponse.StatusCode == System.Net.HttpStatusCode.OK);

            httpResponse = _client.GetAsync($"/api/Pais/{createResult.Id}").Result;
            httpResponse.EnsureSuccessStatusCode();
            stringResponse = httpResponse.Content.ReadAsStringAsync().Result;
            var paisDbDeleted = JsonConvert.DeserializeObject<Pais>(stringResponse);

            Assert.Null(paisDbDeleted);
        }

    }
}

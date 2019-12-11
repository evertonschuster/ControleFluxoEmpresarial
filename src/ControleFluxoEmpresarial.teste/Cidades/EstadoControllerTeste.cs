using ControleFluxoEmpresarial.Models.Cidades;
using ControleFluxoEmpresarial.ModelView.Filters.Queries;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using Xunit;

namespace ControleFluxoEmpresarial.teste.Cidades
{
    public class EstadoControllerTeste : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        public CustomWebApplicationFactory<Startup> _factory;
        private readonly HttpClient _client;

        public EstadoControllerTeste(CustomWebApplicationFactory<Startup> factory)
        {
            _factory = factory;
            _client = factory.CreateClient();
        }

        [Fact]
        public void Create_Invalid_Estado_EstadoController()
        {
            var pais = new Pais()
            {
                Nome = $"Brasil_test_{DateTime.Now}",
                Sigla = "BR",
                DDI = "+55"
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


            var estado = new Estado()
            {
                Nome = $"",
                UF = "",
                PaisId = 0
            };

            json = JsonConvert.SerializeObject(estado);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Estado", data).Result;

            Assert.True(httpResponse.StatusCode != System.Net.HttpStatusCode.OK);


            estado = new Estado()
            {
                Nome = $"Parana_test_{DateTime.Now}",
                UF = "",
                PaisId = pais.Id,
            };

            json = JsonConvert.SerializeObject(estado);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Estado", data).Result;

            Assert.True(httpResponse.StatusCode != System.Net.HttpStatusCode.OK);

            estado = new Estado()
            {
                Nome = $"",
                UF = "PR",
                PaisId = pais.Id,

            };

            json = JsonConvert.SerializeObject(estado);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Estado", data).Result;

            Assert.True(httpResponse.StatusCode != System.Net.HttpStatusCode.OK);


            estado = new Estado()
            {
                Nome = $"",
                PaisId = pais.Id,
                UF = "",
            };

            json = JsonConvert.SerializeObject(estado);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Estado", data).Result;

            Assert.True(httpResponse.StatusCode != System.Net.HttpStatusCode.OK);

            estado = new Estado()
            {
                Nome = $"",
                PaisId = pais.Id,
                UF = "55",
            };


            json = JsonConvert.SerializeObject(estado);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Estado", data).Result;

            Assert.True(httpResponse.StatusCode != System.Net.HttpStatusCode.OK);

            estado = new Estado()
            {
                Nome = $"Parana_test_{DateTime.Now}",
                PaisId = pais.Id,
                UF = "",
            };

            json = JsonConvert.SerializeObject(estado);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Estado", data).Result;

            Assert.True(httpResponse.StatusCode != System.Net.HttpStatusCode.OK);


            estado = new Estado()
            {
                Nome = $"Parana_test_{DateTime.Now}",
                PaisId = 0,
                UF = "PR",
            };

            json = JsonConvert.SerializeObject(estado);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Estado", data).Result;

            Assert.True(httpResponse.StatusCode != System.Net.HttpStatusCode.OK);

            estado = new Estado()
            {
                Nome = $"Parana_test_{DateTime.Now}",
                PaisId = pais.Id,
                UF = "46464654654",
            };

            json = JsonConvert.SerializeObject(estado);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Estado", data).Result;

            Assert.True(httpResponse.StatusCode != System.Net.HttpStatusCode.OK);


            estado = new Estado()
            {
                Nome = $"Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_",
                PaisId = pais.Id,
                UF = "55",
            };

            json = JsonConvert.SerializeObject(estado);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Estado", data).Result;

            Assert.True(httpResponse.StatusCode != System.Net.HttpStatusCode.OK);



            estado = new Estado()
            {
                Nome = $"Parana_test_{DateTime.Now}",
                PaisId = pais.Id,
                UF = "PR",
            };

            json = JsonConvert.SerializeObject(estado);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Estado", data).Result;


            json = JsonConvert.SerializeObject(estado);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Estado", data).Result;

            Assert.True(httpResponse.StatusCode != System.Net.HttpStatusCode.OK, "Estado repetido");
        }

        [Fact]
        public void Create_Update_Delete_Estado_EstadoController()
        {
            var pais = new Pais()
            {
                Nome = $"Parana_test_{DateTime.Now}",
                Sigla = "BR",
                DDI = "PR"
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

            var estado = new Estado()
            {
                Nome = $"Parana_test_{DateTime.Now}",
                UF = "PR",
                PaisId = pais.Id
            };

            json = JsonConvert.SerializeObject(estado);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Estado", data).Result;

            Assert.True(httpResponse.StatusCode == System.Net.HttpStatusCode.OK);

            // Must be successful.
             stringResponse = httpResponse.Content.ReadAsStringAsync().Result;
             createResult = JsonConvert.DeserializeObject<CreateResult>(stringResponse);

            Assert.True(createResult.Id > 0);


            estado.Id = createResult.Id;
            estado.Nome = "Novo Nome";
            estado.UF = "UF";
            json = JsonConvert.SerializeObject(estado);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PutAsync("/api/Estado", data).Result;
            Assert.True(httpResponse.StatusCode == System.Net.HttpStatusCode.OK);


            httpResponse = _client.GetAsync($"/api/Estado/{createResult.Id}").Result;
            httpResponse.EnsureSuccessStatusCode();
            stringResponse = httpResponse.Content.ReadAsStringAsync().Result;
            var estadoDb = JsonConvert.DeserializeObject<Estado>(stringResponse);

            Assert.True(estado.Nome == estadoDb.Nome);

            httpResponse = _client.DeleteAsync($"/api/Estado/{createResult.Id}").Result;
            Assert.True(httpResponse.StatusCode == System.Net.HttpStatusCode.OK);

            httpResponse = _client.GetAsync($"/api/Estado/{createResult.Id}").Result;
            httpResponse.EnsureSuccessStatusCode();
            stringResponse = httpResponse.Content.ReadAsStringAsync().Result;
            var estadoDbDeleted = JsonConvert.DeserializeObject<Estado>(stringResponse);

            Assert.Null(estadoDbDeleted);
        }

    }
}

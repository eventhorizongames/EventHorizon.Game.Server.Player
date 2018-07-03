using EventHorizon.Game.Server.Player.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace EventHorizon.Game.Server.Player.Controllers
{
    [Route("/config")]
    public class ConfigController : Controller
    {
        IConfiguration _configuration;
        public ConfigController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public Config Get()
        {
            return new Config
            {
                AuthServer = _configuration["Auth:Authority"],
                AuthClientId = _configuration["Auth:ClientId"],
            };
        }
    }
}
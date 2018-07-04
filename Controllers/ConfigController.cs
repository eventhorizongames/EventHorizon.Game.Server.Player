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
                Auth = new AuthConfig
                {
                    Server = _configuration["Auth:Authority"],
                    ClientId = _configuration["Auth:ClientId"],
                    ApiName = _configuration["Auth:ApiName"],
                }
            };
        }
    }
}
using Microsoft.AspNetCore.Mvc;

namespace EventHorizon.Game.Server.Player.Controllers
{
    public class PlayersController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
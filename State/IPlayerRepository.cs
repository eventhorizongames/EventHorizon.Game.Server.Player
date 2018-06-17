using System.Threading.Tasks;
using EventHorizon.Game.Server.Player.Model;

namespace EventHorizon.Game.Server.Player.State
{
    public interface IPlayerRepository
    {
        Task<PlayerEntity> FindById(string id);
        Task Update(PlayerEntity player);
    }
}
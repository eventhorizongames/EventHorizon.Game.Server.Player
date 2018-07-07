using System.Collections;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EventHorizon.Game.Server.Player.Model;

namespace EventHorizon.Game.Server.Player.State.Impl
{
    public class PlayerRepository : IPlayerRepository
    {
        private static readonly ConcurrentDictionary<string, PlayerEntity> ENTITIES = new ConcurrentDictionary<string, PlayerEntity>();

        public Task<IList<PlayerEntity>> All()
        {
            return Task.FromResult((IList<PlayerEntity>)ENTITIES.Values.ToList());
        }

        public Task<PlayerEntity> FindById(string id)
        {
            var player = default(PlayerEntity);
            ENTITIES.TryGetValue(id, out player);
            return Task.FromResult(player);
        }

        public Task Update(PlayerEntity player)
        {
            ENTITIES.AddOrUpdate(player.Id, player, (key, currentPlayer) => player);
            return Task.CompletedTask;
        }
    }
}
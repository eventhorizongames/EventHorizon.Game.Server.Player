using System.Threading.Tasks;
using EventHorizon.Game.Server.Player.Get;
using EventHorizon.Game.Server.Player.Model;
using EventHorizon.Game.Server.Player.Update;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace EventHorizon.Game.Server.Player.Bus
{
    [Authorize]
    public class PlayerBus : Hub
    {
        readonly IMediator _mediator;
        public PlayerBus(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task<PlayerEntity> GetPlayer(string id)
        {
            return await _mediator.Send(new GetPlayerEvent
            {
                Id = id,
            });
        }

        public async Task UpdatePlayer(PlayerEntity player)
        {
            await _mediator.Publish(new UpdatePlayerEvent
            {
                Player = player,
            });
        }
    }
}
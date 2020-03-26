using EventHorizon.Game.Server.Player.Model;
using MediatR;

namespace EventHorizon.Game.Server.Player.Get
{
    public struct GetPlayerEvent : IRequest<PlayerEntity>
    {
        public string Id { get; set; }
    }
}
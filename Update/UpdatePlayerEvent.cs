using EventHorizon.Game.Server.Player.Model;
using MediatR;

namespace EventHorizon.Game.Server.Player.Update
{
    public struct UpdatePlayerEvent : INotification
    {
        public PlayerEntity Player { get; set; }
    }
}
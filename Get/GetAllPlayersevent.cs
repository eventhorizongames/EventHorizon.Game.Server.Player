using System.Collections.Generic;
using EventHorizon.Game.Server.Player.Model;
using MediatR;

namespace EventHorizon.Game.Server.Player.Get
{
    public struct GetAllPlayersEvent : IRequest<IList<PlayerEntity>>
    {
    }
}
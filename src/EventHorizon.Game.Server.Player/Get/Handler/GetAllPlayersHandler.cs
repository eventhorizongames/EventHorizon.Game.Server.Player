using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using EventHorizon.Game.Server.Player.Model;
using EventHorizon.Game.Server.Player.State;
using MediatR;

namespace EventHorizon.Game.Server.Player.Get.Handler
{
    public class GetAllPlayersHandler : IRequestHandler<GetAllPlayersEvent, IList<PlayerEntity>>
    {
        readonly IPlayerRepository _playerRepository;
        public GetAllPlayersHandler(IPlayerRepository playerRepository)
        {
            _playerRepository = playerRepository;
        }

        public async Task<IList<PlayerEntity>> Handle(GetAllPlayersEvent request, CancellationToken cancellationToken)
        {
            return await _playerRepository.All();
        }
    }
}
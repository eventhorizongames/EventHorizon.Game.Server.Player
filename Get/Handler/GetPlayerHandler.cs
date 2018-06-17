using System.Threading;
using System.Threading.Tasks;
using EventHorizon.Game.Server.Player.Model;
using EventHorizon.Game.Server.Player.State;
using MediatR;

namespace EventHorizon.Game.Server.Player.Get.Handler
{
    public class GetPlayerHandler : IRequestHandler<GetPlayerEvent, PlayerEntity>
    {
        readonly IPlayerRepository _playerRepository;
        public GetPlayerHandler(IPlayerRepository playerRepository)
        {
            _playerRepository = playerRepository;
        }

        public async Task<PlayerEntity> Handle(GetPlayerEvent request, CancellationToken cancellationToken)
        {
            return await _playerRepository.FindById(request.Id);
        }
    }
}
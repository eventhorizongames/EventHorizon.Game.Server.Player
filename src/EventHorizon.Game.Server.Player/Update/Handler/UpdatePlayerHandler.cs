using System.Threading;
using System.Threading.Tasks;
using EventHorizon.Game.Server.Player.State;
using MediatR;

namespace EventHorizon.Game.Server.Player.Update.Handler
{
    public class UpdatePlayerHandler : INotificationHandler<UpdatePlayerEvent>
    {
        readonly IPlayerRepository _playerRepository;
        public UpdatePlayerHandler(IPlayerRepository playerRepository)
        {
            _playerRepository = playerRepository;
        }

        public async Task Handle(UpdatePlayerEvent notification, CancellationToken cancellationToken)
        {
            await _playerRepository.Update(notification.Player);
        }
    }
}
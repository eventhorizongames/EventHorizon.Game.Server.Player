using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using EventHorizon.Game.Server.Player.Model;
using EventHorizon.Performance;
using MediatR;
using Newtonsoft.Json;

namespace EventHorizon.Game.Server.Player.State.Event.Handler
{
    public class LoadPlayerStateHandler : INotificationHandler<LoadPlayerStateEvent>
    {
        private static string FILENAME = "App_Data/PersistenceStore.json";

        readonly IPlayerRepository _playerRepository;
        readonly IPerformanceTracker _performanceTracker;

        public LoadPlayerStateHandler(IPlayerRepository playerRepository,
            IPerformanceTracker performanceTracker)
        {
            _performanceTracker = performanceTracker;
            _playerRepository = playerRepository;
        }
        public Task Handle(LoadPlayerStateEvent notification, CancellationToken cancellationToken)
        {
            using (_performanceTracker.Track(nameof(LoadPlayerStateHandler)))
            {
                var result = Parallel.ForEach<PlayerEntity>(ReadFile(), player => _playerRepository.Update(player));
                var competed = result.IsCompleted;
            }
            return Task.CompletedTask;
        }

        private IList<PlayerEntity> ReadFile()
        {

            if (!File.Exists(FILENAME))
            {
                return new List<PlayerEntity>();
            }
            return JsonConvert.DeserializeObject<IList<PlayerEntity>>(
                File.ReadAllText(FILENAME)
            );
        }
    }
}
using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using EventHorizon.Game.Server.Player.Performance;
using MediatR;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace EventHorizon.Game.Server.Player.State.Event.Handler
{
    public class PersistPlayerStateHandler : INotificationHandler<PersistPlayerStateEvent>
    {
        private static string FILE_DIRECTORY = "App_Data";
        private static string FILENAME = "App_Data/PersistenceStore.json";
        private static bool ran = false;

        private static FileStream fileStreamOut;
        private long nextPosition;
        private static long currentRecordLocation;

        readonly ILogger _logger;
        readonly IPerformanceTracker _performanceTracker;
        readonly IPlayerRepository _playerRepository;

        public PersistPlayerStateHandler(ILogger<PersistPlayerStateHandler> logger,
            IPerformanceTracker performanceTracker,
            IPlayerRepository playerRepository)
        {
            _logger = logger;
            _performanceTracker = performanceTracker;
            _playerRepository = playerRepository;
        }
        public async Task Handle(PersistPlayerStateEvent notification, CancellationToken cancellationToken)
        {
            using (_performanceTracker.Track(nameof(PersistPlayerStateHandler)))
            {
                var playerList = await _playerRepository.All();

                var toSavePlayerList = playerList; //.Where(a => a.ShouldSave(DateTime.Now.AddSeconds(-30)));
                if (toSavePlayerList.Count() > 0)
                {
                    var toSave = JsonConvert.SerializeObject(toSavePlayerList);
                    WriteToFile(toSave);
                }
            }
        }

        private void WriteToFile(string obj)
        {
            Directory.CreateDirectory(FILE_DIRECTORY);
            using (var file = File.Create(FILENAME))
            {
                file.Write(Encoding.UTF8.GetBytes(obj));
            }
        }
    }
}
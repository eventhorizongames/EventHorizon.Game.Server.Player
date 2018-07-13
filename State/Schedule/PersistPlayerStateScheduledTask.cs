using System.Threading;
using System.Threading.Tasks;
using EventHorizon.Game.Server.Player.State.Event;
using EventHorizon.Schedule;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace EventHorizon.Game.Server.Player.State.Schedule
{
    public class PersistPlayerStateScheduledTask : IScheduledTask
    {
        public string Schedule => "*/10 * * * * *"; // Every 30 seconds
        private readonly IServiceScopeFactory _serviceScopeFactory;

        public PersistPlayerStateScheduledTask(IServiceScopeFactory serviceScopeFactory)
        {
            _serviceScopeFactory = serviceScopeFactory;
        }

        public async Task ExecuteAsync(CancellationToken cancellationToken)
        {
            using (var serviceScope = _serviceScopeFactory.CreateScope())
            {
                await serviceScope.ServiceProvider.GetService<IMediator>().Publish(new PersistPlayerStateEvent());
            }
        }
    }
}
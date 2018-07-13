using EventHorizon.Game.Server.Player.State.Event;
using EventHorizon.Game.Server.Player.State.Impl;
using EventHorizon.Game.Server.Player.State.Schedule;
using EventHorizon.Schedule;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace EventHorizon.Game.Server.Player.State
{
    public static class CoreExtensions
    {
        public static void AddPlayerState(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton<IPlayerRepository, PlayerRepository>();
            services.AddSingleton<IScheduledTask, PersistPlayerStateScheduledTask>();
        }
        public static void UsePlayerState(this IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                serviceScope.ServiceProvider.GetService<IMediator>().Publish(new LoadPlayerStateEvent()).GetAwaiter().GetResult();
            }
        }
    }
}
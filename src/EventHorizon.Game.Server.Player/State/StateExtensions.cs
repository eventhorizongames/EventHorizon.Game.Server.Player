namespace EventHorizon.Game.Server.Player.State
{
    using EventHorizon.Game.Server.Player.State.Event;
    using EventHorizon.Game.Server.Player.State.Impl;
    using EventHorizon.Game.Server.Player.State.Start;
    using EventHorizon.Game.Server.Player.State.Timer;
    using EventHorizon.TimerService;
    using MediatR;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;

    public static class CoreExtensions
    {
        public static void AddPlayerState(
            this IServiceCollection services,
            IConfiguration configuration
        ) => services
            .AddSingleton<ServerState, StandardServerState>()
            .AddSingleton<IPlayerRepository, PlayerRepository>()
            .AddSingleton<ITimerTask, PersistPlayerStateTimerTask>()
        ;
        public static void UsePlayerState(this IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var mediator = serviceScope.ServiceProvider.GetService<IMediator>();
                mediator.Publish(
                    new LoadPlayerStateEvent()
                ).GetAwaiter().GetResult();
                mediator.Send(
                    new StartServerCommand()
                ).GetAwaiter().GetResult();
            }
        }
    }
}
namespace EventHorizon.Game.Server.Player.State.Timer
{
    using EventHorizon.Game.Server.Player.State.Event;
    using EventHorizon.Game.Server.Player.State.Start;
    using EventHorizon.TimerService;
    using MediatR;

    public class PersistPlayerStateTimerTask : ITimerTask
    {
        public int Period { get; } = 1000 * 30; // 30 seconds
        public string Tag { get; } = "PersistPlayerStateTimerTask";
        public IRequest<bool> OnValidationEvent { get; } = new IsServerStarted();
        public INotification OnRunEvent { get; } = new PersistPlayerStateEvent();
    }
}
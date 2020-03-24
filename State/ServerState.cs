namespace EventHorizon.Game.Server.Player.State
{
    public interface ServerState
    {
        bool IsServerStarted { get; }
        void SetIsServerStarted(
            bool isServerStarted
        );
    }
}
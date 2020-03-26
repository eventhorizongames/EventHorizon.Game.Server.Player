namespace EventHorizon.Game.Server.Player.State.Impl
{
    public class StandardServerState : ServerState
    {
        public bool IsServerStarted { get; private set; }

        public void SetIsServerStarted(
            bool isServerStarted
        )
        {
            IsServerStarted = isServerStarted;
        }
    }
}
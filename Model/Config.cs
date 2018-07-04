namespace EventHorizon.Game.Server.Player.Model
{
    public struct Config
    {
        public AuthConfig Auth { get; set; }
    }
    public struct AuthConfig
    {
        public string Server { get; internal set; }
        public string ClientId { get; internal set; }
        public string ApiName { get; internal set; }
    }
}
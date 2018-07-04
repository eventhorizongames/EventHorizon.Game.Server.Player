using System.Numerics;

namespace EventHorizon.Game.Server.Player.Model
{
    public struct PositionState
    {
        public string CurrentZone { get; set; }
        public Vector3 Position { get; set; }
    }
}
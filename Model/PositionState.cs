using System.Numerics;

namespace EventHorizon.Game.Server.Player.Model
{
    public struct PositionState
    {
        string CurrentZone { get; set; }
        Vector3 Position { get; set; }
    }
}
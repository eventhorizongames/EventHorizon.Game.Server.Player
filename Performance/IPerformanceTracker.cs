using EventHorizon.Game.Server.Player.Performance.Model;

namespace EventHorizon.Game.Server.Player.Performance
{
    public interface IPerformanceTracker
    {
        TrackerInstance Track(string trackerName);
    }
}
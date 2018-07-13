using EventHorizon.Game.Server.Player.Performance.Model;
using Microsoft.Extensions.Logging;

namespace EventHorizon.Game.Server.Player.Performance.Impl
{
    public class PerformanceTracker : IPerformanceTracker
    {
        readonly ILoggerFactory _loggerFactory;
        public PerformanceTracker(ILoggerFactory loggerfactory)
        {
            _loggerFactory = loggerfactory;
        }
        public TrackerInstance Track(string trackerName)
        {
            return new TrackerInstance(_loggerFactory.CreateLogger(trackerName));
        }
    }
}
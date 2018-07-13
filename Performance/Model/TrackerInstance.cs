using System;
using System.Diagnostics;
using Microsoft.Extensions.Logging;

namespace EventHorizon.Game.Server.Player.Performance.Model
{
    public class TrackerInstance : IDisposable
    {
        readonly ILogger _logger;
        readonly Stopwatch watch;
        public TrackerInstance(ILogger logger)
        {
            _logger = logger;
            _logger.LogInformation("Starting Performance Tracking");
            watch = Stopwatch.StartNew();
        }
        public void Dispose()
        {
            watch.Stop();
            _logger.LogInformation("Finished Performance Tracking, took: {0}ms", watch.ElapsedMilliseconds);
        }
    }
}
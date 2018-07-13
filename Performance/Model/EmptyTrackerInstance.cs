using System;
using System.Diagnostics;
using Microsoft.Extensions.Logging;

namespace EventHorizon.Game.Server.Player.Performance.Model
{
    public class EmptyTrackerInstance : ITrackerInstance
    {
        public void Dispose()
        {
        }
    }
}
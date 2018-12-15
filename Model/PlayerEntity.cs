using System;
using System.Numerics;

namespace EventHorizon.Game.Server.Player.Model
{
    public struct PlayerEntity
    {
        public static PlayerEntity NULL = default(PlayerEntity);

        public string Id { get; set; }
        public string Name { get; set; }
        public string Locale { get; set; }
        public PositionState Position { get; set; }
        public object Data { get; set; }

        public PlayerEntity(string id, PositionState positionState)
        {
            this.Id = id;
            this.Position = positionState;
            this.Name = "";
            this.Locale = "";

            this.Data = new { };
        }
    }
}
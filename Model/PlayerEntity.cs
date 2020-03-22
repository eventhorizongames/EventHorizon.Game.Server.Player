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
        public TransformState Transform { get; set; }
        public LocationState Location { get; set; }
        public object Data { get; set; }

        public PlayerEntity(
            string id,
            TransformState transform,
            LocationState location
        )
        {
            this.Id = id;
            this.Transform = transform;
            this.Location = location;
            this.Name = "";
            this.Locale = "";

            this.Data = new { };
        }
    }
}
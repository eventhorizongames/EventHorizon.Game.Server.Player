using System;
using System.IO;

namespace EventHorizon.Game.Server.Player.State.Event
{
    public static class FileStreamExtensions
    {
        public static long ReadLong(this FileStream fileStream)
        {
            byte[] b = new byte[8];
            fileStream.Read(b, 0, 8);
            return BitConverter.ToInt64(b, 0);
        }
        public static void WriteInt(this FileStream fileStream, int toWrite)
        {
            fileStream.Write(BitConverter.GetBytes(toWrite));
        }
        public static void WriteLong(this FileStream fileStream, long toWrite)
        {
            var byptes = BitConverter.GetBytes(toWrite);
            fileStream.Write(BitConverter.GetBytes(toWrite));
        }
    }
}
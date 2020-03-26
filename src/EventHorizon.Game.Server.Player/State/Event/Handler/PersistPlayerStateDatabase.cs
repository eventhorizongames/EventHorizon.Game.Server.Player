using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Newtonsoft.Json;

namespace EventHorizon.Game.Server.Player.State.Event.Handler
{
    public class PersistPlayerStateBase
    {
        private static string FILE_DIRECTORY = "App_Data";
        private static string FILENAME = "App_Data/PersistenceStore.db";

        public void WriteToFile(string obj)
        {
            Directory.CreateDirectory(FILE_DIRECTORY);

            //create a file stream object
            using (var fileStreamOut = new FileStream(FILENAME, FileMode.OpenOrCreate, FileAccess.ReadWrite))
            {
                var nextPosition = fileStreamOut.Length;
                if (nextPosition < 8)
                {
                    nextPosition = 8;
                    fileStreamOut.WriteLong(8);
                }
                else
                {
                    nextPosition = fileStreamOut.ReadLong();
                    fileStreamOut.Seek(nextPosition, SeekOrigin.Begin);
                }

                //set file position where to write data
                fileStreamOut.Position = nextPosition * Encoding.UTF8.GetByteCount(obj);

                // Write length
                fileStreamOut.WriteInt(Encoding.UTF8.GetByteCount(obj));
                // Write data
                fileStreamOut.Write(
                    Encoding.UTF8.GetBytes(obj)
                );
                fileStreamOut.Seek(0, SeekOrigin.Begin);
                // nextPosition += Encoding.UTF8.GetByteCount(obj);
                fileStreamOut.WriteLong(nextPosition);
            }
        }
    }
}
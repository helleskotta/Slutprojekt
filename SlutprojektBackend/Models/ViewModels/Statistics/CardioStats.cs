using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SlutprojektBackend.Models
{
    public class CardioStats : Stats
    {
        public DateTime Time { get; set; }
        public float Distance { get; set; }
        public int Pulse { get; set; }
    }
}

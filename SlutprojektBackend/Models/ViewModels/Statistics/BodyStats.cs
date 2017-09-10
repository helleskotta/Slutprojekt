using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SlutprojektBackend.Models
{
    public class BodyStats : Stats
    {
        public float BodyWeight { get; set; }
        public float Waist { get; set; }
        public float Chest { get; set; }
        public float Hips { get; set; }
    }
}

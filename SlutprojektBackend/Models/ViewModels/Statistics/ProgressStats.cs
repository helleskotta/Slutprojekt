using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SlutprojektBackend.Models
{
    public class ProgressStats : Stats
    {
        public float LostWeight { get; set; }
        public int ActiveDays { get; set; }
        //public float PersonalBest { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SlutprojektBackend.Models
{
    public class StrengthStats : Stats
    {
        public float TotalWeightLifted { get; set; }
        public string NameOfWorkoutSession { get; set; }
        public string TypeOfWorkoutSession { get; set; }

    }
}

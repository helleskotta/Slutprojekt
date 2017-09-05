using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SlutprojektBackend.Models.ViewModels
{
    public class StatisicsVM
    {
        public string TypeOfWorkoutSession { get; set; }
        public string TypeOfExercise { get; set; }
        public float BodyWeight { get; set; }
        public float GainedWeight { get; set; }
        public int Period { get; set; }
        //public List<BodyStats> BodyStats;
        //public List<ProgressStats> ProgressStats;
        public int ActiveStreak { get; set; }

    }
}

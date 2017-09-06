using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SlutprojektBackend.Models.ViewModels
{
    public class CalendarVM
    {
        public string NameOfWorkoutSession { get; set; }
        public string TypeOfWorkoutSession { get; set; }
        public DateTime Date { get; set; }
        //public bool TrainingDay { get; set; }

    }
}

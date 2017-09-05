using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SlutprojektBackend.Models.ViewModels
{
    public class MainVM
    {
        public List<StatisticsMainVM> Statistics;
        public List<CalendarVM> Calendar;
        public List<GoalVM> Goals;
        public DateTime Dates { get; set; }
        public string Favorites { get; set; }
        public List<WorkoutSessionMainVM> WorkoutSessionMain;
    }
}

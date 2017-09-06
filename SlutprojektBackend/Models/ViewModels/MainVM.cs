using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SlutprojektBackend.Models.ViewModels
{
    public class MainVM
    {
        // Random statistik - lista? Välj ut i DataManager?
        public List<StatisticsMainVM> Statistics; 

        // 3 dagar i boxar
        public List<CalendarMainVM> Calendar;

        // Random statistik
        public List<GoalVM> Goals;

        // Grön knapp
        public List<string> Favorites { get; set; }
        
        // public List<WorkoutSessionMainVM> WorkoutSessionMain;
    }
}

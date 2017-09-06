using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SlutprojektBackend.Models.ViewModels
{
    public class GoalVM
    {
        public string UserId { get; set; }
        public string Type { get; set; }
        public int GoalWeight { get; set; }
        public int CurrentWeight { get; set; }
        public DateTime GoalEnd { get; set; }
    }
}

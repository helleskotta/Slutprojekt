using System;
using System.Collections.Generic;

namespace SlutprojektBackend.Models.Entities
{
    public partial class WorkoutSession
    {
        public WorkoutSession()
        {
            Exercise = new HashSet<Exercise>();
        }

        public int Id { get; set; }
        public string UserId { get; set; }
        public DateTime Date { get; set; }
        public string Type { get; set; }
        public int? Duration { get; set; }
        public double? Distance { get; set; }
        public string SessionUserNote { get; set; }
        public string SessionName { get; set; }

        public ICollection<Exercise> Exercise { get; set; }
    }
}

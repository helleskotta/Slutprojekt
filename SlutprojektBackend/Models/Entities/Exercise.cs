using System;
using System.Collections.Generic;

namespace SlutprojektBackend.Models.Entities
{
    public partial class Exercise
    {
        public Exercise()
        {
            Set = new HashSet<Set>();
        }

        public int Id { get; set; }
        public int WorkoutSessionId { get; set; }
        public string ExerciseName { get; set; }

        public WorkoutSession WorkoutSession { get; set; }
        public ICollection<Set> Set { get; set; }
    }
}

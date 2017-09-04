using System;
using System.Collections.Generic;

namespace SlutprojektBackend.Models.Entities
{
    public partial class Set
    {
        public int Id { get; set; }
        public int ExerciseId { get; set; }
        public double UsedWeight { get; set; }
        public int Reps { get; set; }
        public string UserNote { get; set; }

        public Exercise Exercise { get; set; }
    }
}

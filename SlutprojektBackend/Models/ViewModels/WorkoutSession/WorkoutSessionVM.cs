﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SlutprojektBackend.Models.ViewModels
{
    public class WorkoutSessionVM
    {
        public List<ExerciseVM> Exercises { get; set; }
        
        public DateTime Date { get; set; }
        public string Type { get; set; }
        public int? Duration { get; set; }
        public double? Distance { get; set; }
        public string SessionUserNote { get; set; }
        public string SessionName { get; set; }
    }
}

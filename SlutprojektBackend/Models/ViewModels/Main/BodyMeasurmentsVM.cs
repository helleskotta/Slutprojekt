using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SlutprojektBackend.Models.ViewModels.Main
{
    public class BodyMeasurmentsVM
    {
        public double BodyWeight { get; set; }
        public double Waist { get; set; }
        public double Chest { get; set; }
        public double Hips { get; set; }
        public DateTime Date { get; set; }
        public string Notes { get; set; }
        public double Height { get; set; }
        public string Sex { get; set; }
    }
}

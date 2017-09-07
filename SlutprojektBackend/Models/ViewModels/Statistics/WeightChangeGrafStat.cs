using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SlutprojektBackend.Models.ViewModels.Statistics
{
    public class WeightChangeGrafStat : Stats
    {
        public double[] WeightData { get; set; }
        public DateTime[] DateData { get; set; }
    }
}

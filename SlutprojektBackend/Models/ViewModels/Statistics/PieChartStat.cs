﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SlutprojektBackend.Models.ViewModels.Statistics
{
    public class PieChartStat:Stats
    {
        public string[] Names { get; set; }
        public int[] Data { get; set; }
    }
}

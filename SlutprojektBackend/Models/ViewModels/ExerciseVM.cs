using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SlutprojektBackend.Models.ViewModels
{
    public class ExerciseVM
    {
        public List<SetVM> Sets { get; set; }
        public string Name { get; set; }
    }
}

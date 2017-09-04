using System;
using System.Collections.Generic;

namespace SlutprojektBackend.Models.Entities
{
    public partial class Goal
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Type { get; set; }

        public AspNetUsers User { get; set; }
    }
}

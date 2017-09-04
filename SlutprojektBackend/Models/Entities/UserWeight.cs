using System;
using System.Collections.Generic;

namespace SlutprojektBackend.Models.Entities
{
    public partial class UserWeight
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public double UserWeight1 { get; set; }
        public DateTime Date { get; set; }

        public AspNetUsers User { get; set; }
    }
}

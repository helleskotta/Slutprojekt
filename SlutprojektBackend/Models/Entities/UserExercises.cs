using System;
using System.Collections.Generic;

namespace SlutprojektBackend.Models.Entities
{
    public partial class UserExercises
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
    }
}

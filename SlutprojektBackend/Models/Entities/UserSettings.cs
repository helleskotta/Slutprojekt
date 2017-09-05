using System;
using System.Collections.Generic;

namespace SlutprojektBackend.Models.Entities
{
    public partial class UserSettings
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Gender { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace SlutprojektBackend.Models.Entities
{
    public partial class UserFavorites
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Favorite { get; set; }
    }
}

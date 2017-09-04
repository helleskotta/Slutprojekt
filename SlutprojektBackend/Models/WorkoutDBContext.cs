using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SlutprojektBackend.Models.Entities
{
    public partial class WorkoutDBContext
    {
        public WorkoutDBContext(DbContextOptions<WorkoutDBContext> o) : base (o)
        {
            
        }
        //Lägg till metoder
    }

    public partial class AppIdentityDBContext : IdentityDbContext
    {
        public AppIdentityDBContext(DbContextOptions<AppIdentityDBContext> o) : base(o)
        {

        }
        //Lägg till metoder
    }
}

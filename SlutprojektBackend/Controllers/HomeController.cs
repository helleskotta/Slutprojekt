using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace SlutprojektBackend
{
    public class HomeController : Controller
    {
        IdentityDbContext identityDbContext;
        public HomeController( IdentityDbContext identityDbContext)
        {
            this.identityDbContext = identityDbContext;
        }
        public async Task<string> Index()
        {

            //await identityDbContext.Database.EnsureCreatedAsync();
            return"ok";
        }
    }
}

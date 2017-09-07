using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using SlutprojektBackend.Models.Entities;
using SlutprojektBackend.Models;

namespace SlutprojektBackend
{
    public class HomeController : Controller
    {
        DataManager dataManager;
        public HomeController( DataManager dataManager)
        {
            this.dataManager = dataManager;
        }
        public string Index()
        {
            //dataManager.TestMethodAddWorkoutSession();
            //dataManager.TestMethodGet();
            //await identityDbContext.Database.EnsureCreatedAsync();
            //dataManager.TestAddWeight();
            dataManager.GetMainViewModel("PetterTest");
            //dataManager.TestAddFavorite();
            return "ok";
        }
    }
}

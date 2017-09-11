using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using SlutprojektBackend.Models;
using Microsoft.AspNetCore.Identity;
using SlutprojektBackend.Models.ViewModels;
using SlutprojektBackend.Models.Entities;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SlutprojektBackend.Controllers
{
    //[Authorize]
    public class MemberController : Controller
    {
        DataManager dataManager;
        UserManager<IdentityUser> userManager;

        public MemberController(DataManager dataManager, UserManager<IdentityUser> userManager)
        {
            this.dataManager = dataManager;
            this.userManager = userManager;           
        }

        [HttpGet]
        public IActionResult Main()
        {
            //var test = userManager.GetUserId(HttpContext.User);

            var id = "PetterTest";
            var viewModel = dataManager.GetMainViewModel(id);
            return Json(viewModel);
        }

        [HttpGet]
        public IActionResult Calendar()
        {
            var test = userManager.GetUserId(HttpContext.User);
            var viewModel = dataManager.GetMainViewModel(test);
            return Json(viewModel);
        }

        [HttpGet]
        public IActionResult Index()
        {
            var userID = userManager.GetUserId(User); //Får in null, därför ajax går dåligt

            return Json(dataManager.GetAllWorkoutsForUser(userID));
            
        }

        public IActionResult Statistics()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Saveworkout(WorkoutSessionVM newWorkout)
        {
            var userID = userManager.GetUserId(HttpContext.User);
            newWorkout.Date = DateTime.Now;
            dataManager.AddWorkOutForUser(userID, newWorkout);
            //Do stuff

            return Content("Workout saved successfully");
        }
        [HttpPost] // TODO: FIXA!
        public IActionResult SaveMeasurements(UserWeight userweight)
        {
            var userID = userManager.GetUserId(HttpContext.User);
            userweight.Date = DateTime.Now;
            dataManager.AddWeight(userID, userweight);

            return Content("Workout saved successfully");
        }

        public IActionResult AddWorkout()
        {
            return View();
        }

        public IActionResult UserExercises()
        {
            return Json(dataManager.GetExercises());

        }
    }
}

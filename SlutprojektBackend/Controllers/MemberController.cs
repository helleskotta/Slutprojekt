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
using SlutprojektBackend.Models.ViewModels.Main;
using Microsoft.AspNetCore.Http;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SlutprojektBackend.Controllers
{
    [Authorize]
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
            var id = userManager.GetUserId(HttpContext.User);

            //var id = "PetterTest";
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
            //var userID = userManager.GetUserId(User); //Får in null, därför ajax går dåligt
            
            var userID = GetUserID();
            return Json(dataManager.GetAllWorkoutsForUser(userID));
            
        }

        private string GetUserID()
        {
            if (HttpContext.Session.GetString("UserID")!=null)
            {
                return HttpContext.Session.GetString("UserID");
            }
            else
            {
                return userManager.GetUserId(HttpContext.User);
            }
        }

        public IActionResult Statistics()
        {

            var statsToReturn =dataManager.GetStatisticsForUser(GetUserID());
            return Json(statsToReturn);
        }

        [HttpPost]
        public IActionResult Saveworkout(WorkoutSessionVM newWorkout)
        {
            var userID = userManager.GetUserId(HttpContext.User);
            newWorkout.Date = DateTime.Parse(newWorkout.Date.ToShortDateString());
            dataManager.AddWorkOutForUser(userID, newWorkout);
            //Do stuff

            return Content("Workout saved successfully");
        }

        [HttpPost] // TODO: FIXA!
        public IActionResult SaveMeasurements(BodyMeasurmentsVM bodyMeasurments)
        {
            var userID = userManager.GetUserId(HttpContext.User);
            bodyMeasurments.Date = DateTime.Parse(bodyMeasurments.Date.ToShortDateString());
            //userWeight.Date = DateTime.Now;
            dataManager.AddWeight(userID, bodyMeasurments);

            return Content("Weight saved successfully");
        }

        public IActionResult AddWorkout()
        {
            return View();
        }

        public IActionResult UserExercises()
        {
            return Json(dataManager.GetExercises());

        }

        [HttpPost]
        public IActionResult EditWorkout(WorkoutSessionVM WorkoutToEdit)
        {
            var userID = userManager.GetUserId(HttpContext.User);
            WorkoutToEdit.Date = DateTime.Parse(WorkoutToEdit.Date.ToShortDateString());
            dataManager.EditWorkOutForUser(userID, WorkoutToEdit);
            //Do stuff

            return Content("Workout saved successfully");
        }

        [HttpPost]
        public IActionResult DeleteWorkout(WorkoutSessionVM WorkoutToDelete)
        {

            dataManager.DeleteWorkoutSession(GetUserID(), WorkoutToDelete);
            return Json("All is good");
        }
    }
}

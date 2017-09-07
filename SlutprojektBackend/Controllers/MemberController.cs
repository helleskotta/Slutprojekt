using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using SlutprojektBackend.Models;
using Microsoft.AspNetCore.Identity;

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

        public IActionResult Index()
        {
            return View();
        }
    }
}

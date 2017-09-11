using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using SlutprojektBackend.Models.ViewModels;
using Microsoft.AspNetCore.Http;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SlutprojektBackend.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        UserManager<IdentityUser> userManager;
        SignInManager<IdentityUser> signInManager;

        public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Register(RegisterVM viewModel)
        {
            if (!ModelState.IsValid)
                return Content("no");//new IdentityResult {Succeeded=false};

            var result = await userManager.CreateAsync(new IdentityUser(viewModel.UserName), (viewModel.Password));

            if (!result.Succeeded)
            {
                ModelState.AddModelError("Password", result.Errors.First().Description);
                //return result;
                return Content("no");
            }
            var r = await signInManager.PasswordSignInAsync(viewModel.UserName, viewModel.Password, true, false);

            if (!r.Succeeded)
            {
                return Content("no");
            }
            else
            {
                HttpContext.Session.SetString("UserID", userManager.GetUserId(HttpContext.User));
            }

            return Content("Yes");
            //return result;

        }


        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginVM model)
        {
            if (!ModelState.IsValid)
            {
                return Content("NO");
            }
            
            var result = await signInManager.PasswordSignInAsync(model.UserName, model.PassWord, true, false);
            if (!result.Succeeded)
            {
                return Content("no");
            }
            else
            {
                HttpContext.Session.SetString("UserID", userManager.GetUserId(HttpContext.User));
            }


            return Content("Logged in!");
        }


        public string LoggedIn()
        {
            return "logged in as" + User.Identity.Name ;
        }
    }

}

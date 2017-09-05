using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using SlutprojektBackend.Models.ViewModels;

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
        public async Task<string> Register(RegisterVM viewModel)
        {
            if (!ModelState.IsValid)
                return "NO";//new IdentityResult {Succeeded=false};

            var result = await userManager.CreateAsync(new IdentityUser(viewModel.UserName), (viewModel.Password));

            if (!result.Succeeded)
            {
                ModelState.AddModelError("Password", result.Errors.First().Description);
                //return result;
                return "NO";
            }
            return "yes!";
            //return result;

        }


        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginVM model)
        {

            #region Validera vy-modellen
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            #endregion

            #region Skapa användaren 
            
            // Spara den nya användaren i databasen
            var result = await userManager.CreateAsync(new IdentityUser(model.UserName), model.PassWord);
            if (!result.Succeeded)
            {
                // Lägg till ett fel som visas i formuläret
                ModelState.AddModelError("UserName", result.Errors.First().Description);
                return View(model);
            }
            #endregion

            #region Logga in och skicka användaren vidare
            // Logga in användaren (med en icke-persistent cookie)
            await signInManager.PasswordSignInAsync(model.UserName, model.PassWord, false, false);

            // Skicka användaren till en annan inloggnings-skyddad action
            return RedirectToAction(nameof(Index), "Members");
            #endregion
        }

    }

}

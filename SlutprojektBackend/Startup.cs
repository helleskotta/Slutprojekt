using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace SlutprojektBackend
{
    public class Startup
    {
        IConfiguration conf;

        public Startup(IConfiguration conf)
        {
            this.conf = conf;
        }
        public void ConfigureServices(IServiceCollection services)
        {
            var connString = conf["connStringLocal"];
            services.AddDbContext<IdentityDbContext>(o => o.UseSqlServer(connString));


            services.AddIdentity<IdentityUser, IdentityRole>(o =>
            {
                o.Password.RequireNonAlphanumeric = false;
                o.Password.RequiredLength = 6;
            }).AddEntityFrameworkStores<IdentityDbContext>()
              .AddDefaultTokenProviders();
            //services.ConfigureApplicationCookie(o => o.LoginPath = "/Account/LogIn");
            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseAuthentication();
            app.UseDeveloperExceptionPage();
            app.UseMvcWithDefaultRoute();
            app.UseStaticFiles();
        }
    }
}

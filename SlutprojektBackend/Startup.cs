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
using SlutprojektBackend.Models.Entities;
using SlutprojektBackend.Models;

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
            var connString = conf["connString"];
            services.AddTransient<DataManager>();
            services.AddDbContext<AppIdentityDBContext>(o => o.UseSqlServer(connString));
            services.AddDbContext<WorkoutDBContext>(o => o.UseSqlServer(connString));

            services.AddIdentity<IdentityUser, IdentityRole>(o =>
            {
                o.Password.RequireNonAlphanumeric = false;
                o.Password.RequiredLength = 6;
            }).AddEntityFrameworkStores<AppIdentityDBContext>()
              .AddDefaultTokenProviders();

            services.AddCors();
            //services.ConfigureApplicationCookie(o => o.LoginPath = "/Account/LogIn");
            services.AddMvc();
            services.AddSession();
            services.AddMemoryCache();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseSession();
            app.UseCors(b => b.WithOrigins("*"));
            app.UseAuthentication();
            app.UseDeveloperExceptionPage();
            app.UseMvcWithDefaultRoute();
            app.UseStaticFiles();
        }
    }
}

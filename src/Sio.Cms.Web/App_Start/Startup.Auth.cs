// Licensed to the siocore Foundation under one or more agreements.
// The siocore Foundation licenses this file to you under the GNU General Public License v3.0 license.
// See the LICENSE file in the project root for more information.

using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Sio.Cms.Lib;
using Sio.Cms.Lib.MiddleWares;
using Sio.Cms.Lib.Models.Account;
using Sio.Cms.Lib.Services;
using Sio.Cms.Web.Mvc.App_Start.Validattors;
using Sio.Identity.Models;
using System;
using System.Text;
using System.Threading.Tasks;

namespace Sio.Cms.Web
{
    //Ref: https://www.blinkingcaret.com/2017/09/06/secure-web-api-in-asp-net-core/
    public partial class Startup
    {
        protected void ConfigAuthorization(IServiceCollection services, IConfiguration Configuration)
        {
            ConfigIdentity(services, Configuration);
            ConfigCookieAuth(services, Configuration);
            ConfigJWTToken(services, Configuration);

        }

        private void ConfigIdentity(IServiceCollection services, IConfiguration Configuration)
        {
            PasswordOptions pOpt = new PasswordOptions()
            {
                RequireDigit = false,
                RequiredLength = 6,
                RequireLowercase = false,
                RequireNonAlphanumeric = false,
                RequireUppercase = false
            };

            services.AddIdentity<ApplicationUser, IdentityRole>(options =>
            {
                options.Password = pOpt;
            })
                .AddEntityFrameworkStores<SioDbContext>()
                .AddDefaultTokenProviders()
                .AddUserManager<UserManager<ApplicationUser>>()

                ;
            services.AddAuthorization(options =>
            {
                options.AddPolicy("AddEditUser", policy =>
                {
                    policy.RequireClaim("Add User");
                    policy.RequireClaim("Edit User");
                });
                options.AddPolicy("DeleteUser", policy => policy.RequireClaim("Delete User"));
            })
             ;
        }

        protected void ConfigJWTToken(IServiceCollection services, IConfiguration Configuration)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        options.RequireHttpsMetadata = false;
                        options.SaveToken = true;
                        options.TokenValidationParameters =
                             new TokenValidationParameters
                             {
                                 ClockSkew = TimeSpan.Zero,//.FromMinutes(SioService.GetAuthConfig<int>("ClockSkew")), //x minute tolerance for the expiration date
                                 ValidateIssuer = SioService.GetAuthConfig<bool>("ValidateIssuer"),
                                 ValidateAudience = SioService.GetAuthConfig<bool>("ValidateAudience"),
                                 ValidateLifetime = SioService.GetAuthConfig<bool>("ValidateLifetime"),
                                 ValidateIssuerSigningKey = SioService.GetAuthConfig<bool>("ValidateIssuerSigningKey"),
                                 //ValidIssuer = SioService.GetAuthConfig<string>("Issuer"),
                                 //ValidAudience = SioService.GetAuthConfig<string>("Audience"),
                                 ValidIssuers = SioService.GetAuthConfig<string>("Issuers").Split(','),
                                 ValidAudiences = SioService.GetAuthConfig<string>("Audiences").Split(','),
                                 IssuerSigningKey = JwtSecurityKey.Create(SioService.GetAuthConfig<string>("SecretKey"))
                             };
                        options.Events = new JwtBearerEvents
                        {
                            OnAuthenticationFailed = context =>
                            {
                                Console.WriteLine("OnAuthenticationFailed: " + context.Exception.Message);
                                return Task.CompletedTask;
                            },
                            OnTokenValidated = context =>
                            {
                                Console.WriteLine("OnTokenValidated: " + context.SecurityToken);
                                return Task.CompletedTask;
                            },
                            
                        };
                    });
            services.AddAuthentication("Bearer");
            //services.Configure<IpSecuritySettings>(Configuration.GetSection("IpSecuritySettings"));
        }

        protected void ConfigCookieAuth(IServiceCollection services, IConfiguration Configuration)
        {           
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(
                options =>
                {
                    // Cookie settings
                    options.Cookie.HttpOnly = true;
                    options.Cookie.MaxAge = TimeSpan.FromMinutes(SioService.GetAuthConfig<int>("CookieExpiration"));
                    options.Cookie.Expiration = TimeSpan.FromMinutes(SioService.GetAuthConfig<int>("CookieExpiration"));
                    options.LoginPath = "/" + SioService.GetConfig<string>(SioConstants.ConfigurationKeyword.DefaultCulture) + "/Portal/Auth/Login"; // If the LoginPath is not set here, ASP.NET Core will default to /Account/Login
                    options.LogoutPath = "/" + SioService.GetConfig<string>(SioConstants.ConfigurationKeyword.DefaultCulture) + "/Portal/Auth/Logout"; // If the LogoutPath is not set here, ASP.NET Core will default to /Account/Logout
                    options.AccessDeniedPath = "/"; // If the SioConstants.Default.DefaultCulture is not set here, ASP.NET Core will default to /Account/AccessDenied
                    options.SlidingExpiration = true;

                    options.Events = new CookieAuthenticationEvents()
                    {
                        OnValidatePrincipal = CookieValidator.ValidateAsync
                    };
                }
                );
        }

        protected static class JwtSecurityKey
        {
            public static SymmetricSecurityKey Create(string secret)
            {
                return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret));
            }
        }
    }
}

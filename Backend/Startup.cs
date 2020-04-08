using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;

using Imageboard.Backend.Models;
using Imageboard.Backend.Services;

namespace Imageboard.Backend {
    public class Startup {
        public Startup(IConfiguration configuration) {
            this.Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services) {
            services.AddControllers()
                .AddNewtonsoftJson(x => x.UseMemberCasing());
            services.AddCors();

            services.Configure<Settings>(options => {
                options.ConnectionString = Configuration.GetSection("MongoConnection:ConnectionString").Value;
                options.Database = Configuration.GetSection("MongoConnection:Database").Value;
                options.Boards = Configuration.GetSection("MongoConnection:Boards").Value;
                options.Threads = Configuration.GetSection("MongoConnection:Threads").Value;
                options.Counters = Configuration.GetSection("MongoConnection:Counters").Value;
            });

            services.AddScoped<BoardsService>();
            services.AddScoped<ThreadsService>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseRouting();

            app.UseCors(options => {
                options.WithOrigins("http://localhost:8080")
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });

            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();
            });
        }
    }
}

using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TA.Services.Startup))]
namespace TA.Services
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            app.MapSignalR();
        }
    }
}

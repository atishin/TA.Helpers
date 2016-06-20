using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace TA.Services.Hubs
{
    public class TestHub : Hub
    {

        public void Test(int a, int b)
        {
            Clients.Caller.OnTest(a + b);
        }

    }
}
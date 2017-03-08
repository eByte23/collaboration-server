using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using CollaborationServer.Shared.Hubs;
using Microsoft.AspNetCore.SignalR.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace WebApplication.Controllers
{
    public class HomeController : Controller
    {
        private readonly IConnectionManager _connectionManager;

        public HomeController(IConnectionManager connectionManager)
        {
            _connectionManager = connectionManager;
        }

        public IActionResult Index()
        {
            var a =_connectionManager.GetHubContext<Ping>().Clients.All.pong();
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return Json("");
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }

    public class Test : Hub
    {
        public Microsoft.AspNetCore.SignalR.Hubs.HubCallerContext Context { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public IHubCallerConnectionContext<dynamic> Clients { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public IGroupManager Groups { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public Task OnConnected()
        {
            throw new NotImplementedException();
        }

        public Task OnDisconnected(bool stopCalled)
        {
            throw new NotImplementedException();
        }

        public Task OnReconnected()
        {
            throw new NotImplementedException();
        }
    }
}

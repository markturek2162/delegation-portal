using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;

        public UserController(ILogger<UserController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("today")]
        public string Get()
        {
            // just to test
            return DateTime.Now.ToShortDateString();
        }

        [HttpPost]
        [Route("signup")]
        public void SignUp(string firstName, string lastName, string email, string company, string password)
        {
        }

        [HttpPost]
        [Route("signin")]
        public void SignIn(string email, string password)
        {
 
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SandalsUI.Models;
using SandalsUI.Other;

namespace SandalsUI.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            try
            {
                if (user == null)
                    return StatusCode(StatusCodes.Status400BadRequest, "empty_credentials");

                if (user.username == null || user.password == null)
                    return StatusCode(StatusCodes.Status400BadRequest, "invalid_credentials");

                using (var httpClient = new HttpClient())
                {
                    StringContent content = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, "application/json");
                    using (var response = await httpClient.PostAsync(Other.Constants.BASE_URL + "account/login", content))
                    {
                        if (response.IsSuccessStatusCode)
                        {
                            string result = await response.Content.ReadAsStringAsync();
                            dynamic loginResult = JsonConvert.DeserializeObject<dynamic>(result);


                            if (loginResult.result.userType == "Administrator")
                            {
                                HttpContext.Session.SetString("fName", (string)loginResult.result.firstName);
                                HttpContext.Session.SetString("lName", (string)loginResult.result.lastName);
                                HttpContext.Session.SetString("userType", (string)loginResult.result.userType);

                                var bytes = Encoding.ASCII.GetBytes(user.username + ":" + user.password);
                                string credentials = System.Convert.ToBase64String(bytes);
                                HttpContext.Session.SetString("authBasic", credentials);
                            }
                            else
                            {
                                return StatusCode(StatusCodes.Status401Unauthorized, "unauthorized_access");
                            }
                        }
                        else
                        {
                            return StatusCode(StatusCodes.Status401Unauthorized, "invalid_credentials");
                        }
                    }
                }
                return StatusCode(StatusCodes.Status200OK, "credentials_verified");
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "internal_error");
            }
        }

        [HttpPost]
        [ServiceFilter(typeof(SessionCheckActionFilter))]
        public IActionResult Logout() 
        {
            HttpContext.Session.Clear();
            return StatusCode(StatusCodes.Status200OK, "session_cleared");
        }
    }
}

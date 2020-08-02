using System;
using System.Collections.Generic;
using System.Dynamic;
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
        IHttpContextAccessor _httpContextAccessor;
        public AccountController(IHttpContextAccessor httpContextAccessor) 
        {
            _httpContextAccessor = httpContextAccessor;
        }

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
                    using (var response = await httpClient.PostAsync(Other.Constants.API_BASE_URL + "account/login", content))
                    {
                        if (response.IsSuccessStatusCode)
                        {
                            string result = await response.Content.ReadAsStringAsync();
                            dynamic loginResult = JsonConvert.DeserializeObject<dynamic>(result);


                            if (loginResult.result.userType == "Administrator")
                            {
                                HttpContext.Session.SetString("username", (string)loginResult.result.username);
                                HttpContext.Session.SetString("fName", (string)loginResult.result.firstName);
                                HttpContext.Session.SetString("lName", (string)loginResult.result.lastName);
                                HttpContext.Session.SetString("fullName", (string)loginResult.result.firstName + " "+ (string)loginResult.result.lastName);
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

        [HttpGet]
        [Route("account/signout")]
        public IActionResult Logout() 
        {
            _httpContextAccessor.HttpContext.Session.Clear();
            string test = _httpContextAccessor.HttpContext.Session.GetString("authBasic");
            return RedirectToAction("login", "account");
        }

        [HttpPost]
        public async Task<IActionResult> ChangePassword([FromBody] Credentials credentials) 
        {
            try
            {
                using (var httpClient = new HttpClient()) 
                {
                    string basic = HttpContext.Session.GetString("authBasic");
                    httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", HttpContext.Session.GetString("authBasic"));
                    credentials.username = HttpContext.Session.GetString("username");

                    StringContent content = new StringContent(JsonConvert.SerializeObject(credentials), Encoding.UTF8, "application/json");
                    using (var response = await httpClient.PostAsync(Other.Constants.API_BASE_URL + "account/changepassword", content))
                    {
                        if (response.IsSuccessStatusCode)
                        {
                            string result = await response.Content.ReadAsStringAsync();
                            dynamic passworResult = JsonConvert.DeserializeObject<dynamic>(result);
                            return StatusCode(StatusCodes.Status200OK, result);
                        }
                        else 
                        {
                            string result = await response.Content.ReadAsStringAsync();
                            dynamic passworResult = JsonConvert.DeserializeObject<ExpandoObject>(result);
                            return StatusCode((int)response.StatusCode, passworResult);
                        }
                    }
                }
            }
            catch (Exception e) 
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "internal_error");
            }
        }

        public class Credentials
        {
            public string username { get; set; }
            public string password { get; set; }
            public string newPassword { get; set; }
        }
    }
}

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
using Newtonsoft.Json.Linq;
using SandalsUI.Models;
using SandalsUI.Other;

namespace SandalsUI.Controllers
{
    [ServiceFilter(typeof(SessionCheckActionFilter))]
    public class AdminController : Controller
    {
        public async Task<IActionResult> Dashboard()
        {
            Models.Dashboard result = await Data();
            return View(null);
        }

        [HttpGet]
        [Route("dashboard")]
        public async Task<IActionResult> GetDashboard() 
        {
            Models.Dashboard result = await Data();
            if (result != null) 
            {
                return Ok(result);
            }
            return StatusCode(StatusCodes.Status404NotFound, null);
        }

        private async Task<Dashboard> Data() 
        {
            using (var httpClient = new HttpClient()) 
            {
                string basic = HttpContext.Session.GetString("authBasic");
                httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", HttpContext.Session.GetString("authBasic"));
                
                using (var response = await httpClient.GetAsync(Constants.BASE_URL + "admin/dashboard")) 
                {
                    var result = await response.Content.ReadAsStringAsync();
                    var json = JsonConvert.DeserializeObject<JObject>(result);

                    if (response.IsSuccessStatusCode)
                    {
                        Models.Dashboard dashboard = json["result"].ToObject<Models.Dashboard>();
                        return dashboard;
                    }
                    else 
                    {
                        return null;
                    }
                }
            }
        }
    }
}

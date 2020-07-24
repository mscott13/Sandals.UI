using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SandalsUI.Other
{
    public class SessionCheckActionFilter : IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context)
        {
            string actionName = ((Microsoft.AspNetCore.Mvc.Controllers.ControllerActionDescriptor)context.ActionDescriptor).ActionName;
            if (context.HttpContext.Session.GetString("authBasic") == null) 
            {
                if (actionName.ToLower() == "logout")
                {
                    context.Result = new BadRequestResult();
                    return;
                }
                context.Result = new RedirectToActionResult("login", "account", null);
                return;
            }
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            
        }
    }
}

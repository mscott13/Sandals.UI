﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SandalsUI.Models
{
    public class User
    {
        public int userId { get; set; }
        public DateTime createdDate { get; set; }
        public string username { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string firmName { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
        public string address { get; set; }
        public string country { get; set; }
        public string hash { get; set; }
        public string password { get; set; }
        public string userType { get; set; }
        public bool isVerified { get; set; }
        public bool recoveryState { get; set; }
    }
}

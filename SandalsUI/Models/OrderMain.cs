using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SandalsUI.Models
{
    public class OrderMain
    {
        private const int SHORT_DESC_LENGTH = 15;
        public int orderMainId { get; set; }
        public int userId { get; set; }
        public DateTime createdDate { get; set; }
        public string shortDescription { get; set; }
        public decimal total { get; set; }
        public List<Dictionary<string, string>> uploadedImages { get; set; }
        public List<OrderDetail> orderDetails { get; set; }
        public string orderStatus { get; set; }
        public User user { get; set; }
    }
}

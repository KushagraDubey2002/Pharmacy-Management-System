namespace MyProject_PMS_.Data.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public DateTime OrderDate { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }
        public string Status { get; set; } = "Pending";
        public decimal TotalAmount { get; set; }
    }
}

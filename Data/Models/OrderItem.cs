namespace MyProject_PMS_.Data.Models
{
    public class OrderItem
    {
        public int OrderItemId { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public int DrugId { get; set; }
        public Drug Drug { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal? TotalAmount { get; set; }

    }
}

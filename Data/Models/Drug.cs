namespace MyProject_PMS_.Data.Models
{
    public class Drug
    {
        public int DrugId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public DateTime ExpiryDate { get; set; } = new DateTime(2025, 1, 1);//.Add(DateTime.Now.TimeOfDay);
        public int SupplierId { get; set; }

        public Supplier Supplier { get; set; }
        //public List<OrderItem> OrderItems { get; set; }
    }
}

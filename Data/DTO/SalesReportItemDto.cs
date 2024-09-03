namespace MyProject_PMS_.Data.DTO
{
    public class SalesReportItemDto
    {
        public int DrugId { get; set; }
        public string DrugName { get; set; }
        public int TotalQuantitySold { get; set; }
        public decimal TotalAmount { get; set; }
    }
}

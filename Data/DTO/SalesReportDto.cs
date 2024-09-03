namespace MyProject_PMS_.Data.DTO
{
    public class SalesReportDto
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal TotalSales { get; set; }
        public int TotalOrders { get; set; }
        public List<SalesReportItemDto> SalesReportItems { get; set; }
    }
}

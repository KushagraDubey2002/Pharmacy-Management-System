namespace MyProject_PMS_.Data.DTO
{
    public class NewOrderDto
    {
        public IEnumerable<NewOrderItemDto> OrderDetails { get; set; }
    }
}

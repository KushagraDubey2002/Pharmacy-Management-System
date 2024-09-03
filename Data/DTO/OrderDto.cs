using System.ComponentModel.DataAnnotations;

namespace MyProject_PMS_.Data.DTO
{
    public class OrderDto
    {
       // [JsonIgnore]
        public int OrderId { get; set; }

        [Required(ErrorMessage ="Must enter userId")]
        public int UserId { get; set; } 

        [Required]
        // [JsonIgnore]
        [DataType(DataType.Date)]
        public DateTime OrderDate { get; set; } = DateTime.Now;

        [Required]
        [MaxLength(50)]
       // [JsonIgnore]
        public string Status { get; set; } = "Pending";

      //  [JsonIgnore]
        public decimal TotalAmount { get; set; }

        [Required]
        public List<OrderItemDto> OrderItems { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace MyProject_PMS_.Data.DTO
{
    public class OrderItemDto
    {
      //  [JsonIgnore]
        public int OrderItemId { get; set; }

        [Required(ErrorMessage ="You must enter drugId to place the order")]
        public int DrugId { get; set; }

        public string? DrugName { get; set; }

        [Required]
        [Range(1,100, ErrorMessage ="Quantity Must be greater than 0")]
        public int Quantity { get; set; }

      //  [JsonIgnore]
        public decimal Price { get; set; }

      //  [JsonIgnore]
        public decimal TotalAmount { get; set; }
    }
}

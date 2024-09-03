using System.ComponentModel.DataAnnotations;

namespace MyProject_PMS_.Data.DTO
{
    public class DrugDto 
    {
        //[JsonIgnore]
        public int DrugId { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        [StringLength(50, ErrorMessage = "Name cannot exceed 50 characters.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Price is required.")]
        [Range(0, double.MaxValue, ErrorMessage = "Price must be a non-negative value.")]
        public decimal Price { get; set; }

        [Required(ErrorMessage = "Quantity is required.")]
        [Range(0, 5000, ErrorMessage = "Quantity must be a non-negative value.")]
        public int Quantity { get; set; }

        [Required(ErrorMessage ="Expiry date is required")]
        //[JsonIgnore]
        public DateTime ExpiryDate { get; set; } = new DateTime(2025, 1, 1).Add(DateTime.Now.TimeOfDay);

        [Required(ErrorMessage = "SupplierId is required.")]
        public int SupplierId { get; set; }
    }
}

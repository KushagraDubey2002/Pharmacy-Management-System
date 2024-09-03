using System.ComponentModel.DataAnnotations;

namespace MyProject_PMS_.Data.DTO
{
    public class SupplierDto
    {
        public int SupplierId { get; set; }

        [Required]
        [StringLength(40)]
        public string Name { get; set; }

        [Required]
        [Phone]
        public string Contact { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

    }
}

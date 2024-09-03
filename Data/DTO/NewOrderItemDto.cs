using System.ComponentModel.DataAnnotations;

namespace MyProject_PMS_.Data.DTO
{
    public class NewOrderItemDto
    {
        [Required(ErrorMessage ="Can not left it empty")]
        public int DrugId { get; set; }

        [Required(ErrorMessage ="You must enter quantity > 0")]
        public int quantity { get; set; }
    }
}

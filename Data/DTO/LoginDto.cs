using System.ComponentModel.DataAnnotations;

namespace MyProject_PMS_.Data.DTO
{
    public class LoginDto
    {
        [Required(ErrorMessage = "Please enter your Email")]
        [EmailAddress]
        public string EmailId { get; set; }

        [Required(ErrorMessage = "You must enter your Password")]
        [MinLength(6,ErrorMessage ="Password Must be greater than 6 characters")]
        public string Password { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace MyProject_PMS_.Data.DTO
{
    public class UserDto
    {
        //[JsonIgnore]
        public int UserId { get; set; }

        [Required(ErrorMessage ="You must enter your name")]
        [StringLength(50)]
        public string Name { get; set; }

        [Required(ErrorMessage ="You must Enter your phone number")]
        [RegularExpression(@"^[6-9]\d{9}$", ErrorMessage ="Invalid Phone Number")]
        public string Contact { get; set; }

        [Required(ErrorMessage = "Email address is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; }

        [Required(ErrorMessage ="You must enter a password")]
        [StringLength(30, MinimumLength = 6,ErrorMessage = "Password must be at least 6 characters long")]
        public string Password { get; set; }

        //[JsonIgnore]
        public string Role { get; set; }
    }
}

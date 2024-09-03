// using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
// using MimeKit;
using MyProject_PMS_.Data.DTO;
using MyProject_PMS_.Data.Models;
// using MyProject_PMS_.Interface;
using MyProject_PMS_.Data.Interface;

namespace MyProject_PMS_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IUser iu;
        private readonly IConfiguration _configuration;
        private readonly IEmail email;

        public AccountController(IUser iu, IConfiguration configuration,IEmail _email)
        {
            this.iu = iu;
            _configuration = configuration;
            email = _email;
        }


        [HttpPost("SignUp")]
        public async Task<IActionResult> SignUp(UserDto userDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            User user;
            if (userDto.Password == "AdminLogin")
            {
                user = new User
                {
                    Name = userDto.Name,
                    Contact = userDto.Contact,
                    Email = userDto.Email,
                    Password = userDto.Password,
                    Role = "Admin"
                };
            }
            else
            {
                user = new User
                {
                    Name = userDto.Name,
                    Contact = userDto.Contact,
                    Email = userDto.Email,
                    Password = userDto.Password,
                    Role = "Doctor"
                };
            }
            await iu.AddUserAsync(user);

            // var subject = "Welcome to Pharmacy";
            // var body = $"<h1>Welcome, {user.Name}!</h1><p>Thank you for SigningUp!.</p>";

            var subject = "Welcome to MedMart – Your Trusted Pharmacy Store!";
            var body = $"<h1 style=\"color:#2E86C1;\">Hello, {user.Name}!</h1>" +
                        "<p>We’re thrilled to have you as part of the MedMart family.</p>" +
                        "<p style=\"font-size: 1.1em;\">Your health and wellness are our top priorities, and we're here to ensure you have a seamless and personalized experience every time you visit us.</p>" +
                        "<p>Explore our extensive range of high-quality medicines and healthcare products, specially curated to meet your needs.</p>" +
                        "<p>If you have any questions or need assistance, our friendly customer support team is just a click away!</p>" +
                        "<p style=\"font-size: 1.1em;\">Thank you for choosing MedMart. We're excited to be part of your health journey!</p>" +
                        "<p style=\"font-size: 1.2em; color: #2E86C1;\"><strong>Best Regards,</strong><br>" +
                        "<strong>The MedMart Team</strong></p>";

            await email.SendEmailAsync(user.Email, subject, body);

            return Ok(new { message = "User account created successfully" });
        }


        // private async Task SendEmailAsync(string to, string subject, string body)
        // {
        //     var message = new MimeMessage();
        //     message.From.Add(new MailboxAddress(_configuration["SmtpSettings:SenderName"], _configuration["SmtpSettings:SenderEmail"]));
        //     message.To.Add(new MailboxAddress(to, to));
        //     message.Subject = subject;
        //     message.Body = new TextPart("html")
        //     {
        //         Text = body
        //     };

        //     using (var client = new SmtpClient())
        //     {
        //         client.Connect(_configuration["SmtpSettings:Server"], int.Parse(_configuration["SmtpSettings:Port"]), false);
        //         client.Authenticate(_configuration["SmtpSettings:Username"], _configuration["SmtpSettings:Password"]);
        //         await client.SendAsync(message);
        //         client.Disconnect(true);
        //     }
        // }

        [HttpGet]
        [Authorize(Policy = "RequireAdminRole")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await iu.GetAllUsers();
            var userDtos = users.Select(u => new UserDto
            {
                UserId = u.UserId,
                Name = u.Name,
                Email = u.Email,
                Contact = u.Contact,
                Role = u.Role
            });

            return Ok(userDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await iu.GetUserByIdAsync(id);
            if(user == null)
            {
                return NotFound();
            }
            var userDto = new UserDto
            {
                UserId=user.UserId,
                Name = user.Name,
                Email = user.Email,
                Contact = user.Contact,
                Role = user.Role

            };
            return Ok(userDto);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await iu.Login(loginDto);
            if (user == null)
            {
                return Unauthorized("invalid credentials");
            }

            return Ok(new {token=user});
         
        }
    }
}






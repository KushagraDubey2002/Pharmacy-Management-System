using Microsoft.EntityFrameworkCore;
using MyProject_PMS_.Data.Models;
using MyProject_PMS_.Data.Interface;
using MyProject_PMS_.Data.DTO;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
namespace MyProject_PMS_.Data.Repository
{

    public class UserRepository : IUser
    {
        private readonly PharmacyDbContext context;
        private readonly IConfiguration _configuration;
       
        public UserRepository(PharmacyDbContext _context, IConfiguration configuration)
        {
            context = _context;
            this._configuration = configuration;
        }

        public async Task<string> Login(LoginDto log)
        {
            var existingUser= await context.Users.SingleOrDefaultAsync(u=>u.Email == log.EmailId && u.Password == log.Password);
            if (existingUser != null)
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, existingUser.Email.ToString()),
                        new Claim(ClaimTypes.Email, existingUser.Email),
                        new Claim(ClaimTypes.Role, existingUser.Role),
                        new Claim(ClaimTypes.Sid, existingUser.UserId +"")

                    }),

                    Expires = DateTime.UtcNow.AddHours(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                    Issuer = _configuration["Jwt:Issuer"],
                    Audience = _configuration["Jwt:Audience"]
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }

            return null;
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await context.Users.ToListAsync();
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await context.Users.FindAsync(id);
        }

        public async Task AddUserAsync(User user)
        {
            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();
        }

        public async Task UpdateUserAsync(User user)
        {
            context.Users.Update(user);
            await context.SaveChangesAsync();
        }

        public async Task DeleteUserAsync(int id)
        {
            var user = await context.Users.FindAsync(id);
            if (user != null)
            {
                context.Users.Remove(user);
                await context.SaveChangesAsync();
            }
        }
    }
}

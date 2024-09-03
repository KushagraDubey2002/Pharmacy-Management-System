using MyProject_PMS_.Data.DTO;
using MyProject_PMS_.Data.Models;
namespace MyProject_PMS_.Data.Interface
{
    public interface IUser
    {
        Task<string> Login(LoginDto login);

       Task<IEnumerable<User>> GetAllUsers();
        Task<User> GetUserByEmailAsync(string email);
        Task<User> GetUserByIdAsync(int id);
        Task AddUserAsync(User user);
        Task UpdateUserAsync(User user);
        Task DeleteUserAsync(int id);
    }
}

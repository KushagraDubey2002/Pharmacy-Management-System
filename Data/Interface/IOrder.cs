using MyProject_PMS_.Data.Models;

namespace MyProject_PMS_.Data.Interface
{
    public interface IOrder
    {
        Task<IEnumerable<Order>> GetAllOrdersAsync();
        Task<Order> GetOrderByIdAsync(int id);
        Task<IEnumerable<Order>> GetOrdersByUserIdAsync(int userId);
        Task AddOrderAsync(Order order);
        Task UpdateOrderAsync(Order order);
        Task<IEnumerable<Order>> GetOrdersByDateRangeAsync(DateTime startDate, DateTime endDate);
        Task DeleteOrderAsync(int id);
    }
}

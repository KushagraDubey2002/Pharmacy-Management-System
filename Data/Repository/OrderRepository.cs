using Microsoft.EntityFrameworkCore;
using MyProject_PMS_.Data.Models;
using MyProject_PMS_.Data.Interface;
namespace MyProject_PMS_.Data.Repository
{

    public class OrderRepository : IOrder
    {
        private readonly PharmacyDbContext context;

        public OrderRepository(PharmacyDbContext _context)
        {
            context = _context;
        }

        public async Task<IEnumerable<Order>> GetAllOrdersAsync()
        {
            return await context.Orders.Include(o => o.OrderItems).ThenInclude(oi => oi.Drug).ToListAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id)
        {
            return await context.Orders.Include(o => o.OrderItems).ThenInclude(oi => oi.Drug).FirstOrDefaultAsync(o => o.OrderId == id);
        }

        public async Task AddOrderAsync(Order order)
        {
            foreach (var item in order.OrderItems)
            {
                var drug = await context.Drugs.FindAsync(item.DrugId);
                if (drug != null)
                {
                    item.Price = drug.Price;
                    item.TotalAmount = item.Quantity * item.Price;
                }
                if (item.Quantity > drug.Quantity)
                {
                    throw new Exception($"Not enough stock for the drug {drug.Name}.\n Available Quantity = {drug.Quantity} ");
                }
            }

            order.TotalAmount = order.OrderItems.Sum(oi => oi.Price* oi.Quantity);

            context.Orders.Add(order);
            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Order>> GetOrdersByUserIdAsync(int userId) 
        {
            return await context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Drug)
                .Where(o => o.UserId == userId)
                .ToListAsync();
        }

        public async Task UpdateOrderAsync(Order order)
        {
            foreach (var item in order.OrderItems)
            {
                var drug = await context.Drugs.FindAsync(item.DrugId);
                if (drug != null)
                {
                    item.Price = drug.Price;
                    item.TotalAmount = item.Quantity * item.Price;
                }
            }
            decimal? amt= order.OrderItems.Sum(oi => oi.Price * oi.Quantity);
            order.TotalAmount = (decimal)amt; /*order.OrderItems.Sum(oi => oi.Price * oi.Quantity);*/

            context.Orders.Update(order);
            await context.SaveChangesAsync();
        }


        public async Task<IEnumerable<Order>> GetOrdersByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            return await context.Orders
                .Include(o => o.OrderItems)
                .Where(o => o.OrderDate >= startDate && o.OrderDate <= endDate)
                .ToListAsync();
        }


        public async Task DeleteOrderAsync(int id)
        {
            var order = await context.Orders.FindAsync(id);
            if (order != null)
            {
                context.Orders.Remove(order);
                await context.SaveChangesAsync();
            }
        }
    }
}

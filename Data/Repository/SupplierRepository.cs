using Microsoft.EntityFrameworkCore;
using MyProject_PMS_.Data.Models;
using MyProject_PMS_.Data.Interface;

namespace MyProject_PMS_.Data.Repository
{

    public class SupplierRepository : ISupplier
    {
        private readonly PharmacyDbContext context;

        public SupplierRepository(PharmacyDbContext _context)
        {
            context = _context;
        }

        public async Task<IEnumerable<Supplier>> GetAllSuppliersAsync()
        {
            return await context.Suppliers.ToListAsync();
        }

        public async Task<Supplier> GetSupplierByIdAsync(int id)
        {
            return await context.Suppliers.FirstOrDefaultAsync(s => s.SupplierId == id);
        }

        public async Task AddSupplierAsync(Supplier supplier)
        {
            if (supplier == null)
            {
                throw new ArgumentNullException(nameof(supplier));
            }
            await context.Suppliers.AddAsync(supplier);
            await context.SaveChangesAsync();
        }

        public async Task UpdateSupplierAsync(Supplier supplier)
        {
            if (supplier == null)
            {
                throw new ArgumentNullException(nameof(supplier));
            }
            context.Suppliers.Update(supplier);
            await context.SaveChangesAsync();
        }

        public async Task DeleteSupplierAsync(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentOutOfRangeException("Supplier ID must be greater than zero.");
            }
            var supplier = await context.Suppliers.FindAsync(id);
            if (supplier != null)
            {
                context.Suppliers.Remove(supplier);
                await context.SaveChangesAsync();
            }
        }
    }
}

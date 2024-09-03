using Microsoft.EntityFrameworkCore;
using MyProject_PMS_.Data.Interface;
using MyProject_PMS_.Data.Models;
namespace MyProject_PMS_.Data.Repository
{
    public class DrugRepository : IDrug
    {
        private readonly PharmacyDbContext context;

        public DrugRepository(PharmacyDbContext _context)
        {
            context = _context;
        }
        public async Task<IEnumerable<Drug>> GetAllDrugsAsync()
        {
            return await context.Drugs.Include(d => d.Supplier).ToListAsync();
        }
                                              
        public async Task<Drug> GetDrugByIdAsync(int id)
        {
            return await context.Drugs.Include(d => d.Supplier).FirstOrDefaultAsync(d => d.DrugId == id);
        }

        public async Task AddDrugAsync(Drug drug)
        {
            await context.Drugs.AddAsync(drug);
            await context.SaveChangesAsync();
        }

        public async Task UpdateDrugAsync(Drug drug)
        {
            context.Drugs.Update(drug);
            await context.SaveChangesAsync();
        }

        public async Task DeleteDrugAsync(int id)
        {
            var drug = await context.Drugs.FindAsync(id);
            if (drug != null)
            {
                context.Drugs.Remove(drug);
                await context.SaveChangesAsync();
            }
        }
    }
}



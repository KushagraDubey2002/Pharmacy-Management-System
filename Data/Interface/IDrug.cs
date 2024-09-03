using MyProject_PMS_.Data.Models;

namespace MyProject_PMS_.Data.Interface
{
    public interface IDrug
    {
        Task<IEnumerable<Drug>> GetAllDrugsAsync();
        Task<Drug> GetDrugByIdAsync(int id);
        Task AddDrugAsync(Drug drug);
        Task UpdateDrugAsync(Drug drug);
        Task DeleteDrugAsync(int id);
    }
}

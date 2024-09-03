using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyProject_PMS_.Data.DTO;
using MyProject_PMS_.Data.Interface;
using MyProject_PMS_.Data.Models;

namespace MyProject_PMS_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DrugsController : ControllerBase
    {
        private readonly IDrug idrug;

        public DrugsController(IDrug _idrug)
        {
            idrug = _idrug;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDrugs()
        {
            var drugs = await idrug.GetAllDrugsAsync();
            var drugDtos = drugs.Select(d => new DrugDto
            {
                DrugId = d.DrugId,
                Name = d.Name,
                Price = d.Price,
                Quantity = d.Quantity,
                ExpiryDate = d.ExpiryDate.Date,
                SupplierId = d.SupplierId
            });

            return Ok(drugDtos);
        }

        [HttpGet("{id}")]
    
        public async Task<IActionResult> GetDrugById(int id)
        {
            var drug = await idrug.GetDrugByIdAsync(id);
            if (drug == null)
            {
                return NotFound();
            }

            var drugDto = new DrugDto
            {
                DrugId = drug.DrugId,
                Name = drug.Name,
                Price = drug.Price,
                Quantity = drug.Quantity,
                ExpiryDate = drug.ExpiryDate,
                SupplierId = drug.SupplierId
            };

            return Ok(drugDto);
        }   

        [HttpPost]
        [Authorize(Policy = "RequireAdminRole")]
        public async Task<IActionResult> AddDrug( DrugDto drugDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var drug = new Drug
            {
                Name = drugDto.Name,
                Price = drugDto.Price,
                Quantity = drugDto.Quantity,
                ExpiryDate = drugDto.ExpiryDate,
                SupplierId = drugDto.SupplierId
            };

            await idrug.AddDrugAsync(drug);
            return Ok(new { message = "Drug added successfully" });
        }    

        [HttpPut("{id}")]
        [Authorize(Policy = "RequireAdminRole")]
        public async Task<IActionResult> UpdateDrug(int id,  DrugDto drugDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var drug = await idrug.GetDrugByIdAsync(id);
            if (drug == null)
            {
                return NotFound();
            }

            drug.Name = drugDto.Name;
            drug.Price = drugDto.Price;
            drug.Quantity = drugDto.Quantity;
            drug.ExpiryDate = drugDto.ExpiryDate;
            drug.SupplierId = drugDto.SupplierId;

            await idrug.UpdateDrugAsync(drug);
            return Ok(new { message = "Drug updated successfully" });
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "RequireAdminRole")]
        public async Task<IActionResult> DeleteDrug(int id)
        {
            await idrug.DeleteDrugAsync(id);
            return Ok(new { message = "Drug deleted successfully" });
        }
    }
}

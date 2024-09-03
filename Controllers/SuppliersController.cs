using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyProject_PMS_.Data.DTO;
using MyProject_PMS_.Data.Interface;
using MyProject_PMS_.Data.Models;

namespace MyProject_PMS_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = "RequireAdminRole")]
    public class SuppliersController : ControllerBase
    {
        private readonly ISupplier isupplier;

        public SuppliersController(ISupplier _supplier)
        {
            isupplier = _supplier;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSuppliers()
        {
            var suppliers = await isupplier.GetAllSuppliersAsync();
            var supplierDtos = suppliers.Select(s => new SupplierDto
            {
                SupplierId = s.SupplierId,
                Name = s.Name,
                Contact = s.Contact,
                Email = s.Email
            });

            return Ok(supplierDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSupplierById(int id)
        {
            var supplier = await isupplier.GetSupplierByIdAsync(id);
            if (supplier == null)
            {
                return NotFound();
            }

            var supplierDto = new SupplierDto
            {
                SupplierId = supplier.SupplierId,
                Name = supplier.Name,
                Contact = supplier.Contact,
                Email = supplier.Email
            };

            return Ok(supplierDto);
        }

        [HttpPost]
        public async Task<IActionResult> AddSupplier(SupplierDto supplierDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var supplier = new Supplier
            {
                Name = supplierDto.Name,
                Contact = supplierDto.Contact,
                Email = supplierDto.Email
            };

            await isupplier.AddSupplierAsync(supplier);
            return Ok(new { message = "Supplier added successfully" });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSupplier(int id,  SupplierDto supplierDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
       
            var supplier = await isupplier.GetSupplierByIdAsync(id);
            if (supplier == null)
            {
                return NotFound();
            }

            supplier.Name = supplierDto.Name;
            supplier.Contact = supplierDto.Contact;
            supplier.Email = supplierDto.Email;

            await isupplier.UpdateSupplierAsync(supplier);
            return Ok(new { message = "Supplier updated successfully" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSupplier(int id)
        {
            await isupplier.DeleteSupplierAsync(id);
            return Ok(new { message = "Supplier deleted successfully" });
        }
    }
}

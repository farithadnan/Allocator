using Altr.Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Altr.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class TechniqueController : Controller
    {
        private readonly AppDbContext _context;

        public TechniqueController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Technique>>> GetTechniqueDetails()
        {
            return await _context.Techniques
                .Include(technique => technique.CategorySets)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Technique>> GetTechniqueDetail([FromRoute]int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var technique = await _context.Techniques
                .Include(technique => technique.CategorySets)
                .SingleOrDefaultAsync(technique => technique.Id == id);

            if (technique == null)
            {
                return NotFound();
            }
 
            return Ok(technique);
        }

        [HttpPut("id")]
        public async Task<IActionResult> PutTechniqueDetail([FromRoute] int id, [FromBody] Technique technique)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != technique.Id)
            {
                return BadRequest();
            }

            technique.UpdatedBy = "Admin";
            technique.UpdatedDate = DateTime.Now;
            _context.Entry(technique).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                if (!TechniqueDetailExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Technique>> PostTechniqueDetail([FromBody] Technique technique)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (TechniqueDetailExists(technique.Id))
            {
                return BadRequest("Technique Already Existed!");
            }

            technique.CreatedBy = "Admin";
            technique.CreatedDate = DateTime.Now;
            _context.Techniques.Add(technique);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTechniqueDetail", new { id = technique.Id }, technique);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTechniqueDetail([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var technique = await _context.Techniques.FindAsync(id);
            if (technique == null)
            {
                return NotFound();
            }

            _context.Techniques.Remove(technique);
            await _context.SaveChangesAsync();

            return Ok(technique);
        }

        private bool TechniqueDetailExists(int id)
        {
            return _context.Techniques.Any(e => e.Id == id);
        }
    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShadowProject.Interface;
using ShadowProject.Model;

namespace ShadowProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProgramListController : ControllerBase
    {
       
        private readonly IProgram program;
        public ProgramListController(IProgram program)
        {
            this.program = program;
        }

        [HttpPost("getprograms")]
         public async Task<IActionResult> GetPrograms()
        {
            var pgmData = await program.GetPrograms();
            if (pgmData != null)
            {
                return Ok(pgmData);
            }
            else {
                return BadRequest("No programs found");
            }
        }
    }
}

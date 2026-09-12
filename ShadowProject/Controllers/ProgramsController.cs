using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShadowProject.Interface;

namespace ShadowProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProgramsController : ControllerBase
    {
        private readonly IProject project;
        public ProgramsController(IProject project) { 
        this.project = project;
        }


        [HttpGet("{id}/project")]
        public async Task<IActionResult> GetProject([FromRoute] string id)
        {
            var getProjData = await project.GetProjects(id);
            if(getProjData != null)
            {
                return Ok(getProjData);
            }
            return BadRequest("No projects found");
        }
    }
}

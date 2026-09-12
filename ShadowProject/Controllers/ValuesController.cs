using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ShadowProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Hello");
        }

    }
}

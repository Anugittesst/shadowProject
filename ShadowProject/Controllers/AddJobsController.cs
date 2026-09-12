using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShadowProject.Interface;
using ShadowProject.Model;

namespace ShadowProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    //[Route("api/v{verison:apiVersion}/[controller]")]
    //[ApiVersion("1.0")]
    //[ApiVersion("2.0")]

    public class AddJobsController : ControllerBase
    {
        private readonly ISearchAPI _searchAPI;
        public AddJobsController(ISearchAPI searchAPI)
        {
            _searchAPI = searchAPI;
        }

        [HttpPost("searchAPI")]
        //[MapToApiVersion("1.0")]

        public async Task<IActionResult> SearchAPI([FromBody] SearchAPIValues values)
        {
            if(values == null)
            {
                return BadRequest("No data");
            }
            else
            {
                var nameList = await _searchAPI.SearchAPI(values);
                return Ok(nameList);
            }
        }
    }

    //[HttpPost("runQueryAPI")]

    //public async Task<IActionResult> RunQueryAPI([FromBody] )
    //    {

    //    }
}


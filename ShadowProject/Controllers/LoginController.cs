using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShadowProject.Data;
using ShadowProject.Interface;
using ShadowProject.Repo;
using System.Threading.Tasks;

namespace ShadowProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILogin _repo;
        public LoginController(ILogin repo)
        {
            this._repo = repo;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]LoginData loginModel)
        {
            if (loginModel == null)
            {
                return BadRequest("User id or passwork is not there");
            }

            var loginUser = await _repo.VerifyUser(loginModel);
            return Ok(new { success = true, message = "Login successful", data =loginUser });
        }
    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShadowProject.Interface;
using ShadowProject.Model;

namespace ShadowProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BulkUploadController : ControllerBase
    {
        private readonly IBulkUpload bulkUpload;
        public BulkUploadController(IBulkUpload bulkUpload)
        {
            this.bulkUpload = bulkUpload;
        }
        [HttpPost("bulkUpload")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> BulkUpload([FromForm] BulkUploadRequest file)
        {
            try
            {
                if (file.File == null || file.File.Length == 0)
                {
                    return BadRequest("File not found");
                }

                var data = await bulkUpload.BulkUploadData(file.File);
                return Ok(data);
            }
            catch (Exception ex) {
                return BadRequest(
                    new
                    {
                        message = ex.Message,
                        data = new List<BulkUploadInputData>()
                    }
                    );

            }

        }
    }
}

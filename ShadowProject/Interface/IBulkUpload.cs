using ShadowProject.Model;
using System.Xml;

namespace ShadowProject.Interface
{
    public interface IBulkUpload
    {
        Task<List<BulkUploadInputData>> BulkUploadData(IFormFile file);
    }
}

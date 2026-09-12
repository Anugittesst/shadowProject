using ShadowProject.Model;

namespace ShadowProject.Interface
{
    public interface IBulkDelete
    {
        Task BulkDeleteAsync(JobDelete job, CancellationToken cancellationToken = default);
    }
}

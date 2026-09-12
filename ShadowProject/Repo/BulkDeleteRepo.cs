using Dapper;
using ShadowProject.Data;
using ShadowProject.Interface;
using ShadowProject.Model;

namespace ShadowProject.Repo
{
    public class BulkDeleteRepo : IBulkDelete
    {
        private readonly DapperContext _dapperContext;

        public BulkDeleteRepo(DapperContext dapperContext)
        {
            this._dapperContext = dapperContext;
        }
        public async Task BulkDeleteAsync(JobDelete job, CancellationToken cancellationToken = default)
        {
            var query = $" Update datapipeline.Project_Jobs set Is_Deleted = 1, deleted_at = @deletedAt where Project_Id = @ProjectID and Job_Id IN @jobIds";
            var parameters = new
            {
                ProjectID = job.ProjectId,
                jobIds = job.JobIds.ToArray(),
                deletedAt = DateTime.UtcNow
            };

            using (var connection = _dapperContext.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameters);
            }

        }
    }
}

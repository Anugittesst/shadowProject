using Dapper;
using ShadowProject.Data;
using ShadowProject.Interface;
using ShadowProject.Model;

namespace ShadowProject.Repo
{
    public class SearchAPIRepo : ISearchAPI
    {
        private readonly DapperContext dapperContext;

        public SearchAPIRepo(DapperContext context)
        {
            dapperContext = context;
        }

        public async Task<List<SearchAPIResult>> SearchAPI(SearchAPIValues searchAPI)
        {

            var query = @"select top 100 j.name as jobName,j.id as jobId from teradata.jobMetricesdetail j
                            where name like @jobName";
            var parameter = new DynamicParameters();
            parameter.Add("jobName", $"%{searchAPI.jobName}%", System.Data.DbType.String);
            using (var connection = dapperContext.CreateConnection())
            {
                var jobName = await connection.QueryAsync<SearchAPIResult>(query, parameter);
                return jobName.ToList();

            }
        }
    }
}

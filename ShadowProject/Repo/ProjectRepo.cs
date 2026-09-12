using Dapper;
using ShadowProject.Data;
using ShadowProject.Interface;
using ShadowProject.Model;
using System.Security.AccessControl;

namespace ShadowProject.Repo
{
    public class ProjectRepo : IProject
    {
        private readonly DapperContext context;
        public ProjectRepo(DapperContext context) { 
        this.context = context;
        }

        public async Task<List<ProjectModel>> GetProjects(string programId)
        {
            var query = @"select project_id as ProjectId, project_name as ProjectName 
                            from datapipeline.project where program_id = @programId";

            using (var conn = context.CreateConnection())
            {
                var param = new DynamicParameters();
                param.Add("programId", programId, System.Data.DbType.String);

                var proData = await conn.QueryAsync<ProjectModel>(query, param);    
                return proData.ToList();

            }
        }

    }
}

using Dapper;
using ShadowProject.Data;
using ShadowProject.Interface;
using ShadowProject.Model;

namespace ShadowProject.Repo
{
    public class GetProgramRepo : IProgram
    {
        private readonly DapperContext context;

        public GetProgramRepo(DapperContext context)
        {
            this.context = context;
        }
         public async  Task<List<ProgramModel>> GetPrograms() {
            var query = @"Select Program_id as ProgramId, program_name as ProgramName from datapipeline.program 
                            where program_id in (167,168,169) and is_deleted = 0";
            //var pgmData = new List<ProgramModel>();
            using (var connection = context.CreateConnection())
            {
                var pgmData = await connection.QueryAsync<ProgramModel>(query);
                return pgmData.ToList();
            }
        
        }

    }
}

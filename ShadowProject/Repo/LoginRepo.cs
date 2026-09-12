using Dapper;
using ShadowProject.Data;
using ShadowProject.Interface;
using ShadowProject.Model;

namespace ShadowProject.Repo
{
    public class LoginRepo : ILogin
    {
        private readonly DapperContext _dapper;

        public LoginRepo(DapperContext dapper)
        {
            this._dapper= dapper;
        }

        public async Task<LoginModel> VerifyUser(LoginData loginData)
        {
            var query = @"select * from dbo.UserTest where userName = @username"; 
            var param = new DynamicParameters();
            param.Add("username", loginData.Username, System.Data.DbType.String);
            using (var connection = _dapper.CreateConnection())
            {
                //dont use queryasyn since it returns ienum, 
                //QueryFirstOrDefaultAsync it will return single record
                var user = await connection.QueryFirstOrDefaultAsync<LoginModel>(query, param);
                return user;
            }

        }

    }
}

using Microsoft.Data.SqlClient;
using System.Data;

namespace ShadowProject.Data
{
    public class DapperContext
    {
        private readonly IConfiguration _configuration;
        private readonly string connectionString;

        public DapperContext(IConfiguration configuration)
        {
            this._configuration = configuration;
            this.connectionString = _configuration.GetConnectionString("DBConnection");
        }

        public IDbConnection CreateConnection()
        {
            return new SqlConnection(connectionString);
        }

    }
}

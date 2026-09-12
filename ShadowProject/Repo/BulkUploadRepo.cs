using ShadowProject.Data;
using ShadowProject.Interface;
using ShadowProject.Model;

namespace ShadowProject.Repo
{
    public class BulkUploadRepo : IBulkUpload
    {
        private readonly DapperContext dapperContext;

        public BulkUploadRepo(DapperContext _dapperContext)
        {
            this.dapperContext = _dapperContext;
        }

        public async Task<List<BulkUploadInputData>> BulkUploadData(IFormFile file)
        {
            //to store final result create list of object
            var finalData = new List<Object>();

            //to read the file
            var rows = await ReadCsvFile(file);
            if(rows ==null || rows.Count == 0)
            {
                throw new Exception("No valid jobs of ADB");
            }

            var groupedByWorkpace = rows.GroupBy(r => r.WorkspaceName).ToDictionary(g => g.Key, g => g.ToList());
            foreach(var ws in groupedByWorkpace)
            {
                string workspace = ws.Key;
                List<string> jobs = ws.Value.Select(j=>j.Job).ToList();

            }


            return rows.ToList();

        }


        private async Task<List<BulkUploadInputData>> ReadCsvFile(IFormFile file)
        {

            //to store readed output

            var result = new List<BulkUploadInputData>();
            
            var seenCombinations = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
            //default steps
            using var stream = file.OpenReadStream();
            using var reader = new StreamReader(stream);

            //check the file type as csv or excel only
            bool isHeader = true;

            //loop till end
            while (!reader.EndOfStream)
            {
                //take single line - AWAIT IS IMPORTANT HERE 
                // when await is used it is string otherwise it is TASK
                var line = await reader.ReadLineAsync();
                if (string.IsNullOrWhiteSpace(line))
                {
                    continue;
                }

                if (isHeader)
                {
                    isHeader = false;
                    continue;
                }

                var columns = line.Split(',');
                string platform = columns[0].Trim();
                string scheduler = columns[1].Trim();
                string  workspaceName = columns[2].Trim();
                string jobName = columns[3].Trim();


                if (!platform.Equals("ADB",StringComparison.CurrentCultureIgnoreCase)
                    || !scheduler.Equals("ADB", StringComparison.CurrentCultureIgnoreCase)
                    )
                {
                    continue ;
                }
                
                var uniqueKey = $"{workspaceName}_{jobName}";

                if (!seenCombinations.Add(uniqueKey))
                {
                    continue;
                }

                result.Add(new BulkUploadInputData()
                {
                    Platform = columns[0].Trim(),
                    Scheduler = columns[1].Trim(),
                    WorkspaceName = columns[2].Trim(),
                    Job = columns[3].Trim()
                });

            }

            return result;




        }
    }
}

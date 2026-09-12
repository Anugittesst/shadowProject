namespace ShadowProject.Model
{
    public class SearchAPIResult
    {
        public string? platform { get; set; }
        public string? scheduler { get; set; }
        public string jobName { get; set; }
        public string jobId { get; set; }
        public string? jobStatus { get; set; }
        public string? scheduleInfo { get; set; }

    }
}

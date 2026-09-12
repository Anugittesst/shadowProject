namespace ShadowProject.Model
{
    public class JobDelete
    {
        //instead of array of int use, IReadOnly Collection int
        //public int[] JobId { get; set; }
        public IReadOnlyCollection<int> JobIds { get; set; }
        public string ProjectId { get; set; }
    }
}

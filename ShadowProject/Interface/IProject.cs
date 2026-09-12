using ShadowProject.Model;

namespace ShadowProject.Interface
{
    public interface IProject
    {
        Task<List<ProjectModel>> GetProjects(string programId);
    }
}

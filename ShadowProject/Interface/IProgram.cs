using ShadowProject.Model;

namespace ShadowProject.Interface
{
    public interface IProgram
    {
        Task <List<ProgramModel>>  GetPrograms();
    }
}

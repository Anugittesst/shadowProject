using ShadowProject.Data;
using ShadowProject.Model;

namespace ShadowProject.Interface
{
    public interface ILogin
    {
         Task<LoginModel> VerifyUser(LoginData loginData);
    }
}

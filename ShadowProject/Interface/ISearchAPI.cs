using ShadowProject.Model;

namespace ShadowProject.Interface
{
    public interface ISearchAPI
    {
         Task<List<SearchAPIResult>> SearchAPI(SearchAPIValues searchAPI);
    }
}

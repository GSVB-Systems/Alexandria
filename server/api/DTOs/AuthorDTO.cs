

using scaffold;

namespace api.DTOs;

public class AuthorDTO
{
    public AuthorDTO(Author authorEntity)
    {
        Id = authorEntity.Id;
        Name = authorEntity.Name;
        Createdat = authorEntity.Createdat;
        BookIds = authorEntity.Books?.Select(b => b.Id).ToList() ?? new List<string>();
    }

    public AuthorDTO(string id, string name, DateTime? createdat)
    {
        Id = id;
        Name = name;
        Createdat = createdat;
    }

    public string Id { get; set; }
    public string Name { get; set; }
    public DateTime? Createdat { get; set; }

    public List<string> BookIds { get; set; } = new List<string>();
}
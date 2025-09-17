

using scaffold;

namespace api.DTOs;

public class GenreDTO
{
    public GenreDTO(Genre genreEntity)
    {
        Id = genreEntity.Id;
        Name = genreEntity.Name;    
        Createdat = genreEntity.Createdat;
        Books = genreEntity.Books?.Select(b => b.Id).ToList() ?? new List<string>();
    }

    public string Id { get; set; } 
    public string Name { get; set; } 
    public DateTime? Createdat { get; set; }
    public List<string> Books { get; set; } 

}
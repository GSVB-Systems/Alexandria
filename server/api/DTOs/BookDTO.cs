
using System.Collections.Immutable;
using scaffold;

namespace api.DTOs;

public class BookDTO
{
    public BookDTO(Book bookEntity)
    {
        Id = bookEntity.Id;
        Title = bookEntity.Title;
        Pages = bookEntity.Pages;
        Createdat = bookEntity.Createdat;
        if (bookEntity.Genre != null)
            GenreId = bookEntity.Genreid;
        AuthorIds = bookEntity.Authors?.Select(a => a.Id).ToList() ?? new List<string>();
    
        Imgurl = bookEntity.Imgurl;
    }

    public string Id { get; set; }
    public string Title { get; set; }
    public int Pages { get; set; }
    public DateTime? Createdat { get; set; }
    
    public string? GenreId { get; set; }
    
    public List<string> AuthorIds { get; set; }
    
    public string Imgurl { get; set; }
}
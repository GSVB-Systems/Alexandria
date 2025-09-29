
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
            Genre = new GenreDTO(bookEntity.Genre.Id, bookEntity.Genre.Name, bookEntity.Genre.Createdat);
        Authors = bookEntity.Authors?.Select(a => new AuthorDTO(a.Id, a.Name, a.Createdat)).ToList() ?? new List<AuthorDTO>();
    
        Imgurl = bookEntity.Imgurl;
    }

    public string Id { get; set; }
    public string Title { get; set; }
    public int Pages { get; set; }
    public DateTime? Createdat { get; set; }
    
    public virtual GenreDTO? Genre { get; set; }
    
    public virtual ICollection<AuthorDTO> Authors { get; set; }
    
    public string Imgurl { get; set; }
}

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
        if (bookEntity.Genre != null) Genre = new GenreDTO(bookEntity.Genre);
        Authors = bookEntity.Authors?.Select(a => a.Id).ToList() ?? new List<string>();
    }
    public string Id { get; set; }
    public string Title { get; set; }
    public int Pages { get; set; }
    public DateTime? Createdat { get; set; }
    
    public virtual GenreDTO? Genre { get; set; }
    
    public virtual ICollection<string> Authors { get; set; }
}
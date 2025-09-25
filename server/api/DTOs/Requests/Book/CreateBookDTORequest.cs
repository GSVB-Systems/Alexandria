using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Requests.Book;

public record CreateBookDTORequest
{
    [Required] [Range(1, int.MaxValue)]
    public int Pages { get; set; }
    
    [Required] [MinLength(1)]
    public string Title { get; set; }
    
    [Required] [MinLength(1)]
    public string Imgurl { get; set; }
    
    [Required] [MinLength(1)]
    public string Genreid { get; set; }
    
    [Required] [MinLength(1)]
    public ICollection<string> AuthorIds { get; set; }
    
    [Required] [MinLength(1)]
    public string Id {get; set;}
}
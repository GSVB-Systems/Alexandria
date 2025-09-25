using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Requests.Book;

public record UpdateBookDTORequest
{
    [Required] [MinLength(1)]
    public string BookId { get; set; }
    
    [Required] [MinLength(1)]
    public string NewTitle { get; set; }
    
    [Required] [Range(1, int.MaxValue)]
    public int NewPages { get; set; }
    
    [Required]
    public List<string> AuthorIds { get; set; }
    
    [Required]
    public string? GenreId { get; set; }
    
    [Required]
    public string NewImgurl { get; set; }
}
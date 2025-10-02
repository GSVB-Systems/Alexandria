using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Requests.Book;

public record UpdateBookDTORequest
{
    [Required] [MinLength(1)]
    public string id { get; set; }
    
    [Required] [MinLength(1)]
    public string title { get; set; }
    
    [Required] [Range(1, int.MaxValue)]
    public int pages { get; set; }
    
    [Required]
    public List<string> authors { get; set; }
    
    [Required]
    public string? genre { get; set; }
    
    [Required]
    public string imgurl { get; set; }
}
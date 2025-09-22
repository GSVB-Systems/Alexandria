using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Requests.Book;

public record DeleteBookRequestDTO
{
    [Required] [MinLength(1)] public string Title { get; set; }
}
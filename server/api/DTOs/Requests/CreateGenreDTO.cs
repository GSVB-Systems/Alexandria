using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Requests;

public record CreateGenreDTO
{
    [Required] [MinLength(1)] public string newGenreId { get; set; }
    
    [Required] [MinLength(1)] public string NewGenreName { get; set; }
}
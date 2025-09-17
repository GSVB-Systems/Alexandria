using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Requests;

public record UpdateGenreDTORequest
{
    [Required] [MinLength(1)] public string LookingForId { get; set; }
    
    [Required] [MinLength(1)] public string NewGenreName { get; set; }
    
}
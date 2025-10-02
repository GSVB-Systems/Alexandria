using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Requests;

public record UpdateGenreDTORequest
{
    [Required] [MinLength(1)] public string id { get; set; }
    
    [Required] [MinLength(1)] public string name { get; set; }
    
}
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace api.DTOs.Requests.Author;

public record CreateAuthorRequestDto
{
    [Required] [RegularExpression("^[a-zA-Z ]+$", ErrorMessage = "Name must contain only letters and spaces.")] 
    public string Name { get; set; }

   
}

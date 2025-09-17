using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace api.DTOs.Requests.Author;

public record CreateAuthorRequestDto([RegularExpression("^[a-zA-Z]+$", ErrorMessage = "Name must contain only letters.")] String Name);
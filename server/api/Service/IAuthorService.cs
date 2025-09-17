using api.DTOs.Requests.Author;
using Microsoft.AspNetCore.Mvc;
using scaffold;

namespace api.Service;

public interface IAuthorService
{
    Task<List<Author>> GetAllAuthors();
    Task<ActionResult<Author>> CreateAuthor(CreateAuthorRequestDto author);
    Task<ActionResult<Author>> UpdateAuthor(UpdateAuthorRequestDto author);

    Task<ActionResult<Author>> DeleteAuthor(DeleteAuthorRequestDto author);
}
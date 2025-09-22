using api.DTOs.Requests.Author;
using api.Service;
using Microsoft.AspNetCore.Mvc;
using scaffold;

namespace api.Controllers;

[ApiController]
public class AuthorController(IAuthorService authorService) : ControllerBase
{
    [Route(nameof(GetAllAuthors))]
    [HttpGet]
    public async Task<ActionResult<List<Author>>> GetAllAuthors()
    {
        var authors = await authorService.GetAllAuthors();
        return authors;
    }
    
    [Route(nameof(CreateAuthor))]
    [HttpPost]
    public async Task<ActionResult<Author>> CreateAuthor([FromBody] CreateAuthorRequestDto author)
    {
       var result = await authorService.CreateAuthor(author);
       return result;
    }

    [Route(nameof(UpdateAuthor))]
    [HttpPatch]
    public async Task<ActionResult<Author>> UpdateAuthor([FromBody] UpdateAuthorRequestDto author)
    {
        var result = await authorService.UpdateAuthor(author);
        return result;
    }

    [Route(nameof(DeleteAuthor))]
    [HttpDelete]
    public async Task<ActionResult<Author>> DeleteAuthor([FromBody] DeleteAuthorRequestDto author)
    {
        var result = await authorService.DeleteAuthor(author);
        return result;
    }

}
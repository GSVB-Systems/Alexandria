using api.DTOs;
using api.DTOs.Requests.Author;
using api.Service;
using api.Services;
using Microsoft.AspNetCore.Mvc;
using scaffold;

namespace api.Controllers;

[ApiController]
public class AuthorController(ILibraryService libraryService) : ControllerBase
{
    [Route(nameof(GetAllAuthors))]
    [HttpGet]
    public async Task<AuthorDTO> GetAllAuthors()
    {
        var authors = await libraryService.GetAuthors();
        return null;

    }
    
    [Route(nameof(CreateAuthor))]
    [HttpPost]
    public async Task<AuthorDTO> CreateAuthor([FromBody] CreateAuthorRequestDto author)
    {
       var result = await libraryService.CreateAuthor(author);
       return result;
    }

    [Route(nameof(UpdateAuthor))]
    [HttpPatch]
    public async Task<AuthorDTO> UpdateAuthor([FromBody] UpdateAuthorRequestDto author)
    {
        var result = await libraryService.UpdateAuthor(author);
        return result;
    }

    [Route(nameof(DeleteAuthor))]
    [HttpDelete]
    public async Task<AuthorDTO> DeleteAuthor([FromBody] string author)
    {
        var result = await libraryService.DeleteAuthor(author);
        return result;
    }

}
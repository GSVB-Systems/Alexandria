using Microsoft.AspNetCore.Mvc;
using scaffold;

namespace api.Controllers;

[ApiController]
public class AuthorController(MyDbContext dbContext) : ControllerBase
{
    [Route(nameof(GetAllAuthors))]
    [HttpGet]
    public async Task<ActionResult<List<Author>>> GetAllAuthors()
    {
        var authors = dbContext.Authors.ToList();
        return authors;
    }
    
    [Route(nameof(CreateAuthor))]
    [HttpPost]
    public async Task<ActionResult<Author>> CreateAuthor([FromBody] CreateAuthorRequestDto author)
    {
        var authorEntity = new Author
        {
            Id = Guid.NewGuid().ToString(),
            Name = author.Name,
            Createdat = DateTime.UtcNow
        };
        await dbContext.Authors.AddAsync(authorEntity);
        await dbContext.SaveChangesAsync();
        return authorEntity;
    }
    
}
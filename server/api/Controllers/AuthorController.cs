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

    [Route(nameof(UpdateAuthor))]
    [HttpPatch]
    public async Task<ActionResult<Author>> UpdateAuthor([FromBody] UpdateAuthorRequestDto author)
    {
        var existingAuthor = dbContext.Authors.First(p => p.Id == author.Id);
        existingAuthor.Name = author.Name;
        await dbContext.SaveChangesAsync();
        return existingAuthor;
    }

    [Route(nameof(DeleteAuthor))]
    [HttpDelete]
    public async Task<ActionResult<Author>> DeleteAuthor(string id)
    {
        var existingAuthor = dbContext.Authors.First(p => p.Id == id);
        dbContext.Authors.Remove(existingAuthor);
        await dbContext.SaveChangesAsync();
        return existingAuthor;
    }

}
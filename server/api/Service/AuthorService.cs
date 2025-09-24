using System.ComponentModel.DataAnnotations;
using api.DTOs.Requests.Author;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using scaffold;

namespace api.Service;

public class AuthorService(MyDbContext dbContext) : IAuthorService
{
    public async Task<List<Author>> GetAllAuthors()
    {
        var authors = dbContext.Authors.ToList();
        return authors;
    }

    public async Task<ActionResult<Author>> CreateAuthor(CreateAuthorRequestDto author)
    {
        Validator.ValidateObject(author, new ValidationContext(author), validateAllProperties: true);
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

    public async Task<ActionResult<Author>> UpdateAuthor(UpdateAuthorRequestDto author)
    {
        var existingAuthor = dbContext.Authors.First(p => p.Id == author.Id);
        existingAuthor.Name = author.Name;
        await dbContext.SaveChangesAsync();
        return existingAuthor;
    }

    public async Task<ActionResult<Author>> DeleteAuthor(DeleteAuthorRequestDto author)
    {
        var existingAuthor = dbContext.Authors.First(p => p.Id == author.Id);
        dbContext.Authors.Remove(existingAuthor);
        await dbContext.SaveChangesAsync();
        return existingAuthor;
    }
}






